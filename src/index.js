import React from 'react';
import {render} from "react-dom";
import Highlight from 'react-highlight';

import SimpleTreeTable from "./lib/SimpleTreeTable.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'highlight.js/styles/rainbow.css';

let descriptionRenderer = function (dataRow, dataField) {
    return <span dangerouslySetInnerHTML={{__html: dataRow.data[dataField]}}></span>;
};
let fixedColumns = [
    {
        dataField: "name",
        heading: "Name",
        fixedWidth: true,
        percentageWidth: 20
    },
    {
        dataField: "dataType",
        heading: "Data Type",
        fixedWidth: true,
        percentageWidth: 20,
        sortable: false
    },
    {
        dataField: "example",
        heading: "Example",
        fixedWidth: true,
        percentageWidth: 20
    },
    {
        dataField: "description",
        heading: "Description",
        fixedWidth: true,
        percentageWidth: 25,
        renderer: descriptionRenderer
    },
    {
        dataField: "order",
        heading: "Order",
        fixedWidth: true,
        percentageWidth: 15,
        sortable: true,
        sorted: "asc"
    }
];
let unFixedColumns = [
    {dataField: "name"},
    {dataField: "dataType"},
    {dataField: "example"},
    {dataField: "description"}
];
let tableData = [
    {
        data: {
            name: "name0g",
            dataType: "string",
            example: "ex0gb",
            description: "desc0g7",
            order: 17
        },
        children: [
            {
                data: {
                    name: "name0-z",
                    dataType: "string",
                    example: "ex0-0",
                    description: "desc0-0",
                    order: 373
                },
                children: []
            }, {
                data: {
                    name: "name0-q",
                    dataType: "string",
                    example: "ex0-1",
                    description: "desc0-1",
                    order: 2
                },
                children: []
            }, {
                data: {
                    name: "name0-b",
                    dataType: "string",
                    example: "ex0-2",
                    description: "desc0-2",
                    order: 111
                },
                children: [
                    {
                        data: {
                            name: "name0-2-1",
                            dataType: "string",
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
            name: "name0x",
            dataType: "string",
            example: "ex1",
            description: "desc1 &euro; &euro;",
            order: 6
        },
        children: []
    },
    {
        data: {
            name: "name0a",
            dataType: "string",
            example: "ex2",
            description: "desc2 &euro; &euro; &euro; &euro;",
            order: 9
        },
        children: []
    },
    {
        data: {
            name: "name0a",
            dataType: "Number",
            example: "1",
            description: "number blah",
            order: 3
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
    buttonClasses: "btn btn-default",
    showButton: true
};
let controlWithoutButton = {
    tableClasses: "table table-bordered",
    buttonClasses: "btn btn-default"
};

const App = () => (
        <div style={{width: 800, margin: "15px auto"}}>
            <h1>Simple React TreeTable Demo</h1>
            <div style={{width: 800, margin: "15px auto"}}>
                <div>
                    <h3>TreeTable</h3>
                    <SimpleTreeTable columns={fixedColumns} tableData={tableData} control={controlWithButton}/>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td>Component declaration</td>
                            <td><Highlight language="javascript">
                                {"<SimpleTreeTable columns={fixedColumns} tableData={tableData} control={controlWithButton}/>"}
                            </Highlight></td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <th width="10%">Prop Name</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>columns</code></pre>
                            </td>
                            <td><Highlight language="javascript">
                                {"[\n" +
                                "    {\n" +
                                "        dataField: \"name\",\n" +
                                "        heading: \"fred1\",\n" +
                                "        fixedWidth: true,\n" +
                                "        percentageWidth: 25\n" +
                                "    },\n" +
                                "    {\n" +
                                "        dataField: \"dataType\",\n" +
                                "        heading: \"fred2\",\n" +
                                "        fixedWidth: true,\n" +
                                "        percentageWidth: 10\n" +
                                "    },\n" +
                                "    {\n" +
                                "        dataField: \"example\",\n" +
                                "        heading: \"fred3\",\n" +
                                "        fixedWidth: true,\n" +
                                "        percentageWidth: 25\n" +
                                "    },\n" +
                                "    {\n" +
                                "        dataField: \"description\",\n" +
                                "        heading: \"fred4\",\n" +
                                "        fixedWidth: true,\n" +
                                "        percentageWidth: 40,\n" +
                                "        renderer: descriptionRenderer\n" +
                                "    }\n" +
                                "]"}
                            </Highlight></td>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>control</code></pre>
                            </td>
                            <td>
                                <Highlight language="javascript">{"{\n" +
                                "    tableClasses: \"table table-bordered\",\n" +
                                "    buttonClasses: \"btn btn-default\",\n" +
                                "    showButton: true\n" +
                                "}"}</Highlight>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>tableData</code></pre>
                            </td>
                            <td><Highlight className='javascript'>
                                {"[\n" +
                                "    {\n" +
                                "        data: {\n" +
                                "            name: \"name0\",\n" +
                                "            dataType: \"string0\",\n" +
                                "            example: \"ex0\",\n" +
                                "            description: \"desc0\"\n" +
                                "        },\n" +
                                "        children: [\n" +
                                "            {\n" +
                                "                data: {\n" +
                                "                    name: \"name0-0\",\n" +
                                "                    dataType: \"string0-0\",\n" +
                                "                    example: \"ex0-0\",\n" +
                                "                    description: \"desc0-0\"\n" +
                                "                },\n" +
                                "                children: []\n" +
                                "            }, {\n" +
                                "                data: {\n" +
                                "                    name: \"name0-1\",\n" +
                                "                    dataType: \"string0-1\",\n" +
                                "                    example: \"ex0-1\",\n" +
                                "                    description: \"desc0-1\"\n" +
                                "                },\n" +
                                "                children: []\n" +
                                "            }, {\n" +
                                "                data: {\n" +
                                "                    name: \"name0-2\",\n" +
                                "                    dataType: \"string0-2\",\n" +
                                "                    example: \"ex0-2\",\n" +
                                "                    description: \"desc0-2\"\n" +
                                "                },\n" +
                                "                children: [\n" +
                                "                    {\n" +
                                "                        data: {\n" +
                                "                            name: \"name0-2-1\",\n" +
                                "                            dataType: \"string0-2-1\",\n" +
                                "                            example: \"ex0-2-1\",\n" +
                                "                            description: \"desc0-2-1\"\n" +
                                "                        },\n" +
                                "                        children: []\n" +
                                "                    }\n" +
                                "                ]\n" +
                                "            }\n" +
                                "        ]\n" +
                                "    },\n" +
                                "    {\n" +
                                "        data: {\n" +
                                "            name: \"name1\",\n" +
                                "            dataType: \"string1\",\n" +
                                "            example: \"ex1\",\n" +
                                "            description: \"desc1 &euro; &euro;\"\n" +
                                "        },\n" +
                                "        children: []\n" +
                                "    },\n" +
                                "    {\n" +
                                "        data: {\n" +
                                "            name: \"name2\",\n" +
                                "            dataType: \"string2\",\n" +
                                "            example: \"ex2\",\n" +
                                "            description: \"desc2 &euro; &euro; &euro; &euro;\"\n" +
                                "        },\n" +
                                "        children: []\n" +
                                "    }\n" +
                                "]"}
                            </Highlight></td>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>descriptionRenderer</code></pre>
                                - the renderer function passed in the columns prop
                            </td>
                            <td><Highlight language="javascript">{"function (dataRow, dataField) {\n" +
                            "    return <span dangerouslySetInnerHTML={{__html: dataRow.data[dataField]}}></span>;\n" +
                            "};"}</Highlight></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>DataTable</h3>
                    <SimpleTreeTable columns={unFixedColumns} tableData={dataTableData} control={controlWithoutButton}/>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td>Component declaration</td>
                            <td><Highlight language="javascript">
                                {"<SimpleTreeTable columns={unFixedColumns} tableData={dataTableData} control={controlWithoutButton}/>"}
                            </Highlight></td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <th width="10%">Prop Name</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>columns</code></pre>
                            </td>
                            <td><Highlight language="javascript">
                                {"[\n" +
                                "    {dataField: \"name\"},\n" +
                                "    {dataField: \"dataType\"},\n" +
                                "    {dataField: \"example\"},\n" +
                                "    {dataField: \"description\"}\n" +
                                "]"}
                            </Highlight></td>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>control</code></pre>
                            </td>
                            <td>
                                <Highlight language="javascript">{"{\n" +
                                "    tableClasses: \"table table-bordered\",\n" +
                                "    buttonClasses: \"btn btn-default\",\n" +
                                "}"}</Highlight>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>tableData</code></pre>
                            </td>
                            <td><Highlight className='javascript'>
                                {"[\n" +
                                "    {\n" +
                                "        data: {\n" +
                                "            name: \"name0\",\n" +
                                "            dataType: \"string0\",\n" +
                                "            example: \"ex0\",\n" +
                                "            description: \"desc0\"\n" +
                                "        }\n" +
                                "    },\n" +
                                "    {\n" +
                                "        data: {\n" +
                                "            name: \"name1\",\n" +
                                "            dataType: \"string1\",\n" +
                                "            example: \"ex1\",\n" +
                                "            description: \"desc1\"\n" +
                                "        }\n" +
                                "    },\n" +
                                "    {\n" +
                                "        data: {\n" +
                                "            name: \"name2\",\n" +
                                "            dataType: \"string2\",\n" +
                                "            example: \"ex2\",\n" +
                                "            description: \"desc2\"\n" +
                                "        }\n" +
                                "    }\n" +
                                "]"}
                            </Highlight></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
;

render(
    <App/>
    , document.getElementById("root"));