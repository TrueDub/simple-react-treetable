import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

import './SimpleTreeTable.css';

class SimpleTreeTable extends React.Component {

    constructor(props) {
        super(props);
        let initialState = this.generateInitialState();
        this.state = {
            enhancedTableData: initialState.enhancedTableData,
            expanded: false,
            enhancedColumns: initialState.enhancedColumns,
            showResetSortingButton: initialState.showResetSortingButton
        };
    }

    generateInitialState() {
        let visibleRows = this.props.control.hasOwnProperty('visibleRows') ? this.props.control.visibleRows : 1;
        let enhancedTableData = this.generateStateTableData(this.props.tableData, visibleRows);
        let enhancedColumns = this.generateColumnState(this.props.columns);
        let initialSortField = null;
        let initialSortOrder = null;
        let showResetSortingButton = false;
        enhancedColumns.forEach(column => {
            if (column.sortOrder !== 'none') {
                initialSortField = column.dataField;
                initialSortOrder = column.sortOrder;
                showResetSortingButton = true;
            }
        });
        if (initialSortField !== null) {
            enhancedTableData = this.sortBy(enhancedTableData, initialSortField, initialSortOrder);
        }
        return {
            enhancedTableData: enhancedTableData,
            enhancedColumns: enhancedColumns,
            showResetSortingButton: showResetSortingButton
        };
    }

    generateStateTableData(tree, visibleRows) {
        let n = 1;
        return (function recurse(children, parent = 0, rowLevel = 1) {
            if (children) {
                return children.map(node => {
                    let rowID = n++;
                    return Object.assign({}, node, {
                        rowID: rowID,
                        rowLevel: rowLevel,
                        parentRowID: parent,
                        visible: rowLevel <= visibleRows,
                        expanded: rowLevel < visibleRows,
                        children: recurse(node.children, rowID, rowLevel + 1)
                    })
                });
            }
        })(tree);
    }

    generateColumnState(initialColumns) {
        return initialColumns.map(node => {
            let sortOrder = node.hasOwnProperty('sortOrder') ? node.sorted : 'none';
            return Object.assign({}, node, {
                sortable: node.hasOwnProperty('sortable') ? node.sortable : true,
                sortOrder: sortOrder
            })
        });
    }

    expandOrCollapseAll() {
        let action = !this.state.expanded;
        let newTree = (function recurse(children) {
            return children.map(node => {
                let visibleAction = node.rowLevel === 1 ? true : action;
                return Object.assign({}, node, {
                    visible: visibleAction,
                    expanded: action,
                    children: recurse(node.children)
                })
            });
        })(this.state.enhancedTableData);
        this.setState({
            enhancedTableData: newTree,
            expanded: action
        });
    }

    rowExpandOrCollapse(selectedRowID) {
        let newTree = this.expandOrCollapseTree(this.state.enhancedTableData, selectedRowID, false, false);
        this.setState({enhancedTableData: newTree});
    }

    expandOrCollapseTree(data, selectedRowID, expandAll, collapseAll) {
        return (function recurse(children, expandBranch = expandAll, collapseBranch = collapseAll) {
            return children.map(node => {
                let setExpanded = node.rowID === selectedRowID ? !node.expanded : node.expanded;
                let setVisible = node.parentRowID === selectedRowID ? !node.visible : node.visible;
                if (expandBranch) {
                    setExpanded = true;
                    setVisible = true;
                }
                if (collapseBranch) {
                    setExpanded = false;
                    setVisible = false;
                }
                //collapse and hide all below
                if (node.parentRowID === selectedRowID && !setVisible) {
                    collapseBranch = true;
                }
                return Object.assign({}, node, {
                    visible: setVisible,
                    expanded: setExpanded,
                    children: recurse(node.children, expandBranch, collapseBranch)
                })
            });
        })(data);
    }

