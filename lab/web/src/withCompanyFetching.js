import React, { Component } from 'react';

export default function withCompanyFetching(WrappedComponent) {
    return class WrappedCompanyFetching extends Component {
        constructor(props) {
            super(props);

            this.fetchCompanies = this.fetchCompanies.bind(this);
        }
        fetchCompanies() {
            return fetch('/api/company')
                .then(response => response.json())
        }
        render() {
            return <WrappedComponent fetchCompanies={this.fetchCompanies} />
        }
    }
}