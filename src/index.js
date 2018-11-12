import React from 'react';
import {render} from "react-dom";
import TreeTable from "./lib/TreeTable";

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
let control = {
    tableClasses: "table table-bordered"
};

const App = () => (
    <div style={{width: 640, margin: "15px auto"}}>
        <h1>Bootstrap React TreeTable Demo</h1>
        <TreeTable columnHeadings={headings} dataFields={dataFields} tableData={tableData} control={control}/>
    </div>
);

render(<App/>, document.getElementById("root"));