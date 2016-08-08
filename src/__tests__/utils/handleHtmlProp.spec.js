import chai from 'chai';
import { extractHtml, hasHtml } from '../../utils/handleHtmlProp';
import { objCopy } from './utilities';

const expect = chai.expect;

const data = [{ property: 'client_name', title: 'Client', html: '<span></span>' }];

describe('The html utility functions', function () {
  describe('#hasHtml', function () {
    it('should return true if the property in the object array contains an html property', function () {
      expect(hasHtml('client_name', data)).to.be.true;
    });

    it('should return false if the property does not contain  an html property', function () {
      const clone = objCopy(data);
      delete clone[0].html;

      expect(hasHtml('client_name', clone)).to.be.false;
    });
  });

  describe('#extractHtml', function () {
    it('should extract and return the value of the html property', function () {

      expect(extractHtml('client_name', data)).to.equal('<span></span>');
    });
  });
});
