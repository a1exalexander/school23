export const getLaws = docs => {
  return docs.filter(el => el.type.match(/закон|зу/gi));
};

export const getOrders = docs => {
  return docs.filter(el => {
    return el.type.match(/мініст|моу/gi);
  });
};

export const getActs = docs => {
  return docs.filter(el => {
    return !el.type.match(/мініст|моу|закон|зу/gi);
  });
};
