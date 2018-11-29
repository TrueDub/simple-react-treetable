import React from 'react';
import Paginator from '../Paginator';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const paginationClasses = {
    listClasses: "list",
    listItemClasses: 'listItem',
    linkClasses: 'link',
};

describe('testing the Paginator page calculations', () => {
    it('has the correct outputs for current page less than 3', () => {
        let currentPage = 2;
        let tableLength = 450;
        let rowsPerPage = 10;
        const wrapper = shallow(<Paginator currentPage={currentPage}
                                           tableLength={tableLength}
                                           rowsPerPage={rowsPerPage}
                                           rowMover={function () {
                                           }}
                                           paginationClasses={paginationClasses}/>);
        expect(wrapper.find('.list')).toBeDefined();
        const list = wrapper.find('.list li');
        expect(list.length).toBe(9);
        const pos1Value = wrapper.state('pos1Value');
        expect(pos1Value).toBe(1);
        const pos5Value = wrapper.state('pos5Value');
        expect(pos5Value).toBe(5);
        const propsCurrentPage = wrapper.state('currentPage');
        expect(propsCurrentPage).toBe(2);
        const totalNumberOfPages = wrapper.state('totalNumberOfPages');
        expect(totalNumberOfPages).toBe(45);
    });
    it('has the correct outputs for current page greater than 3 but less than the table length', () => {
        let currentPage = 9;
        let tableLength = 450;
        let rowsPerPage = 10;
        const wrapper = shallow(<Paginator currentPage={currentPage}
                                           tableLength={tableLength}
                                           rowsPerPage={rowsPerPage}
                                           rowMover={function () {
                                           }}
                                           paginationClasses={paginationClasses}/>);
        expect(wrapper.find('.list')).toBeDefined();
        const list = wrapper.find('.list li');
        expect(list.length).toBe(9);
        const pos1Value = wrapper.state('pos1Value');
        expect(pos1Value).toBe(7);
        const pos5Value = wrapper.state('pos5Value');
        expect(pos5Value).toBe(11);
        const propsCurrentPage = wrapper.state('currentPage');
        expect(propsCurrentPage).toBe(9);
        const totalNumberOfPages = wrapper.state('totalNumberOfPages');
        expect(totalNumberOfPages).toBe(45);
    });
    it('has the correct outputs for last page', () => {
        let currentPage = 45;
        let tableLength = 450;
        let rowsPerPage = 10;
        const wrapper = shallow(<Paginator currentPage={currentPage}
                                           tableLength={tableLength}
                                           rowsPerPage={rowsPerPage}
                                           rowMover={function () {
                                           }}
                                           paginationClasses={paginationClasses}/>);
        expect(wrapper.find('.list')).toBeDefined();
        const list = wrapper.find('.list li');
        expect(list.length).toBe(9);
        const pos1Value = wrapper.state('pos1Value');
        expect(pos1Value).toBe(41);
        const pos5Value = wrapper.state('pos5Value');
        expect(pos5Value).toBe(45);
        const propsCurrentPage = wrapper.state('currentPage');
        expect(propsCurrentPage).toBe(45);
        const totalNumberOfPages = wrapper.state('totalNumberOfPages');
        expect(totalNumberOfPages).toBe(45);
    });
    it('performs the correct calcs for pages', () => {
        let currentPage = 45;
        let tableLength = 500;
        let rowsPerPage = 8;
        const wrapper = shallow(<Paginator currentPage={currentPage}
                                           tableLength={tableLength}
                                           rowsPerPage={rowsPerPage}
                                           rowMover={function () {
                                           }}
                                           paginationClasses={paginationClasses}/>);
        expect(wrapper.find('.list')).toBeDefined();
        const list = wrapper.find('.list li');
        expect(list.length).toBe(9);
        const pos1Value = wrapper.state('pos1Value');
        expect(pos1Value).toBe(43);
        const pos5Value = wrapper.state('pos5Value');
        expect(pos5Value).toBe(47);
        const propsCurrentPage = wrapper.state('currentPage');
        expect(propsCurrentPage).toBe(45);
        const totalNumberOfPages = wrapper.state('totalNumberOfPages');
        expect(totalNumberOfPages).toBe(63);
    });
});