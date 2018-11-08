import React from "react";
import PropTypes from 'prop-types';

import "bootstrap/dist/css/bootstrap.css";

class TreeTable extends React.Component {

    generateTableBody(dataFields, tableData) {
        let tableBody = [];
        tableBody.push(tableData.map((dataRow, index) => {
                let rowData = this.processDataRow(dataFields, dataRow);
                let key = 'r' + index;
                return <tr key={key}>{rowData}</tr>
            }
        ));
        return tableBody;
    }

    processDataRow(dataFields, dataRow) {
        let rowBody = [];
        rowBody.push(dataFields.map((dataField, index) => {
                let key = 'r' + index;
                return (<td key={key}>{dataRow.data[dataField]}</td>)
            }
        ));
        return rowBody;
    }

    render() {
        let headingRows = [];
        headingRows.push(this.props.columnHeadings.map((heading) =>
            <th key={heading}>{heading}</th>
        ));
        let tableBody = this.generateTableBody(this.props.dataFields, this.props.tableData);
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