import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import * as routes from './routes';
import * as config from './config';

const FieldGroup = ({ id, label, help, ...props })  => {
	return (
		<FormGroup controlId={id}>
			<ControlLabel>{label}</ControlLabel>
			<FormControl {...props} />
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	);
}

export default class AddCompany extends Component {
	constructor(props) {
		super(props);

		this.valueChange = this.valueChange.bind(this);
		this.submitCompany = this.submitCompany.bind(this);

		this.state = {
			name: "",
			homepage_url: "",
			email_address: "",
			category_code: "",
			number_of_employees: 0,
			permalink: "",
			crunchbase_url: "http://www.crunchbase.com/company/"
		}
	}

	submitCompany(ev) {
		this.setState(
			(old) => ({ crunchbase_url: `http://www.crunchbase.com/company/${old.permalink}`, number_of_employees: Number(old.number_of_employees) }),
			() => this.addCompanyToAPI()
		);
		ev.preventDefault();
	}

	addCompanyToAPI() {
		fetch(`${config.default.PUBLIC_URL}/api/company`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(this.state)
		})
			.then(() => this.props.history.push(routes.LIST))
			.catch(err => console.log(err));
	}

	valueChange(stateName) {
		this.setState({ [stateName.target.name]: stateName.target.value });
	}

	render() {
		return (
			<form onSubmit={this.submitCompany}>
				<FieldGroup
					id="formControlsName"
					type="text"
					label="Name"
					name="name"
					placeholder="Enter company name"
					onChange={this.valueChange}
				/>
				<FieldGroup
					id="formControlsEmail"
					type="email"
					label="Email address"
					name="email_address"
					placeholder="Enter company contact email address"
					onChange={this.valueChange}
				/>
				<FieldGroup
					id="formControlsURL"
					type="text"
					label="Homepage"
					name="homepage_url"
					placeholder="Enter company homepage url"
					onChange={this.valueChange}
				/>
				<FieldGroup
					id="formControlsEmployees"
					type="number"
					label="# Employees"
					placeholder="1"
					name="number_of_employees"
					onChange={this.valueChange}
				/>
				<FieldGroup
					id="formControlsPermalink"
					type="text"
					label="Permalink"
					placeholder="Enter company permalink"
					name="permalink"
					onChange={this.valueChange}
				/>
				<FormGroup controlId="formControlsSelect">
					<ControlLabel>Category</ControlLabel>
					<FormControl name="category_code" componentClass="select" placeholder="select category"
						onChange={this.valueChange}>
						<option value="">please select a category</option>
						<option value="web">Web</option>
						<option value="games">Games</option>
						<option value="internet">Internet</option>
						<option value="financial">Financial</option>
						<option value="health">Health</option>
						<option value="government">Government</option>
					</FormControl>
				</FormGroup>

				<Button type="submit">Submit</Button>
			</form>
		);
	}
}