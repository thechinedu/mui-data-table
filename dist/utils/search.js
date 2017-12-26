'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var search = function search(key, word, data) {
  if (word.length < 1) return data;

  var res = [];
  var regex = new RegExp(word, 'i');
  var keys = key.split('|');

  data.forEach(function (item) {
    for (var i = 0; i < keys.length; i += 1) {
      if (String(item[keys[i]]).match(regex)) {
        res.push(item);
        break;
      }
    }
  });

  return res;
};

exports.default = search;