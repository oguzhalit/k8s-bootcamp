import 'mocha';
import { expect } from 'chai';
import * as mongoose from "mongoose";
import { CompanySchema } from '../Models/CompanyModel';
import * as request from 'supertest';
import { server } from "../server";
import { CompanyController } from '../Controllers/CompanyController';
import { Request, Response } from 'express';

const Company = mongoose.model('Company', CompanySchema);

describe('Company Management', () => {

	var createdCompanyID = '';
	const demoCompany = {
		name: "Foxy Games",
		homepage_url: "http://foxygames.github.io",
		email_address: "callme@axion.com",
		category_code: "web",
		number_of_employees: 5,
		permalink: "foxygames",
		crunchbase_url: "http://crunchbase.com/foxygames"
	};

	it('should GET no companies', (done) => {
		request(server).get('/api/company').end((err, res) => {
			expect(res.body).to.be.empty;
			done();
		});
	});

	it('should POST a new company', (done) => {
		request(server)
			.post('/api/company')
			.send(demoCompany)
			.end((err, res) => {
				expect(res.body).to.not.be.empty;
				expect(res.body.name).to.be.eq(demoCompany.name);
				createdCompanyID = res.body._id;
				done();
			});
	});

	it('should GET all the companies', (done) => {
		request(server).get('/api/company').end((err, res) => {
			expect(res.body).to.not.be.empty;
			expect(res.body[0].name).to.be.eq(demoCompany.name);
			done();
		});
	});

	it('should GET a given company', (done) => {
		request(server)
			.get(`/api/company/${createdCompanyID}`)
			.end((err, res) => {
				expect(res.body).to.not.be.empty;
				expect(res.body.name).to.be.eq(demoCompany.name);
				done();
			});
	});

	it('should PUT some new parameters to a given company', (done) => {
		request(server)
			.put(`/api/company/${createdCompanyID}`)
			.send({ name: 'Foxy Games CO' })
			.end((err, res) => {
				expect(res.body).to.not.be.empty;
				expect(res.body.name).to.not.be.eq(demoCompany.name);
				done();
			});
	});

	it('should GET a given company with new parameters', (done) => {
		request(server)
			.get(`/api/company/${createdCompanyID}`)
			.end((err, res) => {
				expect(res.body).to.not.be.empty;
				expect(res.body.name).to.not.be.eq(demoCompany.name);
				done();
			});
	});

	it('should DELETE a given company', (done) => {
		request(server)
			.delete(`/api/company/${createdCompanyID}`)
			.end((err, res) => {
				expect(res.body.message).to.be.eq('Successfully deleted contact!');
				done();
			});
	});
});

describe('CompanyController Tests', () => {

	const companyController: CompanyController = new CompanyController();
	var createdCompanyID = '';
	const demoCompany = {
		name: "Foxy Games",
		homepage_url: "http://foxygames.github.io",
		email_address: "callme@axion.com",
		category_code: "web",
		number_of_employees: 5,
		permalink: "foxygames",
		crunchbase_url: "http://crunchbase.com/foxygames"
	};



});
