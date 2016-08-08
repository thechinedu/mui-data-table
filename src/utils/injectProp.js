const injectProp = (arr) => {
  let count = 0, res = arr.slice(0);

  res.forEach((obj) => {
    if (!obj.property) {
      count += 1;
      obj.property = 'MuiDataTableProp-' + count;
    }
  });

  return res;
};

export default injectProp;
