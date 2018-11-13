import React from "react";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleRight, faAngleDown} from '@fortawesome/free-solid-svg-icons'

import "./SimpleTreeTable.css";

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
    ;

    expandOrCollapseTree(data, selectedRowID, expandAll, collapseAll) {
        let newTree = (function recurse(children, expandBranch = expandAll, collapseBranch = collapseAll) {
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
        return newTree;
    }
    ;


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
        if (dataRow.children && dataRow.children.length > 0) {
            let iconCell = <FontAwesomeIcon icon={faAngleRight} fixedWidth
                                            onClick={this.rowExpandOrCollapse.bind(this, dataRow.rowID)}/>;
            if (dataRow.expanded) {
                iconCell = <FontAwesomeIcon icon={faAngleDown} fixedWidth
                                            onClick={this.rowExpandOrCollapse.bind(this, dataRow.rowID)}/>;
            }
            return (<td key={key}><span
                    style={{marginLeft: dataRow.rowLevel + 'em'}}>{iconCell}<span
                    className="iconPadding">{dataRow.data[dataField]}</span></span></td>
            );
        } else {
            return (
                <td key={key}><span style={{marginLeft: (dataRow.rowLevel + 1.25) + 'em'}}>
                    <span className="iconPadding">{dataRow.data[dataField]}</span>
                </span>
                </td>);
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
            <div>
                <button onClick={this.expandOrCollapseAll.bind(this)}
                        className={this.props.control.showButton ? this.props.control.buttonClasses : "hidden"}>{this.state.expanded ? 'Collapse All' : 'Expand All'}</button>
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
    columnHeadings: PropTypes.arrayOf(PropTypes.string),
    dataFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    tableData: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.object,
            children: PropTypes.arrayOf(PropTypes.object)
        })).isRequired,
    control: PropTypes.shape({
        tableClasses: PropTypes.string,
        buttonClasses: PropTypes.string,
        showButton: PropTypes.bool
    })
};

export default SimpleTreeTable;