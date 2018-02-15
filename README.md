# Mui Data Table

Data table implementation for [react material-ui](http://www.material-ui.com/#/)

[![CircleCI](https://circleci.com/gh/andela-cdaniel/mui-data-table/tree/master.svg?style=shield)](https://circleci.com/gh/andela-cdaniel/mui-data-table/tree/master) [![Coverage Status](https://coveralls.io/repos/github/andela-cdaniel/mui-data-table/badge.svg?branch=ch-add-coverage-info)](https://coveralls.io/github/andela-cdaniel/mui-data-table?branch=ch-add-coverage-info)
[![npm version](https://badge.fury.io/js/mui-data-table.svg)](https://badge.fury.io/js/mui-data-table)

Mui data table was borne out of a need to integrate
[Material design data tables](https://material.google.com/components/data-tables.html) with
[react material ui](http://www.material-ui.com/#/). It achieves this by extending the table component already provided
by material ui with new behaviour.

Mui data table is still in active development and there is still a plan to add even more features to make it more robust
and flexible.

## Demo

[demo](https://blueyedgeek.github.io/mui-data-table/build/)

## Features

* Pagination
* Search / Filter
* Custom renderer / formatter

## Dependencies

* React
* Material-ui

Mui data table is a React component and as such, you'd need to have react installed before installing this package.
You'll also need to ensure that you are using the material-ui component library in your application.

## Installation

Mui data table is available as an npm package, you can install from the command line using this command:

```bash
npm install mui-data-table --save
```

## Usage

Mui data table is designed to be easy to use. It has a ridiculously simple api and all you have to do is to pass a
configuration object as a property and that is all the setup you need to get started.

### Example Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MuiDataTable } from 'mui-data-table';

const data = [
  { id: 1, name: 'Chikwa Eligson', age: 24, location: 'Lagos', level: 'stage-1', mood: 'happy' },
  { id: 2, name: 'Bamidele Johnson', age: 18, location: 'Anambra', level: 'stage-4', mood: 'anxious' },
  { id: 3, name: 'John Lee', age: 20, location: 'Abuja', level: 'stage-2', mood: 'indifferent' },
  { id: 4, name: 'Binta Pelumi', age: 22, location: 'Jos', level: 'stage-3', mood: 'sad' },
  { id: 5, name: 'Cassidy Ferangamo', age: 30, location: 'Lagos', level: 'stage-4', mood: 'angry' },
  { id: 6, name: 'Damian Swaggbag', age: 35, location: 'PortHarcourt', level: 'stage-1', mood: 'bitter' },
  { id: 7, name: 'Loveth Sweetstick', age: 20, location: 'Imo', level: 'stage-3', mood: 'happy' },
  { id: 8, name: 'Zzaz Zuzzi', age: 19, location: 'Bayelsa', level: 'stage-2', mood: 'party-mood' },
  { id: 9, name: 'Ian Sweetmouth', age: 18, location: 'Enugu', level: 'stage-4', mood: 'happy' },
  { id: 10, name: 'Elekun Bayo', age: 21, location: 'Zamfara', level: 'stage-4', mood: 'anxious' },
];

const config = {
  paginated: true,
  search: 'name',   
  data: data,
  columns: [
    { property: 'id', title: 'S/N'},
    { property: 'name', title: 'Name' },
    { property: 'age', title: 'Age' },
    { property: 'location', title: 'Location' },
    { property: 'level', title: 'level' },
    { title: 'Mood', renderAs: function (data) {
      return `${data.name} is in a ${data.mood} mood.`;
    }},
  ]
  viewSearchBarOnload: true // set to true or false. Default it is set to false. Shows the search bar or not depending on the value set
};

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <MuiDataTable config={config} />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
```

This will populate the table with the data specified in the `data` array with pagination and filtering turned on.

### Configuration options

| Attribute  | Type | Default  | Description  |
|------------|------| ---------| -------------|
| paginated | boolean or object | false | Determines if the generated table should be paginated. When it is passed the boolean value `true`, it paginates the table using the defaults: 5 rows per page and the table contains options to switch to 10 or 15 per page. You can also pass it an object with two available properties: `rowsPerPage` and `menuOptions`. `rowsPerPage` takes a number and will be used to determine how many values in the data object should be displayed per page while `menuOptions` which takes an array of numbers is used to populate the select field component with menu items, if this property is not declared or is set to false, the select field component will not show up on the table. You can check the demo to see how it is used.|
|search | string | empty string ('') | Determines which property from the data object should be used to filter the values in the table when search is made. You can filter using multiple columns by seperating each value in the string with a pipe(\|) e.g: `'name\|mood\|location'`.|
|data | array (containing only objects)| empty array ([]) | Determines the data that is used to populate the table with values.
|column | array (containing only objects)| | Determines the mapping between the data object, table headers, table columns and table rows. |

### Column configuration

The column attribute is used to determine how data in the `data` object should be displayed within the table.

| Attribute | Type | Default | Description|
|-----------|------|--------|-------------|
|property| string | | Determines the attribute in the `data` object to be used to populate a column. It is ignored if a `renderAs` attribute is present as well.|
|title| string | | Determines the header name for a particular column. It can be set to an empty string or totally removed if the header doesn't need to have a name.|
|renderAs| function | | Overwrites the `property` attribute and is used instead to display data for a particular column. It takes one argument which is passed down from the data object. The argument will contain one individual object from the `data` object at a time and the `renderAs` method will be used to format the data before displaying it on the table |

## Contributing

Feature requests can be made using [Github issues](https://github.com/andela-cdaniel/mui-data-table/issues)

Pull requests are totally encouraged and you are welcome to contribute to the development of `mui-data-table`. Please do raise an issue before making a pull request so as to determine if a particular feature is already being worked on or is currently out of the scope of this project.

1. [Fork mui-data-table](https://github.com/andela-cdaniel/mui-data-table/fork)
2. Create a feature branch (git checkout -b my-new-fature)
3. Write tests if the feature needs to be tested
4. Ensure the code lints successfully
5. Commit your changes
6. Push to your branch
7. Make a pull request

## License

`mui-data-table` is released under the [MIT License](https://github.com/andela-cdaniel/mui-data-table/blob/master/LICENSE.md) and by contributing, you agree that your contributions will be licensed under it.
