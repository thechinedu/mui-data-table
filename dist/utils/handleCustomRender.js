'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasCustomRender = function hasCustomRender(prop, columns) {
  return !!columns.filter(function (item) {
    return item.property === prop && item.hasOwnProperty('renderAs');
  })[0];
};

var callCustomRender = function callCustomRender(prop, columns, obj) {
  var property = columns.filter(function (item) {
    return item.property === prop && item.hasOwnProperty('renderAs');
  })[0];

  return property.renderAs(obj);
};

exports.hasCustomRender = hasCustomRender;
exports.callCustomRender = callCustomRender;