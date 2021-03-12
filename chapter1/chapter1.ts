import _ from "lodash";

// forEach
function popsup(arr: number[]) {
  arr.forEach((item) => console.log(item));
}

// popsup([1, 2, 3]);

// apply
function splat(fun: (x: number, y: number) => number) {
  return function (array: [number, number]) {
    // 아래 두개의 함수 실행 모두 작동.
    // argument 가 array 일 경우에는 apply 메서드를 사용하는 게 편한 듯.
    return fun.apply(null, array);
    // return fun(array[0], array[1]);
  };
}

let addArrayElements = splat(function (x: number, y: number) {
  return x + y;
});

addArrayElements([1, 2]);

const numbers = [5, 6, 2, 3, 7];
const maxUsingApply = Math.max.apply(null, numbers);
const maxNotUsingApply = Math.max(...[5, 6, 2, 3, 7]);

// call
// TODO: arguments 는 타입스크립트에서 쓸 수 없나?

function unsplat(fun: any) {
  return function (...args: any) {
    return fun.call(null, _.toArray(args));
  };
}

let joinElements = unsplat(function (array: any) {
  return array.join(" ");
});

console.log(joinElements(1, 2));

console.log(joinElements("-", "$", "/", "!", ":"));
