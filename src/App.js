import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MuiDataTable } from 'mui-data-table';

const config = {
  paginated: true,
  search: 'name',
  data,
  columns: [
    {property: 'id', title: 'S/N'},
    {property: 'name', title: 'Name'},
    {property: 'age', title: 'Age'},
    {property: 'location', title: 'Location'},
    {property: 'level', title: 'Level'},
    {property: 'mood', title: 'Mood'}
  ]
};

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Mui Data Table</h2>
          </div>

          <MuiDataTable config={config} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
