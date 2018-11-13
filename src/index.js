import React from 'react';
import {render} from "react-dom";
import SimpleTreeTable from "./lib/SimpleTreeTable";

import 'bootstrap/dist/css/bootstrap.css';

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
let controlWithButton = {
    tableClasses: "table table-bordered",
    buttonClasses: "btn btn-default pull-right",
    showButton: true,
    fixedWidthColumns: true,
    columnWidths: [25, 10, 25, 40]
};
let controlWithoutButton = {
    tableClasses: "table table-bordered",
    buttonClasses: "btn btn-default pull-right",
    showButton: false
};

const App = () => (
    <div style={{width: 640, margin: "15px auto"}}>
        <h1>Simple React TreeTable Demo</h1>
        <SimpleTreeTable columnHeadings={headings} dataFields={dataFields} tableData={tableData}
                         control={controlWithButton}/>
        <h1>Simple React TreeTable as DataTable</h1>
        <SimpleTreeTable columnHeadings={headings} dataFields={dataFields} tableData={dataTableData}
                         control={controlWithoutButton}/>
    </div>
);

render(<App/>, document.getElementById("root"));