    sortByField(fieldName) {
        let sortStatus = this.getSortStatus(fieldName);
        let sortOrder = 'asc';
        if (sortStatus === 'asc') {
            sortOrder = 'desc';
        }
        let newTree = this.sortBy(this.state.enhancedTableData, fieldName, sortOrder);
        let newColumns = this.state.enhancedColumns.map(node => {
            let newSortOrder = 'none';
            if (node.dataField === fieldName) {
                newSortOrder = sortOrder;
            }
            return Object.assign({}, node, {
                sortOrder: newSortOrder
            })
        });
        this.setState({
            enhancedTableData: newTree,
            enhancedColumns: newColumns,
            showResetSortingButton: true
        });
    }

    sortBy(data, fieldName, direction) {
        data.forEach(entry => {
            if (entry.children && entry.children.length > 0) {
                entry.children = this.sortBy(entry.children, fieldName, direction);
            }
        });
        if (direction === 'asc') {
            return data.sort((a, b) => {
                return a.data[fieldName] < b.data[fieldName] ? -1 : a.data[fieldName] > b.data[fieldName] ? 1 : 0;
            });
        } else {
            return data.sort((b, a) => {
                return a.data[fieldName] < b.data[fieldName] ? -1 : a.data[fieldName] > b.data[fieldName] ? 1 : 0;
            });
        }
    };

    getSortStatus(fieldName) {
        for (let i = 0; i < this.state.enhancedColumns.length; i++) {
            if (this.state.enhancedColumns[i].dataField === fieldName) {
                return this.state.enhancedColumns[i].sortOrder;
            }
        }
    }

    resetSorting() {
        let initialState = this.generateInitialState();
        this.setState({
            enhancedTableData: initialState.enhancedTableData,
            enhancedColumns: initialState.enhancedColumns,
            showResetSortingButton: initialState.showResetSortingButton
        });
    }

//from here down the functions deal with rendering

    generateTableBody(tableData) {
        let tableBody = [];
        tableData.forEach((dataRow) => {
                let rowData = this.processDataRow(dataRow);
                let key = dataRow.parentRowID + '-' + dataRow.rowID;
                let rowClass = dataRow.visible ? 'shown' : 'hidden';
                tableBody.push(<tr className={rowClass} key={key}>{rowData}</tr>);
                if (dataRow.children) {
                    tableBody.push(...this.generateTableBody(dataRow.children));
                }
            }
        );
        return tableBody;
    }

    generateExpandColumn(dataRow, key, dataField) {
        if (dataRow.children && dataRow.children.length > 0) {
            let iconCell = <FontAwesomeIcon icon={faAngleRight} fixedWidth
                                            onClick={this.rowExpandOrCollapse.bind(this, dataRow.rowID)}/>;
            if (dataRow.expanded) {
                iconCell = <FontAwesomeIcon icon={faAngleDown} fixedWidth
                                            onClick={this.rowExpandOrCollapse.bind(this, dataRow.rowID)}/>;
            }
            if (this.state.enhancedColumns[0].fixedWidth) {
                return (<td key={key} className={this.state.enhancedColumns[0].styleClass}
                            width={this.state.enhancedColumns[0].percentageWidth + '%'}><span
                        style={{marginLeft: dataRow.rowLevel + 'em'}}>{iconCell}<span
                        className="iconPadding">{dataRow.data[dataField]}</span></span></td>
                );
            } else {
                return (<td key={key} className={this.state.enhancedColumns[0].styleClass}><span
                        style={{marginLeft: dataRow.rowLevel + 'em'}}>{iconCell}<span
                        className="iconPadding">{dataRow.data[dataField]}</span></span></td>
                );
            }
        } else {
            if (this.state.enhancedColumns[0].fixedWidth) {
                return (
                    <td key={key} className={this.state.enhancedColumns[0].styleClass}
                        width={this.state.enhancedColumns[0].percentageWidth + '%'}><span
                        style={{marginLeft: (dataRow.rowLevel + 1.25) + 'em'}}>
                    <span className="iconPadding">{dataRow.data[dataField]}</span>
                </span>
                    </td>);
            } else {
                return (
                    <td key={key} className={this.state.enhancedColumns[0].styleClass}><span
                        style={{marginLeft: (dataRow.rowLevel + 1.25) + 'em'}}>
                    <span className="iconPadding">{dataRow.data[dataField]}</span>
                </span>
                    </td>);
            }
        }
    }

