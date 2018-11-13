import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
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
    return function recurse(children, parent = 0, rowLevel = 1) {
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
          });
        });
      }
    }(tree);
  }

  expandOrCollapseAll() {
    let action = !this.state.expanded;

    let newTree = function recurse(children) {
      return children.map(node => {
        let visibleAction = node.rowLevel === 1 ? true : action;
        return Object.assign({}, node, {
          visible: visibleAction,
          expanded: action,
          children: recurse(node.children)
        });
      });
    }(this.state.enhancedTableData);

    this.setState({
      enhancedTableData: newTree,
      expanded: action
    });
  }

  rowExpandOrCollapse(selectedRowID) {
    let newTree = this.expandOrCollapseTree(this.state.enhancedTableData, selectedRowID, false, false);
    this.setState({
      enhancedTableData: newTree
    });
  }

  expandOrCollapseTree(data, selectedRowID, expandAll, collapseAll) {
    return function recurse(children, expandBranch = expandAll, collapseBranch = collapseAll) {
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
        } //collapse and hide all below


        if (node.parentRowID === selectedRowID && !setVisible) {
          collapseBranch = true;
        }

        return Object.assign({}, node, {
          visible: setVisible,
          expanded: setExpanded,
          children: recurse(node.children, expandBranch, collapseBranch)
        });
      });
    }(data);
  }

  generateTableBody(dataFields, tableData) {
    let tableBody = [];
    tableData.forEach(dataRow => {
      let rowData = this.processDataRow(dataFields, dataRow);
      let key = dataRow.parentRowID + "-" + dataRow.rowID;
      let rowClass = dataRow.visible ? "shown" : "hidden";
      tableBody.push(React.createElement("tr", {
        className: rowClass,
        key: key
      }, rowData));

      if (dataRow.children) {
        tableBody.push(...this.generateTableBody(dataFields, dataRow.children));
      }
    });
    return tableBody;
  }

  generateExpandColumn(dataRow, key, dataField) {
    if (dataRow.children && dataRow.children.length > 0) {
      let iconCell = React.createElement(FontAwesomeIcon, {
        icon: faAngleRight,
        fixedWidth: true,
        onClick: this.rowExpandOrCollapse.bind(this, dataRow.rowID)
      });

      if (dataRow.expanded) {
        iconCell = React.createElement(FontAwesomeIcon, {
          icon: faAngleDown,
          fixedWidth: true,
          onClick: this.rowExpandOrCollapse.bind(this, dataRow.rowID)
        });
      }

      if (this.props.control.fixedWidthColumns) {
        return React.createElement("td", {
          key: key,
          width: this.props.control.columnWidths[0] + '%'
        }, React.createElement("span", {
          style: {
            marginLeft: dataRow.rowLevel + 'em'
          }
        }, iconCell, React.createElement("span", {
          className: "iconPadding"
        }, dataRow.data[dataField])));
      } else {
        return React.createElement("td", {
          key: key
        }, React.createElement("span", {
          style: {
            marginLeft: dataRow.rowLevel + 'em'
          }
        }, iconCell, React.createElement("span", {
          className: "iconPadding"
        }, dataRow.data[dataField])));
      }
    } else {
      if (this.props.control.fixedWidthColumns) {
        return React.createElement("td", {
          key: key,
          width: this.props.control.columnWidths[0] + '%'
        }, React.createElement("span", {
          style: {
            marginLeft: dataRow.rowLevel + 1.25 + 'em'
          }
        }, React.createElement("span", {
          className: "iconPadding"
        }, dataRow.data[dataField])));
      } else {
        return React.createElement("td", {
          key: key
        }, React.createElement("span", {
          style: {
            marginLeft: dataRow.rowLevel + 1.25 + 'em'
          }
        }, React.createElement("span", {
          className: "iconPadding"
        }, dataRow.data[dataField])));
      }
    }
  }

  processDataRow(dataFields, dataRow) {
    let rowBody = [];
    rowBody.push(dataFields.map((dataField, index) => {
      let key = dataRow.parentRowID + "-" + dataRow.rowID + '-' + index;

      if (index === 0) {
        return this.generateExpandColumn(dataRow, key, dataField);
      } else {
        if (this.props.control.fixedWidthColumns) {
          return React.createElement("td", {
            key: key,
            width: this.props.control.columnWidths[index] + '%'
          }, dataRow.data[dataField]);
        } else {
          return React.createElement("td", {
            key: key
          }, dataRow.data[dataField]);
        }
      }
    }));
    return rowBody;
  }

  generateHeaderRow() {
    let headingRows = [];

    if (this.props.columnHeadings) {
      headingRows.push(this.props.columnHeadings.map(heading => React.createElement("th", {
        key: heading
      }, heading)));
    } else {
      headingRows.push(this.props.dataFields.map(heading => React.createElement("th", {
        key: heading
      }, heading)));
    }

    return headingRows;
  }

  render() {
    let headingRows = this.generateHeaderRow();
    let tableBody = this.generateTableBody(this.props.dataFields, this.state.enhancedTableData);
    return React.createElement("div", null, React.createElement("button", {
      onClick: this.expandOrCollapseAll.bind(this),
      className: this.props.control.showButton ? this.props.control.buttonClasses : "hidden"
    }, this.state.expanded ? 'Collapse All' : 'Expand All'), React.createElement("table", {
      className: this.props.control.tableClasses
    }, React.createElement("thead", null, React.createElement("tr", null, headingRows)), React.createElement("tbody", null, tableBody)));
  }

}

SimpleTreeTable.propTypes = {
  columnHeadings: PropTypes.arrayOf(PropTypes.string),
  dataFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object,
    children: PropTypes.arrayOf(PropTypes.object)
  })).isRequired,
  control: PropTypes.shape({
    tableClasses: PropTypes.string,
    buttonClasses: PropTypes.string,
    showButton: PropTypes.bool,
    fixedWidthColumns: PropTypes.bool,
    columnWidths: PropTypes.arrayOf(PropTypes.number)
  })
};
export default SimpleTreeTable;