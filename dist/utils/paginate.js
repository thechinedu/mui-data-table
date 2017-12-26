"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paginate = function () {
  function Paginate(arr) {
    _classCallCheck(this, Paginate);

    this.arr = arr;
  }

  _createClass(Paginate, [{
    key: "showingCalc",
    value: function showingCalc(arr) {
      if (arr.length <= 1) return "1 - " + arr[0];

      var start = arr.slice(0, arr.length - 1).reduce(function (curr, next) {
        return curr + next;
      }) + 1;
      var stop = arr.reduce(function (curr, next) {
        return curr + next;
      });

      return start + " - " + stop;
    }
  }, {
    key: "perPage",
    value: function perPage() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;

      var clone = Array.from(this.arr);
      var totalNumOfPages = Math.ceil(this.arr.length / n);
      var total = clone.length;
      var currentlyShowing = [];
      var res = [];

      var count = 0;
      var temp = null;

      while (clone.length > 0) {
        count += 1;

        temp = clone.splice(0, n);
        currentlyShowing.push(temp.length);

        temp.push({
          paginationInfo: {
            currentPage: count,
            nextPage: count === totalNumOfPages ? null : count + 1,
            previousPage: count - 1 === 0 ? null : count - 1,
            currentlyShowing: this.showingCalc(currentlyShowing) + " of " + total,
            isLastPage: count === totalNumOfPages,
            totalNumOfPages: totalNumOfPages,
            total: total
          }
        });

        res.push(temp);
      }

      return new Paginate(res);
    }
  }, {
    key: "page",
    value: function page(n) {
      var requestedPage = this.arr[n - 1];
      var lastPage = this.arr[this.arr.length - 1];

      return requestedPage || lastPage || [];
    }
  }]);

  return Paginate;
}();

exports.default = Paginate;