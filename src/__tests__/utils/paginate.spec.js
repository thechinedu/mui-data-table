import chai from 'chai';
import Paginate from '../../utils/paginate';

import { lastElem } from './utilities';

const expect = chai.expect;
const data = [
  {name: 'ade', location: 'Lagos', age: 21, mood: 'happy'},
  {name: 'tunde', location: 'Edo', age: 25, mood: 'angry'},
  {name: 'bayo', location: 'Ibadan', age: 28, mood: 'scared'},
  {name: 'ade', location: 'Lagos', age: 21, mood: 'happy'},
  {name: 'tunde', location: 'Edo', age: 25, mood: 'angry'},
  {name: 'bayo', location: 'Ibadan', age: 28, mood: 'curious'}
];
const paginateObj = new Paginate(data);

describe('The Paginate class', function () {
  it('should raise an error if called without the new keyword', function () {
    expect(Paginate).to.throw(TypeError);
  });


  describe('#showingCalc', function () {
    it('should return a string after execution', function () {
      expect(typeof paginateObj.showingCalc([1,2,3,4,5])).to.eql('string');
    });

    it('should return 1 up to first argument of array if the length of the array isn\'t greater than 1', function () {
      expect(paginateObj.showingCalc([1])).to.eql('1 - 1');
    });

    it('should add one to the result of adding all items, with the exception of the\
 last item in the array to get the start value', function () {
      expect(paginateObj.showingCalc([1,2,3]).split('-')[0].trim()).to.eql('4');
    });

    it('should add all items in the array to get the end value', function () {
      expect(paginateObj.showingCalc([1,2,3]).split('-')[1].trim()).to.eql('6');
    });

    it('should return the correct page range based on array argument', function () {
      expect(paginateObj.showingCalc([1,2,3])).to.eql('4 - 6');
      expect(paginateObj.showingCalc([5,5,4])).to.eql('11 - 14');
      expect(paginateObj.showingCalc([3,2,2])).to.eql('6 - 7');
    });
  });

  describe('#perPage', function () {
    it('should return a new instance of Paginate', function () {
      expect(paginateObj.perPage(2) instanceof Paginate).to.be.true;
    });

    it('should append a pagination info object to every item in the paginated array', function () {
      const val = paginateObj.perPage(3).arr;

      expect(val[0]).to.have.lengthOf(4);
      expect(val[1]).to.have.lengthOf(4);
      expect(lastElem(val[0])).have.ownProperty('paginationInfo');
    });

    it('should paginate with a default of 5 if no argument is passed in', function () {
      const val = paginateObj.perPage().arr[0];

      expect(val.slice(0, val.length - 1)).to.have.lengthOf(5);
    });

  });

  describe('#page', function () {
    it('should return the item if it finds the item at a given index', function () {
      const val = paginateObj.perPage(3).page(1);

      expect(val.slice(0, val.length - 1)).to.eql([ data[0], data[1], data[2] ]);
    });

    it('should return the last item if a number higher than the total amount of pages is passed in', function () {
      const val = paginateObj.perPage(3).page(5);

      expect(val.slice(0, val.length - 1)).to.eql([ data[3], data[4], data[5] ]);
    });

    it('should return an empty array if the original array is empty', function () {
      const temp = [];
      const val = new Paginate(temp).perPage(5).page(1);

      expect(val).to.eql([]);
    });
  });

});
