"use strict";

/**
 * 2021.04.05 Views Map 생성
 * Router.js에서 사용
 */

const getComponents = require.context("/", true, /[\w-].vue$/);

const str2obj = (arr, val, base) => {
  return arr.reduce((obj, key, idx, b) => {
    if (idx + 1 === b.length) {
      obj[key] = val;
    } else if (idx === 0) {
      obj[key] = str2obj(b.splice(1), val, obj[key] || {});
    }
    return obj;
  }, base);
};

// const Views =

module.exports = getComponents.keys().reduce((obj, name, idx) => {
  const comp = getComponents(name);
  name = name.replace("./", "").replace(/.vue$/, "");
  return str2obj(name.split("/"), comp.default, obj);
}, {});
