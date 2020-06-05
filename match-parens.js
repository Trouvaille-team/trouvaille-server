'use strict';

function matchParens(str) {
  if (str.length < 1) {
    return;
  }
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf('(', str.length - 1) && str.lastIndexOf(')', str)) {
      return true;
    } else {
      return false;
    }
  }
}

console.log(matchParens('t – (s-k + x'));
