import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as routes from './routes';
import ListCompany from './ListCompany';
import AddCompany from './AddCompany';
import UpdateCompany from './UpdateCompany';
import { Navbar,Nav,NavItem } from 'react-bootstrap';

class App extends Component {
  render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Company Hub</h1>
					</header>
					<Navbar>
						<Navbar.Header>
							<Navbar.Brand>
								<a href={routes.LIST}>
									<img src={logo} className="App-logo-sm" alt="logo" />
								</a>
							</Navbar.Brand>

						</Navbar.Header>
						<Nav bsStyle="pills">
							<NavItem eventKey={1} title="List Company" href={routes.LIST}>> List Company</NavItem>
						<NavItem eventKey={2} title="Add Company" href={routes.ADD}>> Add Company</NavItem>
						</Nav>
					</Navbar>
					<Route exact path={routes.LIST} component={ListCompany} />
					<Route exact path={routes.ADD} component={AddCompany} />
					<Route exact path={routes.UPDATE} component={UpdateCompany} />
				</div>
			</Router>
    );
  }
}

export default App;
