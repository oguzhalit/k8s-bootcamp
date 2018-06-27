import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CompanySchema = new Schema({
	name: {
		type: String,
		required: 'Enter a company name'
	},
	homepage_url: {
		type: String,
		required: 'Enter a company url'
	},
	email_address: {
		type: String
	},
	category_code: {
		type: String
	},
	number_of_employees: {
		type: Number
	},
	permalink: {
		type: String
	},
	crunchbase_url: {
		type: String
	}
});