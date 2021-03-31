const _ = require("lodash");

function run() {
  // if (_.includes([0, -1], compareLessThanOrEqual(1, 1)))
  //   console.log("less or equal");
  // sorteds();
  const csv = `name, age, hair
  Merble, 35, red
  Bob, 64, blonde`;
  const result = lameCSV(csv);
  console.log("result: ", result);
}
run();

// forEach
function popsup(arr) {
  arr.forEach((item) => console.log(item));
}

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

function parseAge(age) {
  if (!_.isString(age)) throw new Error("Expecting a string");
  var a;

  console.log("Attempting to parse an age");

  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    console.log(["Could not parse age: ", age].join(" "));
    a = 0;
  }

  return a;
}

function fail(thing) {
  // throw new Error(thing);
  console.error("Error: ", thing);
}

function warn(thing) {
  console.log(["WARNING: ", thing].join(" "));
}

function note(thing) {
  console.log(["NOTE: ", thing].join(" "));
}

function parseAgeRewritten(age) {
  if (!_.isString(age)) fail("Expecting a string");
  var a;

  note("Attempting to parse an age");
  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    warn(["Could not parse age:", age].join(" "));
  }

  return a;
}

let letters = ["a", "b", "c"];

function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

function naiveNth(a, index) {
  if (!_.isNumber(index)) fail("Expected a number as the index");
  if (!isIndexed(a)) fail("Not supported on non-indexed type");
  if (index < 0 || index > a.length - 1) fail("Index value is out of bounds");

  return a[index];
}

function second(a) {
  return naiveNth(a, 1);
}

function compareLessThanOrEqual(x, y) {
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}

function sorteds() {
  console.log([2, 3, -6, 0, -108, 42].sort(comparator(lessOrEqual)));
  console.log([0, -1, -2].sort(comparator(lessOrEqual)));
  console.log([2, 3, -1, -6, 0, -108, 42, 10].sort(comparator(lessOrEqual)));
}

function lessOrEqual(x, y) {
  return x <= y;
}

function comparator(pred) {
  return function (x, y) {
    if (Boolean(pred(x, y))) return -1;
    else if (Boolean(pred(x, y))) return 1;
    else return 0;
  };
}

function lameCSV(str) {
  return _.reduce(
    str.split("\n"),
    function (table, row) {
      table.push(
        _.map(row.split(","), function (c) {
          return c.trim();
        })
      );
      return table;
    },
    []
  );
}

const lameCSVArrow = (str) => {
  return _.reduce(
    str.split("n"),
    (table, row) => {
      table.push(
        _.map(row.split(","), (c) => {
          return c.trim();
        })
      );
      return table;
    },
    []
  );
};
