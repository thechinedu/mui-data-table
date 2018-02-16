import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Paper from 'material-ui/Paper';

import FilterList from 'material-ui/svg-icons/content/filter-list';
import SearchIcon from 'material-ui/svg-icons/action/search';
import NavigateRight from 'material-ui/svg-icons/image/navigate-next';
import NavigateLeft from 'material-ui/svg-icons/image/navigate-before';

import injectProp from '../utils/injectProp';
import { hasHtml, extractHtml } from '../utils/handleHtmlProp';
import { hasCustomRender, callCustomRender } from '../utils/handleCustomRender';
import arraySearch from '../utils/search.js';
import Paginate from '../utils/paginate';

const iconStyleFilter = {
  color: '#757575',
  cursor: 'pointer',
  transform: 'translateY(5px) translateX(-20px)'
};

const searchHeaderColumnStyle = {
  position: 'relative',
  textAlign: 'right'
};

const searchStyle = {
  color: '#777777',
  opacity: 1,
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

const iconStyleSearch = {
  color: '#757575',
  position: 'absolute',
  top: '30%',
  opacity: 0,
  marginLeft: -76
};

const navigationStyle = {
  cursor: 'pointer'
};

export default class MuiDataTable extends React.Component {
  constructor(props) {
    super();
    let tableData = props.config.data || [];
    let rowsPerPage = props.config.paginated.constructor === Object ? props.config.paginated.rowsPerPage : 5;
    let viewSearchBarOnload  =  props.config.viewSearchBarOnload === undefined ? true : props.config.viewSearchBarOnload;

    tableData = props.config.paginated ? new Paginate(tableData).perPage(rowsPerPage) : tableData;

    if (tableData instanceof Paginate) {
      tableData = tableData.page(1);
    }

    this.state = {
      disabled: !viewSearchBarOnload,
      style: !viewSearchBarOnload ? {...searchStyle, opacity: 0} : searchStyle,
      idempotentData: props.config.data,
      paginatedIdempotentData: new Paginate(props.config.data),
      perPageSelection: props.config.paginated.rowsPerPage || 5,
      tableData: tableData,
      searchData: [],
      isSearching: false,
      navigationStyle,
      iconStyleSearch: iconStyleSearch,
      viewSearchBarOnload: viewSearchBarOnload
    };

    this.columns = injectProp(props.config.columns);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.searchData = this.searchData.bind(this);
    this.handlePerPageChange = this.handlePerPageChange.bind(this);
    this.navigateRight = this.navigateRight.bind(this);
    this.navigateLeft = this.navigateLeft.bind(this);
  }

  handlePerPageChange(evt, index, val) {
    const paginationInfo = this.paginationObject();
    let data = this.state.paginatedIdempotentData;

    if (this.state.isSearching) {
      const tableData = this.state.searchData;
      data = new Paginate(tableData);
    }

    this.setState({
      tableData: data.perPage(val).page(paginationInfo.currentPage),
      perPageSelection: val
    });
  }

  paginationObject() {
    const res = this.state.tableData[this.state.tableData.length - 1];

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

  showPaginationInfo() {
    return this.paginationObject().currentlyShowing;
  }

  navigateRight() {
    const paginationInfo = this.paginationObject();
    let data = this.state.paginatedIdempotentData;

    if (this.state.isSearching) {
      const tableData = this.state.searchData;
      data = new Paginate(tableData);
    }

    this.setState({
      tableData: data.perPage(paginationInfo.perPage).page(paginationInfo.nextPage)
    });
  }

  navigateLeft() {
    const paginationInfo = this.paginationObject();
    let data = this.state.paginatedIdempotentData;

    if (!paginationInfo.previousPage) return;

    if (this.state.isSearching) {
      const tableData = this.state.searchData;
      data = new Paginate(tableData);
    }

    this.setState({
      tableData: data.perPage(paginationInfo.perPage).page(paginationInfo.previousPage)
    });
  }

  mapColumnsToElems(cols) {
    return cols.map((item, index) => (
      <TableHeaderColumn key={index}>{item.title}</TableHeaderColumn>
    ));
  }


  mapDataToProperties(properties, obj) {
    return properties.map((prop, index) => (
      <TableRowColumn key={index}>
        {this.renderTableData(obj, prop)}
      </TableRowColumn>
    ));
  }

  populateTableWithdata(data, cols) {
    const properties = cols.map(item => item.property);

    return data.map((item, index) => {
      if (item.paginationInfo) return undefined;
      return (
        <TableRow key={index}>
          {this.mapDataToProperties(properties, item)}
        </TableRow>
      );
    });
  }

  calcColSpan(cols) {
    return cols.length;
  }

  shouldShowItem(item) {
    const styleObj = {
      display: (item ? '' : 'none')
    };

    return styleObj;
  }

  shouldShowMenu(defaultStyle) {
    if (this.props.config.paginated && this.props.config.paginated.constructor === Boolean) return defaultStyle;

    const menuOptions = this.props.config.paginated.menuOptions;

    return menuOptions ? defaultStyle : { display: 'none' };
  }

  toggleOpacity(val) {
    return val === 0 ? 1 : 0;
  }

  toggleSearch() {
    const style = Object.assign({}, this.state.style, {});
    const searchIconStyle = Object.assign({}, this.state.iconStyleSearch, {});
    let disabledState = this.state.disabled;

    style.opacity = this.toggleOpacity(style.opacity);
    searchIconStyle.opacity = this.toggleOpacity(searchIconStyle.opacity);

    disabledState = !disabledState;

    this.setState({
      style,
      iconStyleSearch: searchIconStyle,
      disabled: disabledState
    });
  }

  searchData(e) {
    const key = this.props.config.search;
    const word = e.target.value;
    const data = this.state.idempotentData;
    let paginationInfo;

    let res = arraySearch(key, word, data);

    this.setState({ searchData: res });

    if (word.length > 0) {
      this.setState({ isSearching: true });
    } else {
      this.setState({ isSearching: false });
    }

    if (this.props.config.paginated) {
      paginationInfo = this.paginationObject();
      res = new Paginate(res).perPage(paginationInfo.perPage).page(1);
    }

    this.setState({
      tableData: res
    });
  }

  renderTableData(obj, prop) {
    const columns = this.columns;

    if (hasCustomRender(prop, columns)) {
      return callCustomRender(prop, columns, obj);
    } else if (obj[prop] && hasHtml(prop, columns)) {
      return (
        <div>
          {obj[prop]}
          {extractHtml(prop, columns)}
        </div>
      );
    } else if (!obj[prop] && hasHtml(prop, columns)) {
      return extractHtml(prop, columns);
    } else if (obj[prop] && !hasHtml(prop, columns)) {
      return obj[prop];
    }

    return undefined;
  }

  setRowSelection(type, obj) {
    const menuOptions = type === 'object' ? obj.menuOptions : [5, 10, 15];

    return menuOptions.map((num, index) => (
      <MenuItem value={num} primaryText={num} key={index} />
    ));
  }

  handleRowSelection(obj) {
    if ( obj && obj.constructor === Boolean ) {
      return this.setRowSelection('', obj);
    } else if ( obj && obj.constructor === Object ) {
      return this.setRowSelection('object', obj);
    } else {
      return;
    }
  }

  render() {
    return (
      <Paper zDepth={1}>
        <Table>
          <TableHeader>
            <TableRow style={this.shouldShowItem(this.props.config.search)}>
              <TableHeaderColumn
                colSpan={this.calcColSpan(this.columns)}
                style={searchHeaderColumnStyle}
              >
                <SearchIcon style={this.state.iconStyleSearch} />
                <input
                  type="search"
                  placeholder="Search"
                  style={this.state.style}
                  disabled={this.state.disabled}
                  onKeyUp={this.searchData}
                />
                <FilterList style={iconStyleFilter} onClick={this.toggleSearch} />
              </TableHeaderColumn>
            </TableRow>

            <TableRow>
              {this.mapColumnsToElems(this.columns)}
            </TableRow>
          </TableHeader>

          <TableBody showRowHover>
            {this.populateTableWithdata(this.state.tableData, this.columns)}
          </TableBody>

          <TableFooter style={this.shouldShowItem(this.props.config.paginated)}>
            <TableRow>
              <TableRowColumn
                style={{ textAlign: 'right', verticalAlign: 'middle', width: '70%' }}
              >
                <span style={this.shouldShowMenu({ paddingRight: 15 })}>Rows per page:</span>
                <SelectField
                  value={this.state.perPageSelection}
                  style={this.shouldShowMenu({ width: 35, fontSize: 13, top: 0 })}
                  onChange={this.handlePerPageChange}
                >
                  { this.handleRowSelection(this.props.config.paginated) }
                </SelectField>
              </TableRowColumn>

              <TableRowColumn style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                <span> {this.showPaginationInfo()} </span>
              </TableRowColumn>

              <TableRowColumn style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                <NavigateLeft onClick={this.navigateLeft} style={this.state.navigationStyle} />
                <NavigateRight onClick={this.navigateRight} style={this.state.navigationStyle} />
              </TableRowColumn>
            </TableRow>
          </TableFooter>

        </Table>
      </Paper>
    );
  }
}

MuiDataTable.propTypes = {
  config: React.PropTypes.object.isRequired
};
