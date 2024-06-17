/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (!obj) {
    return;
  }

  const invertedObj = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (isPrimitive(value)) {
      invertedObj[value] = key;
    }
  });

  return invertedObj;
}

function isPrimitive(value) {
  return Object(value) !== value;
}
