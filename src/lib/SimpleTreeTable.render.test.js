import React from 'react';
import renderer from 'react-test-renderer';
import SimpleTreeTable from "./SimpleTreeTable";

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
let controlWithButton = {
    tableClasses: "table table-bordered",
    buttonClasses: "btn btn-default pull-right",
    showButton: true
};
let columns = [
    {heading: "fred1", fixedWidth: true, percentageWidth: 25},
    {heading: "fred2", fixedWidth: true, percentageWidth: 10},
    {heading: "fred3", fixedWidth: true, percentageWidth: 25},
    {heading: "fred4", fixedWidth: true, percentageWidth: 40}
];

test('component renders as expected', () => {
    const component = renderer.create(
        <SimpleTreeTable columns={columns} dataFields={dataFields} tableData={tableData} control={controlWithButton}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});