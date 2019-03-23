const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    // eslint-disable-next-line no-param-reassign
    obj[item[keyField]] = item;
    return obj;
  }, {});

export default arrayToObject;
