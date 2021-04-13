import _ from "lodash";

function eachFn(args: string[]) {
  _.each(args, function (word: string) {
    console.log("word.charAt(0): ", word.charAt(0));
    console.log("word.substr(1): ", word.substr(1));
    console.log(word.charAt(0).toUpperCase() + word.substr(1));
  });

  _.each(args, (word: string) => {
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

function lyricsSegment(n: number) {
  let lyrics = _.chain([] as string[])
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

function song2(start: number, end: number, lyricGen: (n: number) => string[]) {
  let song = _.reduce(
    _.range(start, end, -1),
    function (acc: string[], n) {
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

function Point2D(x: number, y: number) {}

function doubleAll(array: number[]) {
  return _.map(array, function (n) {
    return n * 2;
  });
}

function average(array: number[]) {
  let sum =
    _.reduce(array, function (a, b) {
      console.log("a: ", a, "b: ", b);
      return a + b;
    }) || 0;
  console.log("sum: ", sum, "size: ", _.size(array));

  return sum / _.size(array);
}

function onlyEven(array: number[]) {
  return _.filter(array, function (n) {
    return n % 2 === 0;
  });
}

function run() {
  // eachFn(["whiskey", "tango", "foxtrot"]);
  // song2(99, 0, lyricsSegment);
  // prototype();
  let nums = [1, 2, 3, 4, 5];
  console.log("doubleAll(nums): ", doubleAll(nums));
  console.log("average(nums): ", average(nums));
  console.log("onlyEven(nums): ", onlyEven(nums));
}
run();
