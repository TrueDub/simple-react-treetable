import React from 'react';
import TreeTable from './TreeTable';
import renderer from 'react-test-renderer';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

let headings = ["fred1", "fred2", "fred3", "fred4"];
let dataFields = ["name", "dataType", "example", "description"];
let tableData = [
    {
        data: {
            name: "name0",
            dataType: "string0",
            example: "ex0",
            description: "desc0"
        },
        children: [
            {
                data: {
                    name: "name0-0",
                    dataType: "string0-0",
                    example: "ex0-0",
                    description: "desc0-0"
                },
                children: []
            }, {
                data: {
                    name: "name0-1",
                    dataType: "string0-1",
                    example: "ex0-1",
                    description: "desc0-1"
                },
                children: []
            }, {
                data: {
                    name: "name0-2",
                    dataType: "string0-2",
                    example: "ex0-2",
                    description: "desc0-2"
                },
                children: [
                    {
                        data: {
                            name: "name0-2-1",
                            dataType: "string0-2-1",
                            example: "ex0-2-1",
                            description: "desc0-2-1"
                        },
                        children: []
                    }
                ]
            }
        ]
    },
    {
        data: {
            name: "name1",
            dataType: "string1",
            example: "ex1",
            description: "desc1"
        },
        children: []
    },
    {
        data: {
            name: "name2",
            dataType: "string2",
            example: "ex2",
            description: "desc2"
        },
        children: []
    }
];
let dataTableData = [
    {
        data: {
            name: "name0",
            dataType: "string0",
            example: "ex0",
            description: "desc0"
        }
    },
    {
        data: {
            name: "name1",
            dataType: "string1",
            example: "ex1",
            description: "desc1"
        }
    },
    {
        data: {
            name: "name2",
            dataType: "string2",
            example: "ex2",
            description: "desc2"
        }
    }
];
let control = {
    tableClasses: "table table-bordered"
};

describe('testing the TreeTable enhancedTableData setup', () => {
    it('should start by adding row IDs correctly', () => {
        const wrapper = shallow(<TreeTable columnHeadings={headings} dataFields={dataFields} tableData={tableData}
                                           control={control}/>);
        const instance = wrapper.instance();
        let enhancedTableData = wrapper.state('enhancedTableData');
        expect(enhancedTableData.length).toBe(3);
        expect(enhancedTableData[0].rowID).toBe(1);
        expect(enhancedTableData[0].expanded).toBe(false);
        expect(enhancedTableData[0].visible).toBe(true);
        expect(enhancedTableData[0].children[0].rowID).toBe(2);
        expect(enhancedTableData[0].children[0].expanded).toBe(false);
        expect(enhancedTableData[0].children[0].visible).toBe(false);
        expect(enhancedTableData[0].children[1].rowID).toBe(3);
        expect(enhancedTableData[0].children[1].expanded).toBe(false);
        expect(enhancedTableData[0].children[1].visible).toBe(false);
        expect(enhancedTableData[0].children[2].rowID).toBe(4);
        expect(enhancedTableData[0].children[2].expanded).toBe(false);
        expect(enhancedTableData[0].children[2].visible).toBe(false);
        expect(enhancedTableData[0].children[2].children[0].rowID).toBe(5);
        expect(enhancedTableData[0].children[2].children[0].expanded).toBe(false);
        expect(enhancedTableData[0].children[2].children[0].visible).toBe(false);
        expect(enhancedTableData[1].rowID).toBe(6);
        expect(enhancedTableData[1].expanded).toBe(false);
        expect(enhancedTableData[1].visible).toBe(true);
        expect(enhancedTableData[2].rowID).toBe(7);
        expect(enhancedTableData[2].expanded).toBe(false);
        expect(enhancedTableData[2].visible).toBe(true);
    });
    it('children of line 1 become visible when expand is clicked', () => {
        const wrapper = shallow(<TreeTable columnHeadings={headings} dataFields={dataFields} tableData={tableData}
                                           control={control}/>);
        const instance = wrapper.instance();
        let enhancedTableData = wrapper.state('enhancedTableData');
        expect(enhancedTableData[0].expanded).toBe(false);
        expect(enhancedTableData[0].visible).toBe(true);
        expect(enhancedTableData[0].children[0].expanded).toBe(false);
        expect(enhancedTableData[0].children[0].visible).toBe(false);
        expect(enhancedTableData[0].children[1].expanded).toBe(false);
        expect(enhancedTableData[0].children[1].visible).toBe(false);
        expect(enhancedTableData[0].children[2].expanded).toBe(false);
        expect(enhancedTableData[0].children[2].visible).toBe(false);
        expect(enhancedTableData[0].children[2].children[0].expanded).toBe(false);
        expect(enhancedTableData[0].children[2].children[0].visible).toBe(false);
        instance.rowExpandOrCollapse(1);
        enhancedTableData = wrapper.state('enhancedTableData');
        expect(enhancedTableData[0].expanded).toBe(true);
        expect(enhancedTableData[0].visible).toBe(true);
        expect(enhancedTableData[0].children[0].expanded).toBe(false);
        expect(enhancedTableData[0].children[0].visible).toBe(true);
        expect(enhancedTableData[0].children[1].expanded).toBe(false);
        expect(enhancedTableData[0].children[1].visible).toBe(true);
        expect(enhancedTableData[0].children[2].expanded).toBe(false);
        expect(enhancedTableData[0].children[2].visible).toBe(true);
        expect(enhancedTableData[0].children[2].children[0].expanded).toBe(false);
        expect(enhancedTableData[0].children[2].children[0].visible).toBe(false);
    });
});

describe('testing the DataTable enhancedTableData setup', () => {
    it('should start by adding row IDs correctly', () => {
        const wrapper = shallow(<TreeTable columnHeadings={headings} dataFields={dataFields} tableData={dataTableData}
                                           control={control}/>);
        const instance = wrapper.instance();
        let enhancedTableData = wrapper.state('enhancedTableData');
        expect(enhancedTableData.length).toBe(3);
        expect(enhancedTableData[0].rowID).toBe(1);
        expect(enhancedTableData[0].expanded).toBe(false);
        expect(enhancedTableData[0].visible).toBe(true);
        expect(enhancedTableData[1].rowID).toBe(2);
        expect(enhancedTableData[1].expanded).toBe(false);
        expect(enhancedTableData[1].visible).toBe(true);
        expect(enhancedTableData[2].rowID).toBe(3);
        expect(enhancedTableData[2].expanded).toBe(false);
        expect(enhancedTableData[2].visible).toBe(true);
    });
});