    processDataRow(dataRow) {
        let rowBody = [];
        rowBody.push(this.state.enhancedColumns.map((column, index) => {
                let key = dataRow.parentRowID + '-' + dataRow.rowID + '-' + index;
                let output = dataRow.data[column.dataField];
                if (column.renderer) {
                    output = this.state.enhancedColumns[index].renderer(dataRow, column.dataField);
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
        if (this.state.enhancedColumns) {
            headingRows.push(this.state.enhancedColumns.map((column) => {
                    let fieldTitle = column.heading ? column.heading : column.dataField;
                    let sortIcon = null;
                    if (column.sortOrder === 'asc') {
                        sortIcon = <FontAwesomeIcon icon={faAngleUp} fixedWidth pull="right"/>;
                    } else if (column.sortOrder === 'desc') {
                        sortIcon = <FontAwesomeIcon icon={faAngleDown} fixedWidth pull="right"/>;
                    } else {
                        sortIcon = null;
                    }
                    if (column.sortable) {
                        return <th key={fieldTitle}
                                   onClick={this.sortByField.bind(this, column.dataField)}>{sortIcon}{fieldTitle}</th>;
                    } else {
                        return <th key={fieldTitle}>{fieldTitle}</th>;
                    }
                }
            ))
        }
        return headingRows;
    }

    render() {
        let headingRows = this.generateHeaderRow();
        let tableBody = this.generateTableBody(this.state.enhancedTableData);
        return (
            <div>
                <button onClick={this.expandOrCollapseAll.bind(this)}
                        className={this.props.control.showExpandCollapseButton ? this.props.control.expandCollapseButtonClasses : 'hidden'}>
                    {this.state.expanded ? 'Collapse All' : 'Expand All'}
                </button>
                <button onClick={this.resetSorting.bind(this)}
                        className={this.state.showResetSortingButton ? this.props.control.resetSortingButtonClasses : 'hidden'}>
                    Reset Sorting
                </button>
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
            </div>
        );
    }
}

SimpleTreeTable.propTypes = {
    tableData: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.object,
            children: PropTypes.arrayOf(PropTypes.object)
        })).isRequired,
    control: PropTypes.shape({
        visibleRows: PropTypes.number,
        tableClasses: PropTypes.string,
        showExpandCollapseButton: PropTypes.bool,
        expandCollapseButtonClasses: PropTypes.string,
        showResetSortingButton: PropTypes.bool,
        resetSortingButtonClasses: PropTypes.string
    }),
    columns: PropTypes.arrayOf(PropTypes.shape({
        dataField: PropTypes.string.isRequired,
        heading: PropTypes.string,
        fixedWidth: PropTypes.bool,
        percentageWidth: PropTypes.number,
        styleClass: PropTypes.string,
        renderer: PropTypes.func,
        sortable: PropTypes.bool,
        sortOrder: PropTypes.string
    }))
};

SimpleTreeTable.defaultProps = {
    tableData: [],
    control: {
        visibleRows: 1,
        tableClasses: '',
        showExpandCollapseButton: false,
        expandCollapseButtonClasses: '',
        showResetSortingButton: false,
        resetSortingButtonClasses: ''
    },
    columns: [{
        dataField: '',
        heading: '',
        fixedWidth: false,
        percentageWidth: 0,
        styleClass: '',
        renderer: null,
        sortable: true
    }]
};

export default SimpleTreeTable;