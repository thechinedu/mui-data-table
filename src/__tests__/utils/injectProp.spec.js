import chai from 'chai';
import injectProp from '../../utils/injectProp';

const expect = chai.expect;
const data = [
  {name: 'ade', location: 'Lagos', age: 21, mood: 'happy', property: 'id'},
  {name: 'tunde', location: 'Edo', age: 25, mood: 'angry'},
  {name: 'bayo', location: 'Ibadan', age: 28, mood: 'scared'}
];

describe('The injectProp function', function () {
  it('should return a new array containing custom property attribute if it is not set in the config', function () {
    expect(injectProp(data)).to.eql([
      {name: 'ade', location: 'Lagos', age: 21, mood: 'happy', property: 'id'},
      {name: 'tunde', location: 'Edo', age: 25, mood: 'angry', property: 'MuiDataTableProp-1'},
      {name: 'bayo', location: 'Ibadan', age: 28, mood: 'scared', property: 'MuiDataTableProp-2'}
    ]);
  });
});
