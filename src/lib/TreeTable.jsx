import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleDown} from '@fortawesome/free-solid-svg-icons'

import "./TreeTable.css";

class TreeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {enhancedTableData: this.generateStateTableData(this.props.tableData)};
    }

    generateStateTableData(tree, n = 1) {
        return (function recurse(children, parent = 0) {
            return children.map(node => {
                let rowID = n++;
                return Object.assign({}, node, {
                    rowID: rowID,
                    parentRowID: parent,
                    visible: parent === 0,
                    expanded: false,
                    children: recurse(node.children, rowID)
                })
            });
        })(tree);
    }

    rowExpandOrCollapse(selectedRowID) {
        let newTree = (function recurse(children) {
            return children.map(node => {
                let setExpanded = node.rowID === selectedRowID ? !node.expanded : node.expanded;
                let setVisible = node.parentRowID === selectedRowID ? !node.visible : node.visible;
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
        tableData.forEach((dataRow) => {
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

    generateExpandColumn(dataRow, key, dataField) {
        if (dataRow.children.length > 0) {
            let iconCell = <FontAwesomeIcon icon={faAngleRight}
                                            onClick={this.rowExpandOrCollapse.bind(this, dataRow.rowID)}/>;
            if (dataRow.expanded) {
                iconCell = <FontAwesomeIcon icon={faAngleDown}
                                            onClick={this.rowExpandOrCollapse.bind(this, dataRow.rowID)}/>;
            }
            return (<td key={key}>{iconCell} <span className="expandCell">{dataRow.data[dataField]}</span></td>);
        } else {
            return (<td key={key}><span className="expandCell">{dataRow.data[dataField]}</span></td>);
        }
    }

    processDataRow(dataFields, dataRow) {
        let rowBody = [];
        rowBody.push(dataFields.map((dataField, index) => {
                let key = dataRow.parentRowID + "-" + dataRow.rowID + '-' + index;
                if (index === 0) {
                    return this.generateExpandColumn(dataRow, key, dataField);
                } else {
                    return (<td key={key}>{dataRow.data[dataField]}</td>)
                }
            }
        ));
        return rowBody;
    }

    generateHeaderRow() {
        let headingRows = [];
        headingRows.push(this.props.columnHeadings.map((heading) =>
            <th key={heading}>{heading}</th>
        ));
        return headingRows;
    }

    render() {
        let headingRows = this.generateHeaderRow();
        let tableBody = this.generateTableBody(this.props.dataFields, this.state.enhancedTableData);
        return (
            <table className={this.props.control.tableClasses}>
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
        })),
    control: PropTypes.shape({
        tableClasses: PropTypes.string
    })
};

export default TreeTable;