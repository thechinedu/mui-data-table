const hasHtml = (prop, arr) => (
  !!(arr.filter((item) => item.property === prop)[0].html)
);

const extractHtml = (prop, arr) => (
  arr.filter((item) => item.property === prop)[0].html
);

export { extractHtml, hasHtml };
