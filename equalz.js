const customType = (o) =>
  [Array, Function, Boolean, Number, BigInt, Date, String, RegExp, Buffer].find(
    (type) => o instanceof type
  );

function typedArray(buffer) {
  if (!ArrayBuffer.isView(buffer)) return false;
  return buffer.constructor.name;
}

const isArray = (arr) => Array.isArray(arr) || typedArray(arr);

export function _equalz(value, other, opt = {}) {
  return equalz(other, value, opt);
}

export function equalz(value, other, opt = {}) {
  if (value === other)
    // || value == other
    return true;

  if (typeof value !== typeof other) {
    // null & undefined values
    if (!value || !other) return false;

    // Object & primitive for booleans & numbers. Ex: new Number(2) === Number(2)
    if (value.valueOf && other.valueOf) {
      if (opt.weakEquality) return value == other;
      else return value.valueOf() === other.valueOf();
    } else return false;
  }

  // primitives
  if (typeof value !== "object") return value === other;

  // arrays..
  if (isArray(value) && isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }

    if (typedArray(value) !== typedArray(other)) return false;

    for (let i = 0; i < value.length; i++) {
      if (!equalz(value[i], other[i])) {
        return false;
      }
    }

    return true;
  } else {
    if (isArray(value) || isArray(other)) return false;
  }

  // not array..

  const valueType = customType(value);
  const otherType = customType(other);

  if (valueType !== otherType) return false;

  // if (isStandardNotObject(value)/* && isStandardNotObject(other) */
  // custom types
  switch (true) {
    case value instanceof Function:
      return value.toString() === other.toString();
    case value instanceof Boolean:
      return value.valueOf() === other.valueOf();
    case value instanceof Number:
      return value.valueOf() === other.valueOf();
    case value instanceof Function:
      return value.valueOf() === other.valueOf();
    case value instanceof BigInt:
      return value === other;
    case value instanceof Date:
      return value.getTime() === other.getTime();
    case value instanceof String:
      return value.valueOf() === other.valueOf();
    case value instanceof RegExp:
      return String(value) === String(other);
    case value instanceof Buffer:
      return value.equals(other);
    default:
      break;
  }

  // sets
  if (value instanceof Set && other instanceof Set)
    return value.size === other.size && [...value].every((x) => other.has(x));
  else if (value instanceof Set || other instanceof Set) return false;

  // canonical: equalz({}, {})
  // Normally this condition is not needed anymore
  // if (value instanceof Object && other instanceof Object) {
  if (!equalz(Object.keys(value).sort(), Object.keys(other).sort()))
    return false;

  for (const [key, value_] of Object.entries(value)) {
    if (!equalz(value_, other[key])) return false;
  }

  return true;
}
