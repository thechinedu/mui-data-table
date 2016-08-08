export const objCopy = (arr) => {
  const res = [];

  arr.forEach(function (item) {
    if (typeof item === 'object') res.push(Object.assign({}, item, {}));
  });

  return res;
};

export const lastElem = (arr) => {
  return arr[arr.length - 1];
};
