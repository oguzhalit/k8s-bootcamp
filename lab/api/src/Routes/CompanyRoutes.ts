import { Request, Response } from "express";
import { CompanyController } from "../Controllers/CompanyController";
import * as Prometheus from 'prom-client';

const httpRequestDurationMicroseconds = new Prometheus.Histogram({
	name: 'http_request_duration_ms',
	help: 'Duration of HTTP requests in ms',
	labelNames: ['method','route','status'],
	// buckets for response time from 0.1ms to 500ms
	buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
});

export class Routes {

	public companyController: CompanyController = new CompanyController();

	public routes(app): void {

		app.use((req, res, next) => {
			res.locals.startEpoch = Date.now();
			next();
	});

		app.route('/api')
		.get((req, res, next) => {
			res.status(200).send({
				message: 'K8s-API'
			});
			next();
		});

		app.route('/api/company')
			.get(this.companyController.getCompanies)
			.post(this.companyController.addNewCompany);

		app.route('/api/company/:companyId')
			.get(this.companyController.getCompanyWithID)
			.put(this.companyController.updateCompany)
			.delete(this.companyController.deleteCompany);


		app.get('/metrics', (req, res) => {
			res.set('Content-Type', Prometheus.register.contentType);
			res.end(Prometheus.register.metrics());
		});


		app.use((req, res, next) => {
			if (req && res && req.method && req.route && req.route.path && res.statusCode && res.locals) {
				const responseTimeInMs = Date.now() - res.locals.startEpoch;
				httpRequestDurationMicroseconds
					.labels(req.method, req.route.path, res.statusCode)
					.observe(responseTimeInMs);
			}
		});

	}
}