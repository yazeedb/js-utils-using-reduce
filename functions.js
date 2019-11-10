const pipe = (...functions) => (initialValue) =>
  functions.reduce((value, fn) => fn(value), initialValue);

const compose = (...functions) => (initialValue) =>
  functions.reduceRight((value, fn) => fn(value), initialValue);

const zip = (list1, list2) => {
  const sourceList = list1.length > list2.length ? list2 : list1;

  return sourceList.reduce((acc, _, index) => {
    const value1 = list1[index];
    const value2 = list2[index];

    acc.push([value1, value2]);

    return acc;
  }, []);
};

const intersperse = (separator, list) =>
  list.reduce((acc, value, index) => {
    if (index === list.length - 1) {
      acc.push(value);
    } else {
      acc.push(value, separator);
    }

    return acc;
  }, []);

const insert = (index, newItem, list) => {
  if (index > list.length - 1) {
    return [...list, newItem];
  }

  return list.reduce((acc, value, sourceArrayIndex) => {
    if (index === sourceArrayIndex) {
      acc.push(newItem, value);
    } else {
      acc.push(value);
    }

    return acc;
  }, []);
};

const flatten = (list) => list.reduce((acc, value) => acc.concat(value), []);

const flatMap = (mappingFunction, list) => flatten(list.map(mappingFunction));

const includes = (item, list) =>
  list.reduce((isIncluded, value) => isIncluded || item === value, false);

const compact = (list) =>
  list.reduce((acc, value) => {
    if (value) {
      acc.push(value);
    }

    return acc;
  }, []);

const arrayIntoObject = (key, list) =>
  list.reduce((acc, obj) => {
    const value = obj[key];

    acc[value] = obj;

    return acc;
  }, {});

const adjust = (index, fn, list) =>
  list.reduce((acc, value, sourceArrayIndex) => {
    const valueToUse = sourceArrayIndex === index ? fn(value) : value;

    acc.push(valueToUse);

    return acc;
  }, []);

exports.pipe = pipe;
exports.compose = compose;
exports.zip = zip;
exports.intersperse = intersperse;
exports.insert = insert;
exports.flatten = flatten;
exports.flatMap = flatMap;
exports.includes = includes;
exports.compact = compact;
exports.arrayIntoObject = arrayIntoObject;
exports.adjust = adjust;
