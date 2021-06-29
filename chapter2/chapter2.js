const _ = require("lodash");

function eachFn(args) {
  _.each(args, function (word) {
    console.log("word.charAt(0): ", word.charAt(0));
    console.log("word.substr(1): ", word.substr(1));
    console.log(word.charAt(0).toUpperCase() + word.substr(1));
  });

  _.each(args, (word) => {
    console.log(word.charAt(0).toUpperCase() + word.substr(1));
  });

  args.forEach((word) => {
    console.log(word.charAt(0).toUpperCase() + word.substr(1));
  });
}

function song() {
  let lyrics = [];

  for (let bottles = 99; bottles > 0; bottles -= 1) {
    lyrics.push(bottles + " bottles of beer on the wall");
    lyrics.push(bottles, " bottles of beer");
    lyrics.push("Take one down, pass it around");

    if (bottles > 1) {
      lyrics.push(bottles - 1 + " bottles of beer on the wall.");
    } else {
      lyrics.push("No more bottles of beer on the wall!");
    }
  }

  return lyrics;
}

function lyricsSegment(n) {
  let lyrics = _.chain([])
    .push(n + " bottles of beer on the wall")
    .push(n + " bottles of beer")
    .push("Take one down, pass it around")
    .tap(function (lyrics) {
      if (n > 1) lyrics.push(n - 1 + " bottles of beer on the wall.");
      else lyrics.push("No more bottles of beer on the wall!");
    })
    .value();

  return lyrics;
}

function song2(start, end, lyricGen) {
  let song = _.reduce(
    _.range(start, end, -1),
    function (acc, n) {
      return acc.concat(lyricGen(n));
    },
    []
  );

  return song;
}

function prototype() {
  let a = {
    name: "a",
    fun: function () {
      return this;
    },
  };

  return a.fun();
}

// function prototype2() {
//   let bFunc = function () {
//     return this;
//   };
//   let b = { name: "b", fun: bFunc };

//   return b.fun();
// }

function Point2D(x, y) {
  this._x = x;
  this._y = y;
}

const createdPoint2D = new Point2D(0, 1);

function Point3D(x, y, z) {
  Point2D.call(this, x, y);
  this._z = z;
}

const createdPoint3D = new Point3D(10, -1, 100);
const createdPoint2D2 = new Point2D(0, 1);

function collectionCentricProgramming() {
  // return _.map({ a: 1, b: 2 }, _.identity); // retun values
  return _.map({ a: 1, b: 2 }, function (v, k, coll) {
    return [k, v, _.keys(coll)];
  });
}

function reduceRightFn() {
  let nums = [100, 2, 25];

  function div(x, y) {
    return x / y;
  }

  console.log(_.reduce(nums, div));

  console.log(_.reduceRight(nums, div));
}

function findFn() {
  console.log(_.find(["a", "b", 3, "d"], _.isNumber));
}

function run() {
  reduceRightFn();
}
run();
