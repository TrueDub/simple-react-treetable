import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

import Paginator from './Paginator';
import './SimpleTreeTable.css';

class TreeTable extends React.Component {

    constructor(props) {
        super(props);
        this.moveToSpecificPage = this.moveToSpecificPage.bind(this);
        let endRow = 0;
        if (this.props.control.showPagination) {
            endRow = this.props.control.initialRowsPerPage > this.props.tableData.length ?
                this.props.tableData.length - 1 :
                this.props.control.initialRowsPerPage - 1;
        } else {
            endRow = this.props.tableData.length - 1;
        }
        this.state = {
            startRow: 0,
            endRow: endRow,
            currentPage: 1
        };
    }

    getMaxRowID(tree) {
        let entry = tree[tree.length - 1];
        if (entry.children && entry.children.length > 0) {
            return this.getMaxRowID(entry.children);
        }
        return entry.rowOrder;
    }

    //pagination
    moveToSpecificPage(page) {
        let newStartRow = (page - 1) * this.props.control.initialRowsPerPage;
        let newEndRow = newStartRow + this.props.control.initialRowsPerPage - 1;
        this.setState({
            startRow: newStartRow,
            endRow: newEndRow,
            currentPage: page
        })
    }


    getNextRowID(tree, position) {
        let entry = tree[position];
        if (entry) {
            if (entry.children && entry.children.length > 0) {
                return this.getMaxRowID(entry.children);
            }
            return entry.rowOrder;
        }
        //if no entry at that position, return the last element
        return tree[tree.length - 1].rowOrder;
    }

    generateTableBody(tableData, startRow, endRow) {
        let startRowID = tableData[startRow].rowOrder;
        let endRowID = this.getNextRowID(tableData, endRow);
        return this.generateTableBodyRows(tableData, startRowID, endRowID);
    }

    generateTableBodyRows(tableData, startRow, endRow) {
        let tableBody = [];
        tableData.forEach((dataRow) => {
                if (dataRow.rowOrder >= startRow && dataRow.rowOrder <= endRow) {
                    let rowData = this.processDataRow(dataRow);
                    let key = dataRow.parentRowID + '-' + dataRow.rowID;
                    let rowClass = dataRow.visible ? 'shown' : 'hidden';
                    if (dataRow.filtered) {
                        rowClass = 'hidden';
                    }
                    tableBody.push(<tr className={rowClass} key={key}>{rowData}</tr>);
                    if (dataRow.children) {
                        tableBody.push(...this.generateTableBodyRows(dataRow.children, startRow, endRow));
                    }
                }
            }
        );
        return tableBody;
    }

    generateExpandColumn(dataRow, key, dataField) {
        let output = dataRow.data[dataField];
        if (this.props.enhancedColumns[0].renderer) {
            output = this.props.enhancedColumns[0].renderer(dataRow, dataField);
        }
        if (!this.props.childrenPresent) {
            //no expander required
            if (this.props.enhancedColumns[0].fixedWidth) {
                return (
                    <td key={key} className={this.props.enhancedColumns[0].styleClass}
                        width={this.props.enhancedColumns[0].percentageWidth + '%'}>
                        {output}
                    </td>);
            } else {
                return (
                    <td key={key} className={this.props.enhancedColumns[0].styleClass}>
                        {output}
                    </td>);
            }
        }
        if (dataRow.children && dataRow.children.length > 0) {
            let iconCell = <FontAwesomeIcon icon={faAngleRight} fixedWidth
                                            onClick={this.props.rowExpandOrCollapse.bind(null, dataRow.rowID)}/>;
            if (dataRow.expanded) {
                iconCell = <FontAwesomeIcon icon={faAngleDown} fixedWidth
                                            onClick={this.props.rowExpandOrCollapse.bind(null, dataRow.rowID)}/>;
            }
            if (this.props.enhancedColumns[0].fixedWidth) {
                return (<td key={key} className={this.props.enhancedColumns[0].styleClass}
                            width={this.props.enhancedColumns[0].percentageWidth + '%'}><span
                        style={{marginLeft: dataRow.rowLevel + 'em'}}>{iconCell}<span
                        className="iconPadding">{output}</span></span></td>
                );
            } else {
                return (<td key={key} className={this.props.enhancedColumns[0].styleClass}><span
                        style={{marginLeft: dataRow.rowLevel + 'em'}}>{iconCell}<span
                        className="iconPadding">{output}</span></span></td>
                );
            }
        } else {
            if (this.props.enhancedColumns[0].fixedWidth) {
                return (
                    <td key={key} className={this.props.enhancedColumns[0].styleClass}
                        width={this.props.enhancedColumns[0].percentageWidth + '%'}><span
                        style={{marginLeft: (dataRow.rowLevel + 1.25) + 'em'}}>
                    <span className="iconPadding">{output}</span>
                </span>
                    </td>);
            } else {
                return (
                    <td key={key} className={this.props.enhancedColumns[0].styleClass}><span
                        style={{marginLeft: (dataRow.rowLevel + 1.25) + 'em'}}>
                    <span className="iconPadding">{output}</span>
                </span>
                    </td>);
            }
        }
    }

