import { Request, Response } from "express";
import { CompanyController } from "../Controllers/CompanyController";

export class Routes {

	public companyController: CompanyController = new CompanyController();

	public routes(app): void {
		app.route('/api')
			.get((req: Request, res: Response) => {
				res.status(200).send({
					message: 'K8s-API'
				})
			});

		app.route('/api/company')
			.get(this.companyController.getCompanies)
			.post(this.companyController.addNewCompany);

		app.route('/api/company/:companyId')
			.get(this.companyController.getCompanyWithID)
			.put(this.companyController.updateCompany)
			.delete(this.companyController.deleteCompany);
	}
}