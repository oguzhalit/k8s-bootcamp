import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./Routes/CompanyRoutes";

import * as mongoose from "mongoose";

class App {

	public app: express.Application;
	public routePrv: Routes = new Routes();
	public mongoUrl: string = `mongodb://${process.env.MONGO || '192.168.99.100'}/CRMdb`;

	constructor() {
		this.app = express();
		this.config();
		this.routePrv.routes(this.app);
		this.mongoSetup();
	}

	private config(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
	}

	private mongoSetup(): void {
		mongoose.Promise = global.Promise;
		mongoose.connect(this.mongoUrl);
	}

}

export default new App().app;

