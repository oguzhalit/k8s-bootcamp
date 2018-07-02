import React, { Component } from 'react';
import { Table, ButtonGroup, Button,Modal } from 'react-bootstrap';
import * as routes from './routes';
import deleteIcon from './rubbish-bin.svg';
import editIcon from './pencil-edit-button.svg';
import * as config from './config';

export default class ListCompany extends Component{
	constructor(props) {
		super(props);

		this.editCompany = this.editCompany.bind(this);
		this.deleteCompany = this.deleteCompany.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			companies: [],
			show: false,
			company: {}
		}
	}

	componentDidMount() {
		console.log('Public URL IS ON ', config.default.PUBLIC_URL);
		fetch(`${config.default.PUBLIC_URL}/api/company`)
			.then(response => response.json())
			.then(response => this.setState({ companies:response }))
			.catch(err => console.log('Error', err));
	}

	editCompany(id) {
		this.props.history.push(`${routes.LIST}/${id}`)
	}

	deleteCompany(ev) {
		const removedTarget = ev.target.id;
		fetch(`${config.default.PUBLIC_URL}/api/company/${ev.target.id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then(() => {
				var array = this.state.companies;
				var _company = array.find((x) => x._id === removedTarget);
				var index = array.indexOf(_company);
				array.splice(index, 1);
				this.setState({ companies: array,show:true,company:_company});

			})
			.catch(err => console.log(err));
	}

	handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

	render() {
		const { companies } = this.state;
		return (
			<Table striped responsive hover>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>URL</th>
						<th>Mail</th>
						<th>Category</th>
						<th>Employees</th>
					</tr>
				</thead>
				<tbody>
					{
						companies.map((value) => {
						return (
							<tr key={value._id}>
								<td>
									<ButtonGroup bsSize="xsmall">
										<Button id={value._id} onClick={this.deleteCompany}><img src={deleteIcon} className="App-logo-xsm" alt="delete" /></Button>
										<Button href={`get/${value._id}`}><img src={editIcon} className="App-logo-xsm" alt="edit" /></Button>
									</ButtonGroup>
								</td>
								<td>{value.name}</td>
								<td><a href={value.homepage_url} target="_blank">{value.homepage_url}</a></td>
								<td><a href={`mailto:${value.email_address}`}>{value.email_address}</a></td>
								<td>{value.category_code}</td>
								<td>{value.number_of_employees}</td>
							</tr>
						)
					}) }
				</tbody>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Succesfully Removed {this.state.company.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>You have removed {this.state.company.name} with success</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</Table>
		);
	}
}