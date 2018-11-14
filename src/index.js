import React from 'react';
import {render} from "react-dom";
import SimpleTreeTable from "./lib/SimpleTreeTable.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';

let descriptionRenderer = function (dataRow, dataField) {
    return <span><span dangerouslySetInnerHTML={{__html: dataRow.data[dataField]}}></span></span>
};
let fixedColumns = [
    {dataField: "name", heading: "fred1", fixedWidth: true, percentageWidth: 25},
    {dataField: "dataType", heading: "fred2", fixedWidth: true, percentageWidth: 10},
    {dataField: "example", heading: "fred3", fixedWidth: true, percentageWidth: 25},
    {
        dataField: "description",
        heading: "fred4",
        fixedWidth: true,
        percentageWidth: 40,
        renderer: descriptionRenderer
    }
];
let unFixedColumns = [
    {dataField: "name", heading: "fred1", fixedWidth: false},
    {dataField: "dataType", heading: "fred2", fixedWidth: false},
    {dataField: "example", heading: "fred3", fixedWidth: false},
    {dataField: "description", heading: "fred4", fixedWidth: false}
];
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
            description: "desc1 &euro; &euro;"
        },
        children: []
    },
    {
        data: {
            name: "name2",
            dataType: "string2",
            example: "ex2",
            description: "desc2 &euro; &euro; &euro; &euro;"
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
let controlWithoutButton = {
    tableClasses: "table table-bordered",
    buttonClasses: "btn btn-default pull-right",
    showButton: false
};

const App = () => (
    <div style={{width: 640, margin: "15px auto"}}>
        <h1>Simple React TreeTable Demo</h1>
        <SimpleTreeTable columns={fixedColumns} tableData={tableData} control={controlWithButton}/>
        <h1>Simple React TreeTable as DataTable</h1>
        <SimpleTreeTable columns={unFixedColumns} tableData={dataTableData} control={controlWithoutButton}/>
    </div>
);

render(<App/>, document.getElementById("root"));