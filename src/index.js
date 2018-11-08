import React from 'react';
import {render} from "react-dom";
import TreeTable from "./lib/TreeTable";

let headings = ["fred1", "fred2", "fred3", "fred4"];
let dataFields = ["name", "dataType", "example", "description"];
let tableData = [
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
    },
    {
        data: {
            name: "name3",
            dataType: "string3",
            example: "ex3",
            description: "desc3"
        },
        children: []
    }
];

const App = () => (
    <div style={{width: 640, margin: "15px auto"}}>
        <h1>Bootstrap React TreeTable Demo</h1>
        <TreeTable columnHeadings={headings} dataFields={dataFields} tableData={tableData}/>
    </div>
);

render(<App/>, document.getElementById("root"));