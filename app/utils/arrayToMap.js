const arrayToMap = (array, keyField) => {
  const map = new Map();
  array.forEach(element => {
    map.set(element[keyField], element);
  });

  return map;
};

export default arrayToMap;
