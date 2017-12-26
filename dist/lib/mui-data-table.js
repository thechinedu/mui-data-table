'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _Table = require('material-ui/Table');

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _filterList = require('material-ui/svg-icons/content/filter-list');

var _filterList2 = _interopRequireDefault(_filterList);

var _search = require('material-ui/svg-icons/action/search');

var _search2 = _interopRequireDefault(_search);

var _navigateNext = require('material-ui/svg-icons/image/navigate-next');

var _navigateNext2 = _interopRequireDefault(_navigateNext);

var _navigateBefore = require('material-ui/svg-icons/image/navigate-before');

var _navigateBefore2 = _interopRequireDefault(_navigateBefore);

var _injectProp = require('../utils/injectProp');

var _injectProp2 = _interopRequireDefault(_injectProp);

var _handleHtmlProp = require('../utils/handleHtmlProp');

var _handleCustomRender = require('../utils/handleCustomRender');

var _search3 = require('../utils/search.js');

var _search4 = _interopRequireDefault(_search3);

var _paginate = require('../utils/paginate');

var _paginate2 = _interopRequireDefault(_paginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iconStyleFilter = {
  color: '#757575',
  cursor: 'pointer',
  transform: 'translateY(5px) translateX(-20px)'
};

var searchHeaderColumnStyle = {
  position: 'relative',
  textAlign: 'right'
};

var searchStyle = {
  color: '#777777',
  opacity: 0,
  transitionDuration: '0.6s',
  transitionProperty: 'opacity',
  border: 0,
  outline: 0,
  fontSize: 16,
  width: '100%',
  marginLeft: -22,
  padding: '7px 12px',
  textIndent: 3,
  cursor: 'text'
};

var iconStyleSearch = {
  color: '#757575',
  position: 'absolute',
  top: '30%',
  opacity: 0,
  marginLeft: -76
};

var navigationStyle = {
  cursor: 'pointer'
};

var MuiDataTable = function (_React$Component) {
  _inherits(MuiDataTable, _React$Component);

  function MuiDataTable(props) {
    _classCallCheck(this, MuiDataTable);

    var _this = _possibleConstructorReturn(this, (MuiDataTable.__proto__ || Object.getPrototypeOf(MuiDataTable)).call(this));

    var tableData = props.config.data || [];
    var rowsPerPage = props.config.paginated.constructor === Object ? props.config.paginated.rowsPerPage : 5;

    tableData = props.config.paginated ? new _paginate2.default(tableData).perPage(rowsPerPage) : tableData;

    if (tableData instanceof _paginate2.default) {
      tableData = tableData.page(1);
    }

    _this.state = {
      disabled: true,
      style: searchStyle,
      idempotentData: props.config.data,
      paginatedIdempotentData: new _paginate2.default(props.config.data),
      perPageSelection: props.config.paginated.rowsPerPage || 5,
      tableData: tableData,
      searchData: [],
      isSearching: false,
      navigationStyle: navigationStyle,
      iconStyleSearch: iconStyleSearch
    };

    _this.columns = (0, _injectProp2.default)(props.config.columns);
    _this.toggleSearch = _this.toggleSearch.bind(_this);
    _this.searchData = _this.searchData.bind(_this);
    _this.handlePerPageChange = _this.handlePerPageChange.bind(_this);
    _this.navigateRight = _this.navigateRight.bind(_this);
    _this.navigateLeft = _this.navigateLeft.bind(_this);
    return _this;
  }

  _createClass(MuiDataTable, [{
    key: 'handlePerPageChange',
    value: function handlePerPageChange(evt, index, val) {
      var paginationInfo = this.paginationObject();
      var data = this.state.paginatedIdempotentData;

      if (this.state.isSearching) {
        var tableData = this.state.searchData;
        data = new _paginate2.default(tableData);
      }

      this.setState({
        tableData: data.perPage(val).page(paginationInfo.currentPage),
        perPageSelection: val
      });
    }
  }, {
    key: 'paginationObject',
    value: function paginationObject() {
      var res = this.state.tableData[this.state.tableData.length - 1];

      if (!res || !res.paginationInfo) {
        return {
          perPage: 5,
          currentPage: 1,
          previousPage: null,
          nextPage: null,
          currentlyShowing: '0 - 0 of 0',
          isLastPage: true,
          totalNumOfPages: 0,
          total: 0
        };
      }

      res.paginationInfo.perPage = this.state.perPageSelection;

      return res.paginationInfo;
    }
  }, {
    key: 'showPaginationInfo',
    value: function showPaginationInfo() {
      return this.paginationObject().currentlyShowing;
    }
  }, {
    key: 'navigateRight',
    value: function navigateRight() {
      var paginationInfo = this.paginationObject();
      var data = this.state.paginatedIdempotentData;

      if (this.state.isSearching) {
        var tableData = this.state.searchData;
        data = new _paginate2.default(tableData);
      }

      this.setState({
        tableData: data.perPage(paginationInfo.perPage).page(paginationInfo.nextPage)
      });
    }
  }, {
    key: 'navigateLeft',
    value: function navigateLeft() {
      var paginationInfo = this.paginationObject();
      var data = this.state.paginatedIdempotentData;

      if (!paginationInfo.previousPage) return;

      if (this.state.isSearching) {
        var tableData = this.state.searchData;
        data = new _paginate2.default(tableData);
      }

      this.setState({
        tableData: data.perPage(paginationInfo.perPage).page(paginationInfo.previousPage)
      });
    }
  }, {
    key: 'mapColumnsToElems',
    value: function mapColumnsToElems(cols) {
      return cols.map(function (item, index) {
        return _react2.default.createElement(
          _Table.TableHeaderColumn,
          { key: index },
          item.title
        );
      });
    }
  }, {
    key: 'mapDataToProperties',
    value: function mapDataToProperties(properties, obj) {
      var _this2 = this;

      return properties.map(function (prop, index) {
        return _react2.default.createElement(
          _Table.TableRowColumn,
          { key: index },
          _this2.renderTableData(obj, prop)
        );
      });
    }
  }, {
    key: 'populateTableWithdata',
    value: function populateTableWithdata(data, cols) {
      var _this3 = this;

      var properties = cols.map(function (item) {
        return item.property;
      });

      return data.map(function (item, index) {
        if (item.paginationInfo) return undefined;
        return _react2.default.createElement(
          _Table.TableRow,
          { key: index },
          _this3.mapDataToProperties(properties, item)
        );
      });
    }
  }, {
    key: 'calcColSpan',
    value: function calcColSpan(cols) {
      return cols.length;
    }
  }, {
    key: 'shouldShowItem',
    value: function shouldShowItem(item) {
      var styleObj = {
        display: item ? '' : 'none'
      };

      return styleObj;
    }
  }, {
    key: 'shouldShowMenu',
    value: function shouldShowMenu(defaultStyle) {
      if (this.props.config.paginated && this.props.config.paginated.constructor === Boolean) return defaultStyle;

      var menuOptions = this.props.config.paginated.menuOptions;

      return menuOptions ? defaultStyle : { display: 'none' };
    }
  }, {
    key: 'toggleOpacity',
    value: function toggleOpacity(val) {
      return val === 0 ? 1 : 0;
    }
  }, {
    key: 'toggleSearch',
    value: function toggleSearch() {
      var style = Object.assign({}, this.state.style, {});
      var searchIconStyle = Object.assign({}, this.state.iconStyleSearch, {});
      var disabledState = this.state.disabled;

      style.opacity = this.toggleOpacity(style.opacity);
      searchIconStyle.opacity = this.toggleOpacity(searchIconStyle.opacity);

      disabledState = !disabledState;

      this.setState({
        style: style,
        iconStyleSearch: searchIconStyle,
        disabled: disabledState
      });
    }
  }, {
    key: 'searchData',
    value: function searchData(e) {
      var key = this.props.config.search;
      var word = e.target.value;
      var data = this.state.idempotentData;
      var paginationInfo = void 0;

      var res = (0, _search4.default)(key, word, data);

      this.setState({ searchData: res });

      if (word.length > 0) {
        this.setState({ isSearching: true });
      } else {
        this.setState({ isSearching: false });
      }

      if (this.props.config.paginated) {
        paginationInfo = this.paginationObject();
        res = new _paginate2.default(res).perPage(paginationInfo.perPage).page(1);
      }

      this.setState({
        tableData: res
      });
    }
  }, {
    key: 'renderTableData',
    value: function renderTableData(obj, prop) {
      var columns = this.columns;

      if ((0, _handleCustomRender.hasCustomRender)(prop, columns)) {
        return (0, _handleCustomRender.callCustomRender)(prop, columns, obj);
      } else if (obj[prop] && (0, _handleHtmlProp.hasHtml)(prop, columns)) {
        return _react2.default.createElement(
          'div',
          null,
          obj[prop],
          (0, _handleHtmlProp.extractHtml)(prop, columns)
        );
      } else if (!obj[prop] && (0, _handleHtmlProp.hasHtml)(prop, columns)) {
        return (0, _handleHtmlProp.extractHtml)(prop, columns);
      } else if (obj[prop] && !(0, _handleHtmlProp.hasHtml)(prop, columns)) {
        return obj[prop];
      }

      return undefined;
    }
  }, {
    key: 'setRowSelection',
    value: function setRowSelection(type, obj) {
      var menuOptions = type === 'object' ? obj.menuOptions : [5, 10, 15];

      return menuOptions.map(function (num, index) {
        return _react2.default.createElement(_MenuItem2.default, { value: num, primaryText: num, key: index });
      });
    }
  }, {
    key: 'handleRowSelection',
    value: function handleRowSelection(obj) {
      if (obj && obj.constructor === Boolean) {
        return this.setRowSelection('', obj);
      } else if (obj && obj.constructor === Object) {
        return this.setRowSelection('object', obj);
      } else {
        return;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Paper2.default,
        { zDepth: 1 },
        _react2.default.createElement(
          _Table.Table,
          null,
          _react2.default.createElement(
            _Table.TableHeader,
            null,
            _react2.default.createElement(
              _Table.TableRow,
              { style: this.shouldShowItem(this.props.config.search) },
              _react2.default.createElement(
                _Table.TableHeaderColumn,
                {
                  colSpan: this.calcColSpan(this.columns),
                  style: searchHeaderColumnStyle
                },
                _react2.default.createElement(_search2.default, { style: this.state.iconStyleSearch }),
                _react2.default.createElement('input', {
                  type: 'search',
                  placeholder: 'Search',
                  style: this.state.style,
                  disabled: this.state.disabled,
                  onKeyUp: this.searchData
                }),
                _react2.default.createElement(_filterList2.default, { style: iconStyleFilter, onClick: this.toggleSearch })
              )
            ),
            _react2.default.createElement(
              _Table.TableRow,
              null,
              this.mapColumnsToElems(this.columns)
            )
          ),
          _react2.default.createElement(
            _Table.TableBody,
            { showRowHover: true },
            this.populateTableWithdata(this.state.tableData, this.columns)
          ),
          _react2.default.createElement(
            _Table.TableFooter,
            { style: this.shouldShowItem(this.props.config.paginated) },
            _react2.default.createElement(
              _Table.TableRow,
              null,
              _react2.default.createElement(
                _Table.TableRowColumn,
                {
                  style: { textAlign: 'right', verticalAlign: 'middle', width: '70%' }
                },
                _react2.default.createElement(
                  'span',
                  { style: this.shouldShowMenu({ paddingRight: 15 }) },
                  'Rows per page:'
                ),
                _react2.default.createElement(
                  _SelectField2.default,
                  {
                    value: this.state.perPageSelection,
                    style: this.shouldShowMenu({ width: 35, fontSize: 13, top: 0 }),
                    onChange: this.handlePerPageChange
                  },
                  this.handleRowSelection(this.props.config.paginated)
                )
              ),
              _react2.default.createElement(
                _Table.TableRowColumn,
                { style: { textAlign: 'right', verticalAlign: 'middle' } },
                _react2.default.createElement(
                  'span',
                  null,
                  ' ',
                  this.showPaginationInfo(),
                  ' '
                )
              ),
              _react2.default.createElement(
                _Table.TableRowColumn,
                { style: { textAlign: 'right', verticalAlign: 'middle' } },
                _react2.default.createElement(_navigateBefore2.default, { onClick: this.navigateLeft, style: this.state.navigationStyle }),
                _react2.default.createElement(_navigateNext2.default, { onClick: this.navigateRight, style: this.state.navigationStyle })
              )
            )
          )
        )
      );
    }
  }]);

  return MuiDataTable;
}(_react2.default.Component);

exports.default = MuiDataTable;


MuiDataTable.propTypes = {
  config: _propTypes.object.isRequired
};