import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./Routes/CompanyRoutes";
import * as mongoose from "mongoose";
import { Mockgoose } from "mockgoose";

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
		(mongoose as any).Promise = global.Promise;

		if (process.env.NODE_ENV === 'testing') {
			new Mockgoose(mongoose).prepareStorage().then(() =>  mongoose.connect(this.mongoUrl) );
		} else {
			mongoose.connect(this.mongoUrl);
		}

	}

}

export default new App().app;


