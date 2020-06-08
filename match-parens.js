'use strict';

const e = require('express');

// given a string, check to see if the string has balanced opening ( + ) closing parens
// if every open has a close, return true; else, return false
// strings returning true: 't – (s-k + x)', '(a98*SA()da@(i,))'
// strings returning false: '(ia93$()', #u)s894), je312$#

function matchParens(str) {
  if (typeof str !== 'string') {
    alert('input must be a string!');
  }
  let opens = 0;
  let closes = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      opens++;
    } else if (str[i] === ')') {
      closes++;
    }
  }
  if (opens % closes !== 0) {
    return false;
  } else {
    return true;
  }
}

function equalParens(str) {
  if (typeof str !== 'string') {
    alert('input must be a string!');
  }
  let stack = [];
  let parens = {
    '(': ')',
  };
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push(str[i]);
    } else {
      const last = stack.pop();
      if (str[i] !== parens[last]) {
        return false;
      }
    }
  }
  if (stack.length !== 0) {
    return false;
  } else {
    return true;
  }
}

function balancedParens(str) {
  if (typeof str !== 'string') {
    alert('invalid: input must be a string!');
  }
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i])
      if (str[i] === '(') {
        stack.push('(');
      } else if (str[i] === ')') {
        console.log(stack);
        stack.pop();
      }

    if (stack.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}

function parensPairs(str) {
  if (typeof str !== 'string') {
    alert('invald input type');
  }
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push('(');
    } else if (str[i] === ')') {
      stack.pop();
    }
  }
  if (stack.length !== 0) {
    return false;
  }
  return true;
}

console.log(parensPairs('t–s-)k+x'));
