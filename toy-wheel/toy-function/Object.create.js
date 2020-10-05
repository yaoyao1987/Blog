function toyCreate(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype my only be an Object: ' + proto)
  } else if (proto === null) {

  }

  function F() { }
  F.prototype = proto;
  return new F();
}

// ======================================================
/**
 * testing
 */

console.log(toyCreate(null));
console.log(toyCreate({}));