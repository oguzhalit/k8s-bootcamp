import * as mongoose from 'mongoose';
import { CompanySchema } from '../Models/CompanyModel';
import { Request, Response, NextFunction } from 'express';
const Company = mongoose.model('Company', CompanySchema);

export class CompanyController {

	public addNewCompany(req: Request, res: Response, next: NextFunction) {
		let newContact = new Company(req.body);
		newContact.save((err, contact) => {
			if (err) {
				res.send(err);
			}
			res.json(contact);
		});
		next();
	}

	public getCompanies(req: Request, res: Response, next: NextFunction) {
		Company.find({}, (err, companies) => {
			if (err) {
				res.send(err);
			}
			if (companies.length > 0)
				res.json(companies);
			else
				res.status(204).json(companies);
		});
		next();
	}

	public getCompanyWithID(req: Request, res: Response, next: NextFunction) {
		Company.findById(req.params.companyId, (err, company) => {
			if (err) {
				res.send(err);
			}
			if (company)
				res.json(company);
			else
				res.status(404).json();
		});
		next();
	}

	public updateCompany(req: Request, res: Response, next: NextFunction) {
		Company.findOneAndUpdate({ _id: req.params.companyId }, req.body, { new: true }, (err, company) => {
			if (err) {
				res.send(err);
			}
			if (company)
				res.json(company);
			else
				res.status(404).json();
		});
		next();
	}

	public deleteCompany(req: Request, res: Response, next: NextFunction) {
		Company.remove({ _id: req.params.companyId }, (err) => {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Successfully deleted contact!' });
		});
		next();
	}

}