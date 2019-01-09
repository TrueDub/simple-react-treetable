"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Paginator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Paginator, _React$Component);

  function Paginator(props) {
    var _this;

    _classCallCheck(this, Paginator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Paginator).call(this, props));

    var data = _this.performCalcs(_this.props.currentPage);

    _this.state = {
      pos1Value: data.pos1Value,
      pos2Value: data.pos2Value,
      pos3Value: data.pos3Value,
      pos4Value: data.pos4Value,
      pos5Value: data.pos5Value,
      pos1Classes: data.pos1Classes,
      pos2Classes: data.pos2Classes,
      pos3Classes: data.pos3Classes,
      pos4Classes: data.pos4Classes,
      pos5Classes: data.pos5Classes,
      totalNumberOfPages: data.totalNumberOfPages,
      currentPage: data.currentPage,
      listClasses: data.listClasses,
      listItemClasses: data.listItemClasses,
      linkClasses: data.linkClasses,
      activePageClasses: data.activePageClasses
    };
    return _this;
  }

  _createClass(Paginator, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var data = this.performCalcs(nextProps.currentPage);
      this.setState({
        pos1Value: data.pos1Value,
        pos2Value: data.pos2Value,
        pos3Value: data.pos3Value,
        pos4Value: data.pos4Value,
        pos5Value: data.pos5Value,
        totalNumberOfPages: data.totalNumberOfPages,
        currentPage: data.currentPage,
        listClasses: data.listClasses,
        listItemClasses: data.listItemClasses,
        linkClasses: data.linkClasses,
        pos1Classes: this.defineListItemClasses(data.pos1Value, data.currentPage, data.totalNumberOfPages),
        pos2Classes: this.defineListItemClasses(data.pos2Value, data.currentPage, data.totalNumberOfPages),
        pos3Classes: this.defineListItemClasses(data.pos3Value, data.currentPage, data.totalNumberOfPages),
        pos4Classes: this.defineListItemClasses(data.pos4Value, data.currentPage, data.totalNumberOfPages),
        pos5Classes: this.defineListItemClasses(data.pos5Value, data.currentPage, data.totalNumberOfPages)
      });
    }
  }, {
    key: "performCalcs",
    value: function performCalcs(currentPage) {
      var pos1Value = 1;
      var pos2Value = 2;
      var pos3Value = 3;
      var pos4Value = 4;
      var pos5Value = 5;

      if (currentPage > 3) {
        pos1Value = currentPage - 2;
        pos2Value = currentPage - 1;
        pos3Value = currentPage;
        pos4Value = currentPage + 1;
        pos5Value = currentPage + 2;
      }

      var totalNumberOfPages = Math.ceil(this.props.tableLength / this.props.rowsPerPage);

      if (totalNumberOfPages - currentPage === 0) {
        pos1Value = currentPage - 4;
        pos2Value = currentPage - 3;
        pos3Value = currentPage - 2;
        pos4Value = currentPage - 1;
        pos5Value = currentPage;
      } else if (totalNumberOfPages - currentPage === 1) {
        pos1Value = currentPage - 3;
        pos2Value = currentPage - 2;
        pos3Value = currentPage - 1;
        pos4Value = currentPage;
        pos5Value = currentPage + 1;
      }

      var listClasses = '';

      if (this.props.paginationClasses && this.props.paginationClasses.listClasses) {
        listClasses = this.props.paginationClasses.listClasses;
      }

      var listItemClasses = '';

      if (this.props.paginationClasses && this.props.paginationClasses.listItemClasses) {
        listItemClasses = this.props.paginationClasses.listItemClasses;
      }

      var linkClasses = '';

      if (this.props.paginationClasses && this.props.paginationClasses.linkClasses) {
        linkClasses += this.props.paginationClasses.linkClasses;
      }

      var activePageClasses = '';

      if (this.props.paginationClasses && this.props.paginationClasses.activePageClasses) {
        activePageClasses += this.props.paginationClasses.activePageClasses;
      }

      return {
        pos1Value: pos1Value,
        pos1Classes: this.defineListItemClasses(pos1Value, currentPage, totalNumberOfPages),
        pos2Value: pos2Value,
        pos2Classes: this.defineListItemClasses(pos2Value, currentPage, totalNumberOfPages),
        pos3Value: pos3Value,
        pos3Classes: this.defineListItemClasses(pos3Value, currentPage, totalNumberOfPages),
        pos4Value: pos4Value,
        pos4Classes: this.defineListItemClasses(pos4Value, currentPage, totalNumberOfPages),
        pos5Value: pos5Value,
        pos5Classes: this.defineListItemClasses(pos5Value, currentPage, totalNumberOfPages),
        totalNumberOfPages: totalNumberOfPages,
        currentPage: currentPage,
        listClasses: listClasses,
        listItemClasses: listItemClasses,
        linkClasses: linkClasses,
        activePageClasses: activePageClasses
      };
    }
  }, {
    key: "displayPageNumber",
    value: function displayPageNumber(posValue, currentPage, totalNumberOfPages) {
      if (posValue <= 0) {
        return false;
      }

      if (posValue > totalNumberOfPages) {
        return false;
      }

      return true;
    }
  }, {
    key: "defineListItemClasses",
    value: function defineListItemClasses(posValue, currentPage, totalNumberOfPages) {
      if (posValue <= 0 || posValue > totalNumberOfPages) {
        return 'hidden';
      }

      var classes = this.props.paginationClasses.listItemClasses;

      if (posValue === currentPage) {
        classes += ' ' + this.props.paginationClasses.activePageClasses;
      }

      return classes;
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement("ul", {
        className: this.state.listClasses
      }, _react.default.createElement("li", {
        className: this.state.listItemClasses
      }, _react.default.createElement("button", {
        className: this.state.linkClasses,
        onClick: this.props.rowMover.bind(null, 1)
      }, "First")), _react.default.createElement("li", {
        className: this.state.listItemClasses
      }, _react.default.createElement("button", {
        className: this.state.linkClasses,
        onClick: this.props.rowMover.bind(null, this.state.currentPage - 1)
      }, "Previous")), _react.default.createElement("li", {
        className: this.state.pos1Classes
      }, _react.default.createElement("button", {
        className: this.state.linkClasses,
        onClick: this.props.rowMover.bind(null, this.state.pos1Value)
      }, this.state.pos1Value)), _react.default.createElement("li", {
        className: this.state.pos2Classes
      }, _react.default.createElement("button", {
        className: this.state.linkClasses,
        onClick: this.props.rowMover.bind(null, this.state.pos2Value)
      }, this.state.pos2Value)), _react.default.createElement("li", {
        className: this.state.pos3Classes
      }, _react.default.createElement("button", {
        className: this.state.linkClasses,
        onClick: this.props.rowMover.bind(null, this.state.pos3Value)
      }, this.state.pos3Value)), _react.default.createElement("li", {
        className: this.state.pos4Classes
      }, _react.default.createElement("button", {
        className: this.state.linkClasses,
        onClick: this.props.rowMover.bind(null, this.state.pos4Value)
      }, this.state.pos4Value)), _react.default.createElement("li", {
        className: this.state.pos5Classes
      }, _react.default.createElement("button", {
        className: this.state.linkClasses,
        onClick: this.props.rowMover.bind(null, this.state.pos5Value)
      }, this.state.pos5Value)), _react.default.createElement("li", {
        className: this.state.listItemClasses
      }, _react.default.createElement("button", {
        className: this.state.linkClasses,
        onClick: this.props.rowMover.bind(null, this.state.currentPage + 1)
      }, "Next")), _react.default.createElement("li", {
        className: this.state.listItemClasses
      }, _react.default.createElement("button", {
        className: this.state.linkClasses,
        onClick: this.props.rowMover.bind(null, this.state.totalNumberOfPages)
      }, "Last"))));
    }
  }]);

  return Paginator;
}(_react.default.Component);

Paginator.propTypes = {
  currentPage: _propTypes.default.number,
  tableLength: _propTypes.default.number,
  rowsPerPage: _propTypes.default.number,
  rowMover: _propTypes.default.func,
  paginationClasses: _propTypes.default.shape({
    listClasses: _propTypes.default.string,
    listItemClasses: _propTypes.default.string,
    linkClasses: _propTypes.default.string,
    activePageClasses: _propTypes.default.string
  })
};
var _default = Paginator;
exports.default = _default;