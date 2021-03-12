const _ = require("lodash");

// forEach
function popsup(arr) {
  arr.forEach((item) => console.log(item));
}

// popsup([1, 2, 3]);

// apply
function splat(fun) {
  return function (array) {
    // 아래 두개의 함수 실행 모두 작동.
    // argument 가 array 일 경우에는 apply 메서드를 사용하는 게 편한 듯.
    return fun.apply(null, array);
    // return fun(array[0], array[1]);
  };
}

let addArrayElements = splat(function (x, y) {
  return x + y;
});

addArrayElements([1, 2]);

const numbers = [5, 6, 2, 3, 7];
const maxUsingApply = Math.max.apply(null, numbers);
const maxNotUsingApply = Math.max(...[5, 6, 2, 3, 7]);

// call
function unsplat(fun) {
  return function () {
    return fun.call(null, _.toArray(arguments));
  };
}

let joinElements = unsplat(function (array) {
  return array.join(" ");
});

console.log(joinElements(1, 2));

console.log(joinElements("-", "$", "/", "!", ":"));
