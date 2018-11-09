import React from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.css";
import "./TreeTable.css";

class TreeTable extends React.Component {
  constructor(props) {
    super(props);
    this.rowExpandOrCollapse = this.rowExpandOrCollapse.bind(this);
    this.state = {
      enhancedTableData: this.generateStateTableData(this.props.tableData)
    };
  }

  generateStateTableData(tree, n = 1) {
    return function recurse(children, parent = 0) {
      return children.map(node => {
        let rowID = n++;
        return Object.assign({}, node, {
          rowID: rowID,
          parentRowID: parent,
          visible: parent === 0 ? true : false,
          expanded: false,
          children: recurse(node.children, rowID)
        });
      });
    }(tree);
  }

  rowExpandOrCollapse(selectedRowID) {
    let newTree = function recurse(children) {
      return children.map(node => {
        let setExpanded = node.rowID === selectedRowID ? !node.expanded : node.expanded;
        let setVisible = node.parentRowID === selectedRowID ? !node.visible : node.visible;
        return Object.assign({}, node, {
          visible: setVisible,
          expanded: setExpanded,
          children: recurse(node.children)
        });
      });
    }(this.state.enhancedTableData);

    this.setState({
      enhancedTableData: newTree
    });
  }

  generateTableBody(dataFields, tableData) {
    let tableBody = [];
    tableData.forEach((dataRow, index) => {
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
    if (dataRow.children.length > 0) {
      let iconCell = React.createElement(FontAwesomeIcon, {
        icon: faAngleRight,
        onClick: this.rowExpandOrCollapse.bind(this, dataRow.rowID)
      });

      if (dataRow.expanded) {
        iconCell = React.createElement(FontAwesomeIcon, {
          icon: faAngleDown,
          onClick: this.rowExpandOrCollapse.bind(this, dataRow.rowID)
        });
      }

      return React.createElement("td", {
        key: key
      }, iconCell, " ", React.createElement("span", {
        className: "expandCell"
      }, dataRow.data[dataField]));
    } else {
      return React.createElement("td", {
        key: key
      }, React.createElement("span", {
        className: "expandCell"
      }, dataRow.data[dataField]));
    }
  }

  processDataRow(dataFields, dataRow) {
    let rowBody = [];
    rowBody.push(dataFields.map((dataField, index) => {
      let key = dataRow.parentRowID + "-" + dataRow.rowID + '-' + index;

      if (index === 0) {
        return this.generateExpandColumn(dataRow, key, dataField);
      } else {
        return React.createElement("td", {
          key: key
        }, dataRow.data[dataField]);
      }
    }));
    return rowBody;
  }

  generateHeaderRow() {
    let headingRows = [];
    headingRows.push(this.props.columnHeadings.map(heading => React.createElement("th", {
      key: heading
    }, heading)));
    return headingRows;
  }

  render() {
    let headingRows = this.generateHeaderRow();
    let tableBody = this.generateTableBody(this.props.dataFields, this.state.enhancedTableData);
    return React.createElement("table", {
      className: "table"
    }, React.createElement("thead", null, React.createElement("tr", null, headingRows)), React.createElement("tbody", null, tableBody));
  }

}

TreeTable.propTypes = {
  columnHeadings: PropTypes.arrayOf(PropTypes.string),
  dataFields: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object,
    children: PropTypes.arrayOf(PropTypes.object)
  }))
};
export default TreeTable;