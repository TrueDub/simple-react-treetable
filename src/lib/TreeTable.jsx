import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleDown} from '@fortawesome/free-solid-svg-icons'

import "bootstrap/dist/css/bootstrap.css";
import "./TreeTable.css";

class TreeTable extends React.Component {

    constructor(props) {
        super(props);
        this.rowExpandOrCollapse = this.rowExpandOrCollapse.bind(this);
        this.state = {enhancedTableData: this.generateStateTableData(this.props.tableData)};
    }

    generateStateTableData(tree, n = 1) {
        return (function recurse(children, parent = 0) {
            return children.map(node => {
                let rowID = n++;
                return Object.assign({}, node, {
                    rowID: rowID,
                    parentRowID: parent,
                    visible: parent === 0 ? true : false,
                    expanded: false,
                    children: recurse(node.children, rowID)
                })
            });
        })(tree);
    }

    rowExpandOrCollapse = (selectedRowID) => {
        console.log(selectedRowID);
        let newTree = (function recurse(children) {
            return children.map(node => {
                console.log(node);
                let setExpanded = node.rowID === selectedRowID ? true : node.expanded;
                let setVisible = node.parentRowID === selectedRowID ? true : node.visible;
                return Object.assign({}, node, {
                    visible: setVisible,
                    expanded: setExpanded,
                    children: recurse(node.children)
                })
            });
        })(this.state.enhancedTableData);
        this.setState({enhancedTableData: newTree});
    };

    generateTableBody(dataFields, tableData) {
        let tableBody = [];
        tableData.forEach((dataRow, index) => {
                let rowData = this.processDataRow(dataFields, dataRow);
                let key = dataRow.parentRowID + "-" + dataRow.rowID;
                let rowClass = dataRow.visible ? "shown" : "hidden";
                tableBody.push(<tr className={rowClass} key={key}>{rowData}</tr>);
                if (dataRow.children) {
                    tableBody.push(...this.generateTableBody(dataFields, dataRow.children));
                }
            }
        );
        return tableBody;
    }

    processDataRow(dataFields, dataRow) {
        let rowBody = [];
        if (dataRow.children.length > 0) {
            let iconCell = <FontAwesomeIcon icon={faAngleRight}
                                            onClick={this.rowExpandOrCollapse.bind(this, dataRow.rowID)}/>;
            if (dataRow.expanded) {
                iconCell = <FontAwesomeIcon icon={faAngleDown}
                                            onClick={this.rowExpandOrCollapse.bind(this, dataRow.rowID)}/>;
            }
            rowBody.push(<td key="f0">{iconCell}</td>);
        } else {
            rowBody.push(<td key="f0"></td>);
        }
        rowBody.push(dataFields.map((dataField, index) => {
                let key = dataRow.parentRowID + "-" + dataRow.rowID + '-' + index;
                return (<td key={key}>{dataRow.data[dataField]}</td>)
            }
        ));
        return rowBody;
    }

    render() {
        let headingRows = [<th key="r0"></th>];
        headingRows.push(this.props.columnHeadings.map((heading) =>
            <th key={heading}>{heading}</th>
        ));
        console.log(this.state.enhancedTableData);
        let tableBody = this.generateTableBody(this.props.dataFields, this.state.enhancedTableData);
        return (
            <table className="table">
                <thead>
                <tr>
                    {headingRows}
                </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
            </table>
        );
    }
}

TreeTable.propTypes = {
    columnHeadings: PropTypes.arrayOf(PropTypes.string),
    dataFields: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.object,
            children: PropTypes.arrayOf(PropTypes.object)
        }))
}

export default TreeTable;