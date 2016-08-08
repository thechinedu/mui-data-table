import chai from 'chai';
import search from '../../utils/search';

const expect = chai.expect;
const data = [
  {name: 'ade', location: 'Lagos', age: 21, mood: 'happy'},
  {name: 'tunde', location: 'Edo', age: 25, mood: 'angry'},
  {name: 'bayo', location: 'Ibadan', age: 28, mood: 'scared'}
];

describe('The search function', function () {
  it('should return the original array if the word being searched for is empty', function () {
    expect(search('name', '', data)).to.eql(data);
  });

  it('should return an empty array if the word isn\'t found in the list', function () {
    expect(search('name', 'damilare', data)).to.eql([]);
  });

  it('should return the approriate result that match the word if found in the array', function () {
    expect(search('name', 'ade', data)).to.eql([data[0]]);
  });

  it('should return results when there is a partial match', function () {
    expect(search('name', 'a', data)).to.eql([data[0], data[2]]);
  });

  it('should be able to search using multiple keys', function () {
    expect(search('location|name|mood', 'angry', data)).to.eql([data[1]]);
    expect(search('location|name|mood', 'Lagos', data)).to.eql([data[0]]);
    expect(search('location|name|mood|age', '28', data)).to.eql([data[2]]);
  });

  it('should perform case insensitive search(es)', function () {
    expect(search('name', 'TUNDE', data)).to.eql([data[1]]);
  });
});
