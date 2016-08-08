const hasCustomRender = (prop, columns) => (
  !!columns.filter((item) => item.property === prop && item.hasOwnProperty('renderAs'))[0]
);

const callCustomRender = (prop, columns, obj) => {
  const property = columns.filter((item) => (
    item.property === prop && item.hasOwnProperty('renderAs'))
  )[0];

  return property.renderAs(obj);
};

export { hasCustomRender, callCustomRender };
