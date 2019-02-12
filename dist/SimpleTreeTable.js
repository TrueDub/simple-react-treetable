"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var SimpleTreeTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SimpleTreeTable, _React$Component);

  function SimpleTreeTable(props) {
    var _this;

    _classCallCheck(this, SimpleTreeTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SimpleTreeTable).call(this, props));

    var initialState = _this.generateInitialState();

    var endRow = 0;

    if (_this.props.control.showPagination) {
      endRow = _this.props.control.initialRowsPerPage > initialState.enhancedTableData.length ? initialState.enhancedTableData.length - 1 : _this.props.control.initialRowsPerPage - 1;
    } else {
      endRow = initialState.enhancedTableData.length - 1;
    }

    _this.moveToSpecificPage = _this.moveToSpecificPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      enhancedTableData: initialState.enhancedTableData,
      expanded: false,
      enhancedColumns: initialState.enhancedColumns,
      showResetSortingButton: initialState.showResetSortingButton,
      childrenPresent: initialState.childrenPresent,
      startRow: 0,
      endRow: endRow,
      currentPage: 1,
      filterValue: ''
    };
    return _this;
  }

  _createClass(SimpleTreeTable, [{
    key: "generateInitialState",
    value: function generateInitialState() {
      var visibleRows = this.props.control.hasOwnProperty('visibleRows') ? this.props.control.visibleRows : 1;
      var enhancedTableData = this.generateStateTableData(this.props.tableData, visibleRows);
      var enhancedColumns = this.generateColumnState(this.props.columns);
      var initialSortField = null;
      var initialSortOrder = null;
      var showResetSortingButton = false;
      enhancedColumns.forEach(function (column) {
        if (column.sortOrder !== 'none') {
          initialSortField = column.dataField;
          initialSortOrder = column.sortOrder;
          showResetSortingButton = true;
        }
      });
      var childrenPresent = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = enhancedTableData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;

          if (entry.children && entry.children.length > 0) {
            childrenPresent = true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (initialSortField !== null) {
        enhancedTableData = this.sortBy(enhancedTableData, initialSortField, initialSortOrder);
      }

      return {
        enhancedTableData: enhancedTableData,
        enhancedColumns: enhancedColumns,
        showResetSortingButton: showResetSortingButton,
        childrenPresent: childrenPresent
      };
    }
  }, {
    key: "generateStateTableData",
    value: function generateStateTableData(tree, visibleRows) {
      var n = 1;
      return function recurse(children) {
        var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var rowLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

        if (children) {
          return children.map(function (node) {
            var rowID = n++;
            return Object.assign({}, node, {
              rowID: rowID,
              rowOrder: rowID,
              rowLevel: rowLevel,
              parentRowID: parent,
              visible: rowLevel <= visibleRows,
              expanded: rowLevel < visibleRows,
              filtered: false,
              children: recurse(node.children, rowID, rowLevel + 1)
            });
          });
        }
      }(tree);
    }
  }, {
    key: "generateColumnState",
    value: function generateColumnState(initialColumns) {
      return initialColumns.map(function (node) {
        var sortOrder = node.hasOwnProperty('sortOrder') ? node.sorted : 'none';
        return Object.assign({}, node, {
          sortable: node.hasOwnProperty('sortable') ? node.sortable : true,
          sortOrder: sortOrder
        });
      });
    } // state-changing functions below here
    //expand/collapse

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
    } //sorting

  }, {
    key: "sortByField",
    value: function sortByField(fieldName, renderer) {
      var sortStatus = this.getSortStatus(fieldName);
      var sortOrder = 'asc';

      if (sortStatus === 'asc') {
        sortOrder = 'desc';
      }

      var newTree = this.sortBy(this.state.enhancedTableData, fieldName, sortOrder, renderer);
      var n = 0;

      var orderedNewTree = function recurse(children) {
        if (children) {
          return children.map(function (node) {
            return Object.assign({}, node, {
              rowOrder: n++,
              children: recurse(node.children)
            });
          });
        }
      }(newTree);

      var newColumns = this.state.enhancedColumns.map(function (node) {
        var newSortOrder = 'none';

        if (node.dataField === fieldName) {
          newSortOrder = sortOrder;
        }

        return Object.assign({}, node, {
          sortOrder: newSortOrder
        });
      });
      this.setState({
        enhancedTableData: orderedNewTree,
        enhancedColumns: newColumns,
        showResetSortingButton: true
      });
    }
  }, {
    key: "sortBy",
    value: function sortBy(data, fieldName, direction, renderer) {
      var _this2 = this;

      data.forEach(function (entry) {
        if (entry.children && entry.children.length > 0) {
          entry.children = _this2.sortBy(entry.children, fieldName, direction, renderer);
        }
      });

      if (direction === 'asc') {
        return data.sort(function (a, b) {
          var aValue = a.data[fieldName];
          var bValue = b.data[fieldName];

          if (renderer) {
            aValue = renderer(a, fieldName);
            bValue = renderer(b, fieldName);
          }

          console.log('sorting ' + aValue + ' against ' + bValue);
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        });
      } else {
        return data.sort(function (b, a) {
          var aValue = a.data[fieldName];
          var bValue = b.data[fieldName];

          if (renderer) {
            aValue = renderer(a, fieldName);
            bValue = renderer(b, fieldName);
          }

          console.log('sorting ' + aValue + ' against ' + bValue);
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        });
      }
    }
  }, {
    key: "getSortStatus",
    value: function getSortStatus(fieldName) {
      for (var i = 0; i < this.state.enhancedColumns.length; i++) {
        if (this.state.enhancedColumns[i].dataField === fieldName) {
          return this.state.enhancedColumns[i].sortOrder;
        }
      }
    }
  }, {
    key: "resetSorting",
    value: function resetSorting() {
      var initialState = this.generateInitialState();
      this.setState({
        enhancedTableData: initialState.enhancedTableData,
        enhancedColumns: initialState.enhancedColumns,
        showResetSortingButton: initialState.showResetSortingButton
      });
    } //pagination

  }, {
    key: "moveToSpecificPage",
    value: function moveToSpecificPage(page) {
      var filtered = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var filteredData = arguments.length > 2 ? arguments[2] : undefined;
      var newStartRow = (page - 1) * this.props.control.initialRowsPerPage;
      var newEndRow = newStartRow + this.props.control.initialRowsPerPage - 1;

      if (filtered) {
        //need to count from newStartRow forward to get the right number of visible rows
        console.log('newStartRow: ' + newStartRow);
        console.log('this.props.control.initialRowsPerPage: ' + this.props.control.initialRowsPerPage);
        console.log('old newEndRow: ' + newEndRow);
        console.log(' ');
        var visibleRows = 0;
        var checkRow = newStartRow;

        while (visibleRows < this.props.control.initialRowsPerPage) {
          console.log('checkRow: ' + checkRow + ' ' + filteredData.enhancedTableData[checkRow].filtered);

          if (!filteredData.enhancedTableData[checkRow].filtered) {
            console.log('visible');
            visibleRows++;
          }

          if (visibleRows === this.props.control.initialRowsPerPage - 1 || checkRow === filteredData.enhancedTableData.length - 1) {
            newEndRow = checkRow;
            break;
          } else {
            checkRow++;
          }
        }

        console.log('new newEndRow: ' + newEndRow);
        this.setState({
          startRow: newStartRow,
          endRow: newEndRow,
          currentPage: page,
          enhancedTableData: filteredData.enhancedTableData,
          filterValue: filteredData.filterValue
        });
      } else {
        this.setState({
          startRow: newStartRow,
          endRow: newEndRow,
          currentPage: page
        });
      }

      ;
    } //filtering

  }, {
    key: "applyFilter",
    value: function applyFilter(event) {
      var filterValue = event.target.value;
      var columns = this.props.columns;

      var filteredNewTree = function recurse(children) {
        if (children) {
          return children.map(function (node) {
            var filtered = false;

            for (var i = 0; i < columns.length; i++) {
              var column = columns[i];
              var filter = column.hasOwnProperty("filterable") ? column.filterable : true;

              if (filter) {
                var columnValue = node.data[column.dataField];

                if (filterValue === '') {
                  filtered = false;
                } else {
                  if (String(columnValue).includes(String(filterValue))) {
                    filtered = false;
                    break;
                  } else {
                    filtered = true;
                  }
                }
              }
            }

            return Object.assign({}, node, {
              filtered: filtered,
              children: recurse(node.children)
            });
          });
        }
      }(this.state.enhancedTableData);

      var outputData = {
        enhancedTableData: filteredNewTree,
        filterValue: filterValue
      };
      this.moveToSpecificPage(this.state.currentPage, true, outputData);
    } //from here down the functions deal with rendering

  }, {
    key: "getMaxRowID",
    value: function getMaxRowID(tree) {
      var entry = tree[tree.length - 1];

      if (entry.children && entry.children.length > 0) {
        return this.getMaxRowID(entry.children);
      }

      return entry.rowOrder;
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
      var startRowID = tableData[startRow].rowOrder;
      var endRowID = this.getNextRowID(tableData, endRow);
      return this.generateTableBodyRows(tableData, startRowID, endRowID);
    }
  }, {
    key: "generateTableBodyRows",
    value: function generateTableBodyRows(tableData, startRow, endRow) {
      var _this3 = this;

      var tableBody = [];
      tableData.forEach(function (dataRow) {
        if (dataRow.rowOrder >= startRow && dataRow.rowOrder <= endRow) {
          var rowData = _this3.processDataRow(dataRow);

          var key = dataRow.parentRowID + '-' + dataRow.rowID;
          var rowClass = dataRow.visible ? 'shown' : 'hidden';

          if (dataRow.filtered) {
            rowClass = 'hidden';
          }

          tableBody.push(_react.default.createElement("tr", {
            className: rowClass,
            key: key
          }, rowData));

          if (dataRow.children) {
            tableBody.push.apply(tableBody, _toConsumableArray(_this3.generateTableBodyRows(dataRow.children, startRow, endRow)));
          }
        }
      });
      return tableBody;
    }
  }, {
    key: "generateExpandColumn",
    value: function generateExpandColumn(dataRow, key, dataField) {
      var output = dataRow.data[dataField];

      if (this.state.enhancedColumns[0].renderer) {
        output = this.state.enhancedColumns[0].renderer(dataRow, dataField);
      }

      if (!this.state.childrenPresent) {
        //no expander required
        if (this.state.enhancedColumns[0].fixedWidth) {
          return _react.default.createElement("td", {
            key: key,
            className: this.state.enhancedColumns[0].styleClass,
            width: this.state.enhancedColumns[0].percentageWidth + '%'
          }, output);
        } else {
          return _react.default.createElement("td", {
            key: key,
            className: this.state.enhancedColumns[0].styleClass
          }, output);
        }
      }

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

        if (this.state.enhancedColumns[0].fixedWidth) {
          return _react.default.createElement("td", {
            key: key,
            className: this.state.enhancedColumns[0].styleClass,
            width: this.state.enhancedColumns[0].percentageWidth + '%'
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
            className: this.state.enhancedColumns[0].styleClass
          }, _react.default.createElement("span", {
            style: {
              marginLeft: dataRow.rowLevel + 'em'
            }
          }, iconCell, _react.default.createElement("span", {
            className: "iconPadding"
          }, output)));
        }
      } else {
        if (this.state.enhancedColumns[0].fixedWidth) {
          return _react.default.createElement("td", {
            key: key,
            className: this.state.enhancedColumns[0].styleClass,
            width: this.state.enhancedColumns[0].percentageWidth + '%'
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
            className: this.state.enhancedColumns[0].styleClass
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
      var _this4 = this;

      var rowBody = [];
      rowBody.push(this.state.enhancedColumns.map(function (column, index) {
        var key = dataRow.parentRowID + '-' + dataRow.rowID + '-' + index;
        var output = dataRow.data[column.dataField];

        if (column.renderer) {
          output = _this4.state.enhancedColumns[index].renderer(dataRow, column.dataField);
        }

        if (index === 0) {
          return _this4.generateExpandColumn(dataRow, key, column.dataField);
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
      var _this5 = this;

      var headingRows = [];

      if (this.state.enhancedColumns) {
        headingRows.push(this.state.enhancedColumns.map(function (column) {
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

          if (_this5.props.control.allowSorting && column.sortable) {
            return _react.default.createElement("th", {
              key: fieldTitle,
              onClick: _this5.sortByField.bind(_this5, column.dataField, column.renderer)
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
      if (this.props.control.showPagination) {
        return _react.default.createElement("div", null, _react.default.createElement(_Paginator.default, {
          currentPage: this.state.currentPage,
          tableLength: this.state.enhancedTableData.length,
          rowsPerPage: this.props.control.initialRowsPerPage,
          rowMover: this.moveToSpecificPage,
          paginationClasses: this.props.control.paginationClasses
        }));
      }

      return _react.default.createElement("div", null);
    }
  }, {
    key: "render",
    value: function render() {
      var headingRows = this.generateHeaderRow();
      var tableBody = this.generateTableBody(this.state.enhancedTableData, this.state.startRow, this.state.endRow);
      return _react.default.createElement("div", null, _react.default.createElement("div", null, _react.default.createElement("span", {
        className: this.props.control.showFilterInput ? '' : 'hidden'
      }, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _freeSolidSvgIcons.faSearch,
        pull: "left"
      }), _react.default.createElement("input", {
        type: "text",
        value: this.state.filterValue,
        onChange: this.applyFilter.bind(this),
        placeholder: this.props.control.filterInputPlaceholderText,
        className: this.props.control.filterInputClasses
      })), _react.default.createElement("span", null, _react.default.createElement("button", {
        onClick: this.expandOrCollapseAll.bind(this),
        className: this.props.control.showExpandCollapseButton ? this.props.control.expandCollapseButtonClasses : 'hidden'
      }, this.state.expanded ? 'Collapse All' : 'Expand All')), _react.default.createElement("span", null, _react.default.createElement("button", {
        onClick: this.resetSorting.bind(this),
        className: this.state.showResetSortingButton ? this.props.control.resetSortingButtonClasses : 'hidden'
      }, "Reset Sorting"))), _react.default.createElement("table", {
        className: this.props.control.tableClasses
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, headingRows)), _react.default.createElement("tbody", null, tableBody)), this.generatePaginatorRow());
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
    visibleRows: _propTypes.default.number,
    tableClasses: _propTypes.default.string,
    showExpandCollapseButton: _propTypes.default.bool,
    expandCollapseButtonClasses: _propTypes.default.string,
    allowSorting: _propTypes.default.bool,
    showResetSortingButton: _propTypes.default.bool,
    resetSortingButtonClasses: _propTypes.default.string,
    showFilterInput: _propTypes.default.bool,
    filterInputClasses: _propTypes.default.string,
    filterInputPlaceholderText: _propTypes.default.string,
    showPagination: _propTypes.default.bool,
    initialRowsPerPage: _propTypes.default.number,
    paginationClasses: _propTypes.default.shape({
      listClasses: _propTypes.default.string,
      listItemClasses: _propTypes.default.string,
      linkClasses: _propTypes.default.string,
      activePageClasses: _propTypes.default.string
    })
  }),
  columns: _propTypes.default.arrayOf(_propTypes.default.shape({
    dataField: _propTypes.default.string.isRequired,
    heading: _propTypes.default.string,
    fixedWidth: _propTypes.default.bool,
    percentageWidth: _propTypes.default.number,
    styleClass: _propTypes.default.string,
    renderer: _propTypes.default.func,
    sortable: _propTypes.default.bool,
    sortOrder: _propTypes.default.string,
    filterable: _propTypes.default.bool
  }))
};
SimpleTreeTable.defaultProps = {
  tableData: [],
  control: {
    visibleRows: 1,
    tableClasses: '',
    showExpandCollapseButton: false,
    expandCollapseButtonClasses: '',
    allowSorting: false,
    showResetSortingButton: false,
    resetSortingButtonClasses: '',
    showFilterInput: false,
    filterInputPlaceholderText: "filter",
    showPagination: false,
    initialRowsPerPage: 0,
    bootstrapStyling: false
  },
  columns: [{
    dataField: '',
    heading: '',
    fixedWidth: false,
    percentageWidth: 0,
    styleClass: '',
    renderer: null,
    sortable: true,
    filterable: true
  }]
};
var _default = SimpleTreeTable;
exports.default = _default;