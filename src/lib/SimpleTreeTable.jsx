import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleRight, faAngleDown} from '@fortawesome/free-solid-svg-icons';

import './SimpleTreeTable.css';

class SimpleTreeTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enhancedTableData: this.generateStateTableData(this.props.tableData),
            expanded: false
        };
    }

    generateStateTableData(tree, n = 1) {
        return (function recurse(children, parent = 0, rowLevel = 1) {
            if (children) {
                return children.map(node => {
                    let rowID = n++;
                    return Object.assign({}, node, {
                        rowID: rowID,
                        rowLevel: rowLevel,
                        parentRowID: parent,
                        visible: parent === 0,
                        expanded: false,
                        children: recurse(node.children, rowID, rowLevel + 1)
                    })
                });
            }
        })(tree);
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
            if (this.props.columns[0].fixedWidth) {
                return (<td key={key} className={this.props.columns[0].styleClass}
                            width={this.props.columns[0].percentageWidth + '%'}><span
                        style={{marginLeft: dataRow.rowLevel + 'em'}}>{iconCell}<span
                        className="iconPadding">{dataRow.data[dataField]}</span></span></td>
                );
            } else {
                return (<td key={key} className={this.props.columns[0].styleClass}><span
                        style={{marginLeft: dataRow.rowLevel + 'em'}}>{iconCell}<span
                        className="iconPadding">{dataRow.data[dataField]}</span></span></td>
                );
            }
        } else {
            if (this.props.columns[0].fixedWidth) {
                return (
                    <td key={key} className={this.props.columns[0].styleClass}
                        width={this.props.columns[0].percentageWidth + '%'}><span
                        style={{marginLeft: (dataRow.rowLevel + 1.25) + 'em'}}>
                    <span className="iconPadding">{dataRow.data[dataField]}</span>
                </span>
                    </td>);
            } else {
                return (
                    <td key={key} className={this.props.columns[0].styleClass}><span
                        style={{marginLeft: (dataRow.rowLevel + 1.25) + 'em'}}>
                    <span className="iconPadding">{dataRow.data[dataField]}</span>
                </span>
                    </td>);
            }
        }
    }

    processDataRow(dataRow) {
        let rowBody = [];
        rowBody.push(this.props.columns.map((column, index) => {
                let key = dataRow.parentRowID + '-' + dataRow.rowID + '-' + index;
                let output = dataRow.data[column.dataField];
                if (column.renderer) {
                    output = this.props.columns[index].renderer(dataRow, column.dataField);
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
        if (this.props.columns) {
            headingRows.push(this.props.columns.map((column) => {
                    if (column.heading) {
                        return <th key={column.heading}>{column.heading}</th>;
                    } else {
                        return <th key={column.dataField}>{column.dataField}</th>;
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
                        className={this.props.control.showButton ? this.props.control.buttonClasses : 'hidden'}>{this.state.expanded ? 'Collapse All' : 'Expand All'}</button>
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
        tableClasses: PropTypes.string,
        buttonClasses: PropTypes.string,
        showButton: PropTypes.bool
    }),
    columns: PropTypes.arrayOf(PropTypes.shape({
        dataField: PropTypes.string.isRequired,
        heading: PropTypes.string,
        fixedWidth: PropTypes.bool,
        percentageWidth: PropTypes.number,
        styleClass: PropTypes.string,
        renderer: PropTypes.func
    }))
};

SimpleTreeTable.defaultProps = {
    tableData: [],
    control: {
        tableClasses: '',
        buttonClasses: '',
        showButton: false
    },
    columns: [{
        dataField: '',
        heading: '',
        fixedWidth: false,
        percentageWidth: 0,
        styleClass: '',
        renderer: null
    }]
};

export default SimpleTreeTable;