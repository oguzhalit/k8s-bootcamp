import React from 'react';
import { shallow } from 'enzyme';
import ListCompany from './ListCompany';


describe('List Company Suite', () => {
    it('should render without problems', () => {
        const fetchCompanies = jest.fn(() => Promise.resolve([]));
        const wrapper = shallow(<ListCompany fetchCompanies={fetchCompanies} />);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render companies if not empty', () => {
        const companies = [
            {
                _id: 1,
                name: 'Some Name',
                homepage_url: 'http://example.com/home',
                email_address: 'foo@bar.com',
                category_code: 'web',
                number_of_employees: 4,
                permalink: 'somename',
                crunchbase_url: "http://www.crunchbase.com/company/somename"
            },
            {
                _id: 2,
                name: 'Some Name 2',
                homepage_url: 'http://example.com/home2',
                email_address: 'foo2@bar.com',
                category_code: 'web',
                number_of_employees: 10,
                permalink: 'somename2',
                crunchbase_url: "http://www.crunchbase.com/company/somename2"
            },
            {
                _id: 3,
                name: 'Some Name 3',
                homepage_url: 'http://example.com/home3',
                email_address: 'foo3@bar.com',
                category_code: 'finance',
                number_of_employees: 400,
                permalink: 'somename3',
                crunchbase_url: "http://www.crunchbase.com/company/somename3"
            }
        ];
        const promise = Promise.resolve(companies);
        const loadData = jest.fn(() => promise);

        const wrapper = shallow(<ListCompany fetchCompanies={loadData} />);
        promise.then(() => {
            wrapper.update()
            expect(wrapper).toMatchSnapshot();
        });
    });
});