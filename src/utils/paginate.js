class Paginate {
  constructor(arr) {
    this.arr = arr;
  }

  showingCalc(arr) {
    if (arr.length <= 1) return `1 - ${arr[0]}`;

    const start = (arr.slice(0, arr.length - 1).reduce((curr, next) => curr + next)) + 1;
    const stop = arr.reduce((curr, next) => curr + next);

    return `${start} - ${stop}`;
  }

  perPage(n = 5) {
    const clone = Array.from(this.arr);
    const totalNumOfPages = Math.ceil(this.arr.length / n);
    const total = clone.length;
    const currentlyShowing = [];
    const res = [];

    let count = 0;
    let temp = null;

    while (clone.length > 0) {
      count += 1;

      temp = clone.splice(0, n);
      currentlyShowing.push(temp.length);

      temp.push({
        paginationInfo: {
          currentPage: count,
          nextPage: (count === totalNumOfPages ? null : (count + 1)),
          previousPage: ((count - 1) === 0 ? null : (count - 1)),
          currentlyShowing: `${this.showingCalc(currentlyShowing)} of ${total}`,
          isLastPage: (count === totalNumOfPages),
          totalNumOfPages,
          total
        }
      });

      res.push(temp);
    }

    return new Paginate(res);
  }

  page(n) {
    const requestedPage = this.arr[n - 1];
    const lastPage = this.arr[this.arr.length - 1];

    return requestedPage || lastPage || [];
  }
}

export default Paginate;
