import chai from 'chai';
import { hasCustomRender, callCustomRender } from '../../utils/handleCustomRender';
import { objCopy } from './utilities';

const expect = chai.expect;

const data = [{ property: 'client_name', title: 'Client', renderAs: function (data) {
  return data.message;
} }];

describe('The render utility functions', function () {
  describe('#hasCustomRender', function () {
    it('should return true if the property in the object array contains a renderAs property', function () {
      expect(hasCustomRender('client_name', data)).to.be.true;
    });

    it('should return false if the property does not contain  an html property', function () {
      const clone = objCopy(data);
      delete clone[0].renderAs;

      expect(hasCustomRender('client_name', clone)).to.be.false;
    });
  });

  describe('#callCustomRender', function () {
    it('should call the callback function and return it\'s result', function () {

      expect(callCustomRender('client_name', data, {message: 'hello world'})).to.equal('hello world');
    });
  });
});
