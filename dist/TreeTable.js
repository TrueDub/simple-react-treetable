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

var _react = _interopRequireDefault(require("react"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _Paginator = _interopRequireDefault(require("./Paginator"));

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var TreeTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TreeTable, _React$Component);

  function TreeTable(props) {
    var _this;

    _classCallCheck(this, TreeTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeTable).call(this, props));
    _this.moveToSpecificPage = _this.moveToSpecificPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    var newTableData = _this.filterNonVisibleRows(_this.props.tableData);

    var endRow = 0;

    if (_this.props.control.showPagination) {
      endRow = _this.props.control.initialRowsPerPage > newTableData.length ? newTableData.length - 1 : _this.props.control.initialRowsPerPage - 1;
    } else {
      endRow = newTableData.length - 1;
    }

    var styling = _this.addStyling();

    _this.state = {
      startRow: 0,
      endRow: endRow,
      currentPage: 1,
      tableData: newTableData,
      styling: styling
    };
    return _this;
  }

  _createClass(TreeTable, [{
    key: "addStyling",
    value: function addStyling() {
      if (this.props.control.bootstrapStyling) {
        return {
          tableClasses: "table table-bordered",
          resetSortingButtonClasses: "btn btn-default float-right",
          filterInputClasses: "float-left col-xs-2",
          paginationClasses: {
            listClasses: "pagination justify-content-center",
            listItemClasses: 'page-item',
            linkClasses: 'page-link',
            activePageClasses: 'active'
          }
        };
      } else {
        return {
          tableClasses: this.props.control.tableClasses,
          resetSortingButtonClasses: this.props.control.resetSortingButtonClasses,
          filterInputClasses: this.props.control.filterInputClasses,
          paginationClasses: this.props.control.paginationClasses
        };
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var newTableData = this.filterNonVisibleRows(nextProps.tableData);
      var newStartAndEnd = this.calculateNewStartAndEndRows(this.state.currentPage, this.props.control.initialRowsPerPage, this.state.tableData.length);
      this.setState({
        tableData: newTableData,
        filtered: nextProps.filtered,
        startRow: newStartAndEnd.startRow,
        endRow: newStartAndEnd.endRow,
        currentPage: newStartAndEnd.currentPage
      });
    }
  }, {
    key: "filterNonVisibleRows",
    value: function filterNonVisibleRows(data) {
      var self = this;
      var r = data.filter(function (o) {
        if (o.children) o.children = self.filterNonVisibleRows(o.children);
        return !o.filtered;
      });
      return r;
    }
  }, {
    key: "getMaxRowID",
    value: function getMaxRowID(tree) {
      var entry = tree[tree.length - 1];

      if (entry.children && entry.children.length > 0) {
        return this.getMaxRowID(entry.children);
      }

      return entry.rowOrder;
    } //pagination

  }, {
    key: "moveToSpecificPage",
    value: function moveToSpecificPage(page) {
      var newStartAndEnd = this.calculateNewStartAndEndRows(page, this.props.control.initialRowsPerPage, this.state.tableData.length);
      this.setState({
        startRow: newStartAndEnd.startRow,
        endRow: newStartAndEnd.endRow,
        currentPage: newStartAndEnd.currentPage
      });
    }
  }, {
    key: "calculateNewStartAndEndRows",
    value: function calculateNewStartAndEndRows(page, rowsPerPage, tableLength) {
      var newPage = page; //check the current page isn't too high for the data provided

      var max = (page - 1) * rowsPerPage;

      if (max > tableLength) {
        newPage = Math.ceil(tableLength / rowsPerPage);
      } //calculate the start & end rows


      var newStartRow = (newPage - 1) * rowsPerPage;
      var newEndRow = newStartRow + rowsPerPage - 1;
      return {
        startRow: newStartRow,
        endRow: newEndRow,
        currentPage: newPage
      };
    }
  }, {
    key: "getNextRowID",
    value: function getNextRowID(tree, position) {
      var entry = tree[position];

      if (entry) {
        if (entry.children && entry.children.length > 0) {
          return this.getMaxRowID(entry.children);
        }

        return entry.rowOrder;
      } //if no entry at that position, return the last element


      return tree[tree.length - 1].rowOrder;
    }
  }, {
    key: "generateTableBody",
    value: function generateTableBody(tableData, startRow, endRow) {
      if (tableData.length > 0) {
        return this.generateTableBodyRows(tableData, startRow, endRow);
      } else {
        return null;
      }
    }
  }, {
    key: "generateTableBodyRows",
    value: function generateTableBodyRows(tableData, startRow, endRow) {
      var _this2 = this;

      var tableBody = [];
      tableData.forEach(function (dataRow, index) {
        if (index >= startRow && index <= endRow) {
          var rowData = _this2.processDataRow(dataRow);

          var key = dataRow.parentRowID + '-' + dataRow.rowID;
          var rowClass = dataRow.visible ? 'shown' : 'hidden';
          tableBody.push(_react.default.createElement("tr", {
            className: rowClass,
            key: key
          }, rowData));

          if (dataRow.children) {
            tableBody.push.apply(tableBody, _toConsumableArray(_this2.generateTableBodyRows(dataRow.children, startRow, endRow)));
          }
        }
      });
      return tableBody;
    }
  }, {
    key: "generateExpandColumn",
    value: function generateExpandColumn(dataRow, key, dataField) {
      var output = dataRow.data[dataField];

      if (this.props.enhancedColumns[0].renderer) {
        output = this.props.enhancedColumns[0].renderer(dataRow, dataField);
      }

      if (!this.props.childrenPresent) {
        //no expander required
        if (this.props.enhancedColumns[0].fixedWidth) {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.enhancedColumns[0].styleClass,
            width: this.props.enhancedColumns[0].percentageWidth + '%'
          }, output);
        } else {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.enhancedColumns[0].styleClass
          }, output);
        }
      }

      if (dataRow.children && dataRow.children.length > 0) {
        var iconCell = _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
          icon: _freeSolidSvgIcons.faAngleRight,
          fixedWidth: true,
          onClick: this.props.rowExpandOrCollapse.bind(null, dataRow.rowID)
        });

        if (dataRow.expanded) {
          iconCell = _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
            icon: _freeSolidSvgIcons.faAngleDown,
            fixedWidth: true,
            onClick: this.props.rowExpandOrCollapse.bind(null, dataRow.rowID)
          });
        }

        if (this.props.enhancedColumns[0].fixedWidth) {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.enhancedColumns[0].styleClass,
            width: this.props.enhancedColumns[0].percentageWidth + '%'
          }, _react.default.createElement("span", {
            style: {
              marginLeft: dataRow.rowLevel + 'em'
            }
          }, iconCell, _react.default.createElement("span", {
            className: "iconPadding"
          }, output)));
        } else {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.enhancedColumns[0].styleClass
          }, _react.default.createElement("span", {
            style: {
              marginLeft: dataRow.rowLevel + 'em'
            }
          }, iconCell, _react.default.createElement("span", {
            className: "iconPadding"
          }, output)));
        }
      } else {
        if (this.props.enhancedColumns[0].fixedWidth) {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.enhancedColumns[0].styleClass,
            width: this.props.enhancedColumns[0].percentageWidth + '%'
          }, _react.default.createElement("span", {
            style: {
              marginLeft: dataRow.rowLevel + 1.25 + 'em'
            }
          }, _react.default.createElement("span", {
            className: "iconPadding"
          }, output)));
        } else {
          return _react.default.createElement("td", {
            key: key,
            className: this.props.enhancedColumns[0].styleClass
          }, _react.default.createElement("span", {
            style: {
              marginLeft: dataRow.rowLevel + 1.25 + 'em'
            }
          }, _react.default.createElement("span", {
            className: "iconPadding"
          }, output)));
        }
      }
    }
  }, {
    key: "processDataRow",
    value: function processDataRow(dataRow) {
      var _this3 = this;

      var rowBody = [];
      rowBody.push(this.props.enhancedColumns.map(function (column, index) {
        var key = dataRow.parentRowID + '-' + dataRow.rowID + '-' + index;
        var output = dataRow.data[column.dataField];

        if (column.renderer) {
          output = _this3.props.enhancedColumns[index].renderer(dataRow, column.dataField);
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
      var _this4 = this;

      var headingRows = [];

      if (this.props.enhancedColumns) {
        headingRows.push(this.props.enhancedColumns.map(function (column, index) {
          var fieldTitle = column.heading ? column.heading : column.dataField;
          var sortIcon = null;

          if (column.sortOrder === 'asc') {
            sortIcon = _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
              icon: _freeSolidSvgIcons.faAngleUp,
              fixedWidth: true,
              pull: "right"
            });
          } else if (column.sortOrder === 'desc') {
            sortIcon = _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
              icon: _freeSolidSvgIcons.faAngleDown,
              fixedWidth: true,
              pull: "right"
            });
          } else {
            sortIcon = null;
          }

          if (_this4.props.control.allowSorting && column.sortable) {
            return _react.default.createElement("th", {
              key: fieldTitle,
              onClick: _this4.props.sortByField.bind(null, index)
            }, sortIcon, fieldTitle);
          } else {
            return _react.default.createElement("th", {
              key: fieldTitle
            }, fieldTitle);
          }
        }));
      }

      return headingRows;
    }
  }, {
    key: "generatePaginatorRow",
    value: function generatePaginatorRow() {
      if (this.props.control.showPagination && this.state.tableData.length > this.props.control.initialRowsPerPage) {
        var displayStartRow = this.state.startRow + 1;
        var displayEndRow = this.state.endRow > this.state.tableData.length ? this.state.tableData.length : this.state.endRow + 1;
        return _react.default.createElement("div", null, _react.default.createElement(_Paginator.default, {
          currentPage: this.state.currentPage,
          tableLength: this.state.tableData.length,
          rowsPerPage: this.props.control.initialRowsPerPage,
          rowMover: this.moveToSpecificPage,
          paginationClasses: this.state.styling.paginationClasses,
          displayStartRow: displayStartRow,
          displayEndRow: displayEndRow,
          displayTotal: this.state.tableData.length,
          displayFiltered: this.state.filtered,
          displayOverallTotal: this.props.tableData.length
        }));
      }

      return _react.default.createElement("div", null);
    }
  }, {
    key: "render",
    value: function render() {
      var headingRows = this.generateHeaderRow();
      var tableBody = this.generateTableBody(this.state.tableData, this.state.startRow, this.state.endRow);
      return _react.default.createElement("div", null, _react.default.createElement("div", null, _react.default.createElement("input", {
        type: "text",
        value: this.props.filterValue,
        onChange: this.props.applyFilter.bind(null),
        placeholder: this.props.control.filterInputPlaceholderText,
        className: this.props.control.showFilterInput ? this.state.styling.filterInputClasses : 'hidden'
      }), _react.default.createElement("button", {
        onClick: this.props.expandOrCollapseAll.bind(null),
        className: this.props.control.showExpandCollapseButton ? this.state.styling.expandCollapseButtonClasses : 'hidden'
      }, this.props.expanded ? 'Collapse All' : 'Expand All'), _react.default.createElement("button", {
        onClick: this.props.resetSorting.bind(null),
        className: this.props.showResetSortingButton ? this.state.styling.resetSortingButtonClasses : 'hidden'
      }, "Reset Sorting")), _react.default.createElement("table", {
        className: this.state.styling.tableClasses
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, headingRows)), _react.default.createElement("tbody", null, tableBody)), this.generatePaginatorRow());
    }
  }]);

  return TreeTable;
}(_react.default.Component);

var _default = TreeTable;
exports.default = _default;