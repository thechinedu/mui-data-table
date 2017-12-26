"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasHtml = function hasHtml(prop, arr) {
  return !!arr.filter(function (item) {
    return item.property === prop;
  })[0].html;
};

var extractHtml = function extractHtml(prop, arr) {
  return arr.filter(function (item) {
    return item.property === prop;
  })[0].html;
};

exports.extractHtml = extractHtml;
exports.hasHtml = hasHtml;