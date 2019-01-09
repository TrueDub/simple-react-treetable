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
        percentageWidth: 20
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
        percentageWidth: 15
    }
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
            name: "name0m",
            dataType: "Number",
            example: "1",
            description: "number blah",
            order: 3
        },
        children: []
    }
];
let controlWithButton = {
    visibleRows: 1,
    tableClasses: "table table-bordered",
    showExpandCollapseButton: true,
    expandCollapseButtonClasses: "btn btn-default float-left",
    showResetSortingButton: true,
    resetSortingButtonClasses: "btn btn-default float-right",
    showPagination: false,
    initialRowsPerPage: 2
};
let dataTableColumns = [
    {
        dataField: "name",
        heading: "Name"
    },
    {
        dataField: "size",
        heading: "Size"
    },
    {
        dataField: "description",
        heading: "Description"
    },
    {
        dataField: "type",
        heading: "Type"
    }
];
let dataTableData = [
    {data: {name: 'fred869', size: 869, description: 'desc2407', type: 'black'}},
    {data: {name: 'fred743', size: 743, description: 'desc2343', type: 'black'}},
    {data: {name: 'fred8', size: 8, description: 'desc713', type: 'white'}},
    {data: {name: 'fred6', size: 6, description: 'desc971', type: 'white'}},
    {data: {name: 'fred578', size: 578, description: 'desc2560', type: 'white'}},
    {data: {name: 'fred695', size: 695, description: 'desc400', type: 'black'}},
    {data: {name: 'fred477', size: 477, description: 'desc1735', type: 'black'}},
    {data: {name: 'fred814', size: 814, description: 'desc2005', type: 'white'}},
    {data: {name: 'fred556', size: 556, description: 'desc811', type: 'white'}},
    {data: {name: 'fred212', size: 212, description: 'desc2766', type: 'white'}},
    {data: {name: 'fred979', size: 979, description: 'desc12', type: 'black'}},
    {data: {name: 'fred237', size: 237, description: 'desc2985', type: 'black'}},
    {data: {name: 'fred3', size: 3, description: 'desc346', type: 'black'}},
    {data: {name: 'fred792', size: 792, description: 'desc927', type: 'white'}},
    {data: {name: 'fred755', size: 755, description: 'desc490', type: 'black'}},
    {data: {name: 'fred26', size: 26, description: 'desc34', type: 'white'}},
    {data: {name: 'fred810', size: 810, description: 'desc786', type: 'white'}},
    {data: {name: 'fred827', size: 827, description: 'desc887', type: 'black'}},
    {data: {name: 'fred79', size: 79, description: 'desc803', type: 'black'}},
    {data: {name: 'fred473', size: 473, description: 'desc388', type: 'black'}},
    {data: {name: 'fred663', size: 663, description: 'desc2483', type: 'black'}},
    {data: {name: 'fred356', size: 356, description: 'desc1004', type: 'white'}},
    {data: {name: 'fred120', size: 120, description: 'desc1603', type: 'white'}},
    {data: {name: 'fred527', size: 527, description: 'desc618', type: 'black'}},
    {data: {name: 'fred771', size: 771, description: 'desc2515', type: 'black'}},
    {data: {name: 'fred891', size: 891, description: 'desc2613', type: 'black'}},
    {data: {name: 'fred851', size: 851, description: 'desc788', type: 'black'}},
    {data: {name: 'fred245', size: 245, description: 'desc1173', type: 'black'}},
    {data: {name: 'fred301', size: 301, description: 'desc419', type: 'black'}},
    {data: {name: 'fred986', size: 986, description: 'desc1929', type: 'white'}},
    {data: {name: 'fred2', size: 2, description: 'desc2972', type: 'white'}},
    {data: {name: 'fred473', size: 473, description: 'desc1975', type: 'black'}},
    {data: {name: 'fred622', size: 622, description: 'desc1639', type: 'white'}},
    {data: {name: 'fred566', size: 566, description: 'desc1450', type: 'white'}},
    {data: {name: 'fred568', size: 568, description: 'desc904', type: 'white'}},
    {data: {name: 'fred770', size: 770, description: 'desc1035', type: 'white'}}
];
let dataTableControls = {
    tableClasses: "table table-bordered",
    showResetSortingButton: true,
    resetSortingButtonClasses: "btn btn-default float-right",
    showPagination: true,
    initialRowsPerPage: 10,
    showFilterInput: true,
   // filterInputClasses: "form-control form-control-sm float-left",
    filterInputPlaceholderText: 'fred',
    paginationClasses: {
        listClasses: "pagination justify-content-center",
        listItemClasses: 'page-item',
        linkClasses: 'page-link',
        activePageClasses: 'active'
    }
};

const App = () => (
        <div style={{width: "90%", margin: "15px auto"}}>
            <h1>Simple React TreeTable Demo</h1>
            <div>
                <div>
                    <h3>TreeTable</h3>
                    Clicking any column heading will sort that column in ascending order - a second click will reverse the
                    sort order. The "Reset Sorting" button will appear when a sort is applied, and will be present if an
                    initial sort is applied via the <code>columns</code> prop.
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
                                {JSON.stringify(fixedColumns, null, 2)}
                            </Highlight></td>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>control</code></pre>
                            </td>
                            <td>
                                <Highlight language="javascript">
                                    {JSON.stringify(controlWithButton, null, 2)}
                                </Highlight>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>tableData</code></pre>
                            </td>
                            <td><Highlight className='javascript'>
                                {JSON.stringify(tableData, null, 2)}
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
                    <h3>DataTable with Pagination</h3>
                    Clicking any column heading will sort that column in ascending order - a second click will reverse the
                    sort order. The "Reset Sorting" button will appear when a sort is applied, and will be present if an
                    initial sort is applied via the <code>columns</code> prop.
                    <SimpleTreeTable columns={dataTableColumns} tableData={dataTableData} control={dataTableControls}/>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td>Component declaration</td>
                            <td><Highlight language="javascript">
                                {"<SimpleTreeTable columns={dataTableColumns} tableData={dataTableData} control={dataTableControls}/>"}
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
                                {JSON.stringify(dataTableColumns, null, 2)}
                            </Highlight></td>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>control</code></pre>
                            </td>
                            <td>
                                <Highlight language="javascript">
                                    {JSON.stringify(dataTableControls, null, 2)}
                                </Highlight>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre><code>tableData</code></pre>
                            </td>
                            <td><Highlight className='javascript'>
                                {JSON.stringify(dataTableData, null, 2)}
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

