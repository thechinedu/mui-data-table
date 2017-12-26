'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var injectProp = function injectProp(arr) {
  var count = 0,
      res = arr.slice(0);

  res.forEach(function (obj) {
    if (!obj.property) {
      count += 1;
      obj.property = 'MuiDataTableProp-' + count;
    }
  });

  return res;
};

exports.default = injectProp;