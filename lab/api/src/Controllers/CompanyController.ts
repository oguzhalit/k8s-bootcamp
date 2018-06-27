import * as mongoose from 'mongoose';
import { CompanySchema } from '../Models/CompanyModel';
import { Request, Response } from 'express';

const Company = mongoose.model('Company', CompanySchema);

export class CompanyController {

	public addNewCompany(req: Request, res: Response) {
		console.log('Adding Company', req.body);
		let newContact = new Company(req.body);
		console.log('Adding Company', newContact);
		newContact.save((err, contact) => {
			if (err) {
				res.send(err);
			}
			res.json(contact);
		});
	}

	public getCompanies(req: Request, res: Response) {
		console.log('Listing all companies');
		Company.find({}, (err, contact) => {
			if (err) {
				res.send(err);
			}
			res.json(contact);
		});
	}

	public getCompanyWithID(req: Request, res: Response) {
		console.log('Company Requested is ', req.params.companyId);
		Company.findById(req.params.companyId, (err, company) => {
			if (err) {
				res.send(err);
			}
			console.log('Found company for id ', req.params.companyId, company);
			res.json(company);
		});
	}

	public updateCompany(req: Request, res: Response) {
		console.log('Updating Company', req.body, req.params.companyId);
		Company.findOneAndUpdate({ _id: req.params.companyId }, req.body, { new: true }, (err, contact) => {
			if (err) {
				res.send(err);
			}
			res.json(contact);
		});
	}

	public deleteCompany(req: Request, res: Response) {
		console.log('Deleting company', req.params.companyId);
		Company.remove({ _id: req.params.companyId }, (err) => {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Successfully deleted contact!' });
		});
	}

}