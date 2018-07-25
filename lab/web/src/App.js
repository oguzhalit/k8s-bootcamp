import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import * as routes from './routes';
import ListCompany from './ListCompany';
import AddCompany from './AddCompany';
import UpdateCompany from './UpdateCompany';
import { Navbar,Nav } from 'react-bootstrap';
import withCompanyFetching from './withCompanyFetching';

class App extends Component {
  render() {
		return (			
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
							<NavLink exact to='/'>> List Company</NavLink>
							<NavLink to='add'>> Add Company</NavLink>
						</Nav>
					</Navbar>
					<Switch>
						<Route exact path={routes.LIST} component={withCompanyFetching(ListCompany)} />
					<Route path={routes.ADD} component={AddCompany} />
						<Route path={routes.UPDATE} component={UpdateCompany} />
					</Switch>
				</div>
    );
  }
}

export default App;
