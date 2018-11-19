"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

require("./SimpleTreeTable.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SimpleTreeTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SimpleTreeTable, _React$Component);

  function SimpleTreeTable(props) {
    var _this;

    _classCallCheck(this, SimpleTreeTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SimpleTreeTable).call(this, props));
    _this.state = {
      enhancedTableData: _this.generateStateTableData(_this.props.tableData),
      expanded: false
    };
    return _this;
  }

  _createClass(SimpleTreeTable, [{
    key: "generateStateTableData",
    value: function generateStateTableData(tree) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return function recurse(children) {
        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var rowLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        if (children) {
          return children.map(function (node) {
            var rowID = n++;
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
  }, {
    key: "expandOrCollapseAll",
    value: function expandOrCollapseAll() {
      var action = !this.state.expanded;

      var newTree = function recurse(children) {
        return children.map(function (node) {
          var visibleAction = node.rowLevel === 1 ? true : action;
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
  }, {
    key: "rowExpandOrCollapse",
    value: function rowExpandOrCollapse(selectedRowID) {
      var newTree = this.expandOrCollapseTree(this.state.enhancedTableData, selectedRowID, false, false);
      this.setState({
        enhancedTableData: newTree
      });
    }
  }, {
    key: "expandOrCollapseTree",
    value: function expandOrCollapseTree(data, selectedRowID, expandAll, collapseAll) {
      return function recurse(children) {
        var expandBranch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : expandAll;
        var collapseBranch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : collapseAll;
        return children.map(function (node) {
          var setExpanded = node.rowID === selectedRowID ? !node.expanded : node.expanded;
          var setVisible = node.parentRowID === selectedRowID ? !node.visible : node.visible;

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
  }, {
    key: "generateTableBody",
    value: function generateTableBody(tableData) {
      var _this2 = this;

      var tableBody = [];
      tableData.forEach(function (dataRow) {
        var rowData = _this2.processDataRow(dataRow);

        var key = dataRow.parentRowID + '-' + dataRow.rowID;
        var rowClass = dataRow.visible ? 'shown' : 'hidden';
        tableBody.push(_react.default.createElement("tr", {
          className: rowClass,
          key: key
        }, rowData));

        if (dataRow.children) {
          tableBody.push.apply(tableBody, _toConsumableArray(_this2.generateTableBody(dataRow.children)));
        }
      });
      return tableBody;
    }
  }, {
    key: "generateExpandColumn",
    value: function generateExpandColumn(dataRow, key, dataField) {
      if (dataRow.children && dataRow.children.length > 0) {
        var iconCell = _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faAngleRight,
          fixedWidth: true,
          onClick: this.rowExpandOrCollapse.bind(this, dataRow.rowID)
        });

        if (dataRow.expanded) {
          iconCell = _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
            icon: _freeSolidSvgIcons.faAngleDown,
            fixedWidth: true,
            onClick: this.rowExpandOrCollapse.bind(this, dataRow.rowID)
          });
        }

        if (this.props.columns[0].fixedWidth) {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.columns[0].styleClass,
            width: this.props.columns[0].percentageWidth + '%'
          }, _react.default.createElement("span", {
            style: {
              marginLeft: dataRow.rowLevel + 'em'
            }
          }, iconCell, _react.default.createElement("span", {
            className: "iconPadding"
          }, dataRow.data[dataField])));
        } else {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.columns[0].styleClass
          }, _react.default.createElement("span", {
            style: {
              marginLeft: dataRow.rowLevel + 'em'
            }
          }, iconCell, _react.default.createElement("span", {
            className: "iconPadding"
          }, dataRow.data[dataField])));
        }
      } else {
        if (this.props.columns[0].fixedWidth) {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.columns[0].styleClass,
            width: this.props.columns[0].percentageWidth + '%'
          }, _react.default.createElement("span", {
            style: {
              marginLeft: dataRow.rowLevel + 1.25 + 'em'
            }
          }, _react.default.createElement("span", {
            className: "iconPadding"
          }, dataRow.data[dataField])));
        } else {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.columns[0].styleClass
          }, _react.default.createElement("span", {
            style: {
              marginLeft: dataRow.rowLevel + 1.25 + 'em'
            }
          }, _react.default.createElement("span", {
            className: "iconPadding"
          }, dataRow.data[dataField])));
        }
      }
    }
  }, {
    key: "processDataRow",
    value: function processDataRow(dataRow) {
      var _this3 = this;

      var rowBody = [];
      rowBody.push(this.props.columns.map(function (column, index) {
        var key = dataRow.parentRowID + '-' + dataRow.rowID + '-' + index;
        var output = dataRow.data[column.dataField];

        if (column.renderer) {
          output = _this3.props.columns[index].renderer(dataRow, column.dataField);
        }

        if (index === 0) {
          return _this3.generateExpandColumn(dataRow, key, column.dataField);
        } else {
          if (column.fixedWidth) {
            return _react.default.createElement("td", {
              key: key,
              className: column.styleClass,
              width: column.percentageWidth + '%'
            }, output);
          } else {
            return _react.default.createElement("td", {
              key: key,
              className: column.styleClass
            }, output);
          }
        }
      }));
      return rowBody;
    }
  }, {
    key: "generateHeaderRow",
    value: function generateHeaderRow() {
      var headingRows = [];

      if (this.props.columns) {
        headingRows.push(this.props.columns.map(function (column) {
          if (column.heading) {
            return _react.default.createElement("th", {
              key: column.heading
            }, column.heading);
          } else {
            return _react.default.createElement("th", {
              key: column.dataField
            }, column.dataField);
          }
        }));
      }

      return headingRows;
    }
  }, {
    key: "render",
    value: function render() {
      var headingRows = this.generateHeaderRow();
      var tableBody = this.generateTableBody(this.state.enhancedTableData);
      return _react.default.createElement("div", null, _react.default.createElement("button", {
        onClick: this.expandOrCollapseAll.bind(this),
        className: this.props.control.showButton ? this.props.control.buttonClasses : 'hidden'
      }, this.state.expanded ? 'Collapse All' : 'Expand All'), _react.default.createElement("table", {
        className: this.props.control.tableClasses
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, headingRows)), _react.default.createElement("tbody", null, tableBody)));
    }
  }]);

  return SimpleTreeTable;
}(_react.default.Component);

SimpleTreeTable.propTypes = {
  tableData: _propTypes.default.arrayOf(_propTypes.default.shape({
    data: _propTypes.default.object,
    children: _propTypes.default.arrayOf(_propTypes.default.object)
  })).isRequired,
  control: _propTypes.default.shape({
    tableClasses: _propTypes.default.string,
    buttonClasses: _propTypes.default.string,
    showButton: _propTypes.default.bool
  }),
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    dataField: _propTypes.default.string.isRequired,
    heading: _propTypes.default.string,
    fixedWidth: _propTypes.default.bool,
    percentageWidth: _propTypes.default.number,
    styleClass: _propTypes.default.string,
    renderer: _propTypes.default.func
  }))
};
var _default = SimpleTreeTable;
exports.default = _default;