    processDataRow(dataRow) {
        let rowBody = [];
        rowBody.push(this.props.enhancedColumns.map((column, index) => {
                let key = dataRow.parentRowID + '-' + dataRow.rowID + '-' + index;
                let output = dataRow.data[column.dataField];
                if (column.renderer) {
                    output = this.props.enhancedColumns[index].renderer(dataRow, column.dataField);
                }
                if (index === 0) {
                    return this.generateExpandColumn(dataRow, key, column.dataField);
                } else {
                    if (column.fixedWidth) {
                        return (<td key={key} className={column.styleClass}
                                    width={column.percentageWidth + '%'}>{output}</td>)
                    } else {
                        return (
                            <td key={key} className={column.styleClass}>{output}</td>)
                    }
                }
            }
        ));
        return rowBody;
    }

    generateHeaderRow() {
        let headingRows = [];
        if (this.props.enhancedColumns) {
            headingRows.push(this.props.enhancedColumns.map((column, index) => {
                    let fieldTitle = column.heading ? column.heading : column.dataField;
                    let sortIcon = null;
                    if (column.sortOrder === 'asc') {
                        sortIcon = <FontAwesomeIcon icon={faAngleUp} fixedWidth pull="right"/>;
                    } else if (column.sortOrder === 'desc') {
                        sortIcon = <FontAwesomeIcon icon={faAngleDown} fixedWidth pull="right"/>;
                    } else {
                        sortIcon = null;
                    }
                    if (this.props.control.allowSorting && column.sortable) {
                        return <th key={fieldTitle}
                                   onClick={this.props.sortByField.bind(null, index)}>{sortIcon}{fieldTitle}</th>;
                    } else {
                        return <th key={fieldTitle}>{fieldTitle}</th>;
                    }
                }
            ))
        }
        return headingRows;
    }

    generatePaginatorRow() {
        if (this.props.control.showPagination && this.props.tableData.length > this.props.control.initialRowsPerPage) {
            return (
                <div>
                    <Paginator currentPage={this.state.currentPage}
                               tableLength={this.props.tableData.length}
                               rowsPerPage={this.props.control.initialRowsPerPage}
                               rowMover={this.moveToSpecificPage}
                               paginationClasses={this.props.control.paginationClasses}/>
                </div>
            );
        }
        return <div></div>;
    }

    render() {
        let headingRows = this.generateHeaderRow();
        let tableBody = this.generateTableBody(this.props.tableData, this.state.startRow, this.state.endRow);
        return (
            <div>
                <div>
                    <span className={this.props.control.showFilterInput ? '' : 'hidden'}>
                    <input type="text" value={this.props.filterValue} onChange={this.props.applyFilter.bind(null)}
                           placeholder={this.props.control.filterInputPlaceholderText}
                           className={this.props.control.filterInputClasses}/>
                </span>
                    <span>
                    <button onClick={this.props.expandOrCollapseAll.bind(null)}
                            className={this.props.control.showExpandCollapseButton ? this.props.control.expandCollapseButtonClasses : 'hidden'}>
                        {this.props.expanded ? 'Collapse All' : 'Expand All'}
                    </button>
                    </span>
                    <span>
                    <button onClick={this.props.resetSorting.bind(null)}
                            className={this.props.showResetSortingButton ? this.props.control.resetSortingButtonClasses : 'hidden'}>
                        Reset Sorting
                    </button>
                    </span>
                </div>
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
                {this.generatePaginatorRow()}
            </div>
        );
    }
}

export default TreeTable;