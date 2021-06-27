# First-Class Functions and Applicative Programming

The basics of functional programming,
which treats functions as first-class elements of a language,
are coverd in this chapter.
I’ll provide a basis in the three common functions: **map, reduce, and filter**. Since programmers will likely be familiar with these functions, using them as a starting point should provide a nice foundation for the rest of the book.

## Functions as First-Class Things

Some programmers familiar with JavaScript, myself included, consider it to be a func‐
tional language. Of course, to say such a thing implies that others disagree with that
assessment. The reason for this disagreement stems from the fact that functional pro‐
gramming often has a relative definition, differing in minor and major ways from one
practitioner or theorist to another.1
This is a sad state of affairs, indeed. Thankfully, however, almost every single relative
definition of functional programming seems to agree on one point: a functional pro‐
gramming language is one facilitating the use and creation of first-class functions.
Typically, you will see this point accompanied by other definitional qualifications in‐
cluding but not limited to static typing, pattern matching, immutability, purity, and so
on. However, while these other points describe certain implementations of functional
programming languages, they fail in broad applicability. If I boil down the definition to
its essence, consisting of the terms “facilitating” and “first-class functions,” then it covers
a broad range of languages from Haskell to JavaScript—the latter being quite important
27
www.it-ebooks.info 2. Haskell programs dealing with matters of I/O are often highly imperative in nature, but you would be hardpressed to find someone claiming that Haskell was not functional.
to this book. Thankfully, this also allows first-class functions to be defined in a
paragraph.2
**The term “first-class” means that something is just a value.** A first-class function is one
that can go anywhere that any other value can go—there are few to no restrictions. A
number in JavaScript is surely a first-class thing, and therefore a first-class function has
a similar nature:

- A number can be stored in a variable and so can a function:

```js
var fortytwo = function () {
  return 42;
};
```

- A number can be stored in an array slot and so can a function:

```js
    var fortytwos [42, function() { return 42 }];
```

- A number can be stored in an object field and so can a function:

```js
var fortytwos = {
  number: 42,
  fun: function () {
    return 42;
  },
};
```

- A number can be created as needed and so can a function:

```js
42 +
  (function () {
    return 42;
  })();
//=> 84
```

- A number can be passed to a function and so can a function:

```js
function weirdAdd(n, f) {
  return n + f();
}
weirdAdd(42, function () {
  return 42;
});
//=> 84
```

- A number can be returned from a function and so can a function:

```js
return 42;

return function () {
  return 42;
};
```

The last two points define by example what we would call a “higher-order” function;
put directly, a higher-order function can do one or both of the following:

- Take a function as an argument
- Return a function as a result

In Chapter 1, `comparator` was used as an example of a higher-order function,
but here is yet another example:

```js
_.each(["whiskey", "tango", "foxtrot"], function (word) {
  console.log(word.charAt(0).toUpperCase() + word.substr(1));
});

// (console) Whiskey
// (console) Tango
// (console) Foxtrot
```

Underscore’s _.each function takes a collection (object or array) and **loops over its
elements**, calling the function given as the second argument for \_each_ element.

I’ll dive deeper into higher-order functions in Chapter 4. For now, I’ll take a couple of
pages to talk about JavaScript itself, because as you may already know, while it supports
a functional style, it also supports a number of other programming paradigms.

### JavaScript's Multiple Paradigms

Of course JavaScript is not strictly a functional programming language, but instead
facilitates the use of other paradigms as well:

_Imperative programming_
Programming based around describing actions in detail
_Prototype-based object-oriented programming_
Programming based around prototypical objects and instances of them
_Metaprogramming_
Programming manipulating the basis of JavaScript's execution model

Including only imperative, object-oriented, and metaprogramming restricts us to only
those paradigms directly supported by the built-in language constructs. You could fur‐
ther support other paradigms, like class orientation and evented programming, using
the language itself as an implementation medium, but this book does not deal with those
topics in depth. Before I get into the definition and details of JavaScript’s support for
first-class functions, let me take a brief moment to elucidate how the other three models
differ from functional programming. I’ll dig deeper into each topic throughout this
book, so for now a paragraph or two on each should suffice in transitioning you into
the functional programming discussion.

#### Imperative programming

An imperative programming style is categorized by its exquisite (and often infuriating) attention to the details of algorithm implementation. Further, imperative programs are often built around the direct manipulation and inspection of program state.
For example, imagine that you'd like to write a program to build a lyric sheet for the song "99 Bottles of Beer." The most direct way to describe the requirements of this program are as such: - Start at 99 - Sing the following for each number down to 1: - X bottles of beer on the wall - X bottles of beer - Take one down, pass it around - X-1 bottles of beer on the wall - Substract one from the last number and start over with the new value - When you finally get to the number 1, sing the following last line instead: - No more bottles of beer on the wall

As it turns out, this specification has f fairly straightfoward imperative implementation in JavaScript, as shown here:

```js
var lyrics = [];

for (var bottles = 99; bottles > 0; bottles--) {
  lyrics.push(bottles + " bottles of beer on the wall");
  lyrics.push(bottles + " bottles of beer");
  lyrics.push("Take one down, pass it around");

  if (bottles > 1) {
    lyrics.push(bottles - 1 + " bottles of beer on the wall.");
  } else {
    lyrics.push("No more bottles of beer on the wall!");
  }
}
```

This imperative version, while somewhat contrived, is emblematic of an imperative
programming style. That is, the implementation describes a “99 Bottles of Beer” pro‐
gram and exactly a “99 Bottles of Beer” program. Because imperative code operates at
such a precise level of detail, they are often one-shot implementations or at best, difficult
to reuse. Further, imperative languages are often restricted to a level of detail that is good
for their compilers rather than for their programmers (Sokolowski 1991).
By comparison, a more functional approach to this same problem might look as follows:

```js
function lyricsSegment(n) {
  return _.chain([])
    .push(n + " bottles of beer on the wall")
    .push(n + " bottles of beer")
    .push("Take one down, pass it around")
    .tap(function (lyrics) {
      if (n > 1) lyrics.push(n - 1 + " bottles of beer on the wall.");
      else lyrics.push("No more bottles of beer on the wall!");
    })
    .value();
}
```

The lyricSegment function does very little on its own—in fact, it only generates the
lyrics for a single verse of the song for a given number:

```js
lyricsSegment(9);

// [
// "9 bottles of beer on the wall",
// "9 bottles of beer",
// "Take one down, pass it around",
// "8 bottles of beer on the wall.",
// ];
```

Functional programming is about pulling programs apart and reassembling them from
the same parts, abstracted behind function boundaries. Thinking in this way, you can
imagine that the lyricSegment function is the part of the “99 Bottles” program that
abstracts lyric generation. Therefore, the part of the program that abstracts the assembly
of the verse segments into a song is as follows:

```js
function song(start, end, lyricGen) {
  return _.reduce(
    _.range(start, end, -1),
    function (acc, n) {
      return acc.concat(lyricGen(n));
    },
    []
  );
}
```

And using it is as simple as:

```js
song(99, 0, lyricsSegment);

//=> ["99 bottles of beer on the wall",
//    ...
//    "No more bottles of beer on the wall!"]
```

Abstracting in this way allows you to separate out domain logic (i.e., the generation of
a lyrical verse) from the generic verse assembly machinery. If you were so inclined, you
could pass different functions like germanLyricSegment or agreementLyricSegment
into song to generate a different lyric sheet altogether. Throughout this book, I’ll use
this technique, and explain it in greater depth along the way.

#### Prototype-based object-oriented programming

JavaScript is very similar to Java or C# in that its constructor functions are classes (at
least at the level of implementation details), but the method of use is at a lower level.
Whereas every instance in a Java program is generated from a class serving as its
template, JavaScript instances use existing objects to serve as prototypes for specialized
Functions as First-Class Things | 31
www.it-ebooks.info 3. There is an existential crisis lurking in the question, “who created the first object?”
instances.3
Object specialization, together with a built-in dispatch logic that routes calls
down what’s called a prototype chain, is far more low-level than class-oriented pro‐
gramming, but is extremely elegant and powerful. I will talk about exploiting JavaScript’s
prototype chain later in Chapter 9.
For now, how this relates to functional programming is that functions can also exist as
values of object fields, and Underscore itself is the perfect illustration:

```js
_.each;

//=> function (array, n, guard) {
//    ...
//    }
```

This is great and beautiful, right? Well…not exactly. You see, because JavaScript is ori‐
ented around objects, it must have a semantics for self-references. As it turns out, its
self-reference semantics conflict with the notion of functional programming. Observe
the following:

```js
var a = {
  name: "a",
  fun: function () {
    return this;
  },
};

a.fun();
//=> {name: "a", fun: ...};
```

You’ll notice that the self-reference this returned from the embedded fun function
returns the object a itself. This is probably what you would expect. However, observe
the following:

```js
var bFunc = function () {
  return this;
};
var b = { name: "b", fun: bFunc };

b.fun();
//=> some global object, probably window
```

Well, this is surprising. You see, when a function is created outside of the context of an
object instance, its this reference points to the global object. Therefore, when I later
bound bFunc to the field b.fun, its reference was never updated to b itself. In most
programming languages offering both functional and object-oriented styles, a trade-off
is made in the way that self-reference is handled. JavaScript has its approach while
Python has a different approach and Scala has a different approach still. Throughout
this book, you’ll notice a fundamental tension between an object-oriented style and a
functional style, but Underscore provides some tools to relieve, if not eliminate, this
tension. This will be covered in greater depth later, but for now keep in mind that when
I use the word “function” I mean a function that exists on its own and when I use
“method” I mean a function created in the context of an object.

#### Metaprogramming

Related to prototype-based object-oriented programming are the facilities provided by
JavaScript supporting metaprogramming. Many programming languages support met‐
aprogramming, but rarely do they provide the level of power offered by JavaScript. A
good definition of metaprogramming goes something like this: **programming** occurs
when you write code to do something and **metaprogramming** occurs when you write
code that changes the way that something is interpreted. Let’s take a look at an example
of metaprogramming so that you can better understand.
In the case of JavaScript, the dynamic nature of the this reference can be exploited to
perform a bit of metaprogramming. For example, observe the following constructor
function:

```js
function Point2D(x, y) {
  this._x = x;
  this._y = y;
}
```

When used with new, the Point2D function gives a new object instance with the proper
fields set as you might expect:

```js
new Point2D(0, 1);
//=> {_x: 0, _y: 1}
```

However, the `Function.call` method can be used to metaprogram a derivation of the
`Point2D` constructor’s behavior for a new `Point3D` type:

```js
function Point3D(x, y, z) {
  Point2D.call(this, x, y);
  this._z = z;
}
```

And creating a new instance works like a champ:

```js
new Point3D(10, -1, 100);
//=> {_x: 10, _y: -1, _z: 100}
```

Nowhere did `Point3D` explicitly set the values for `this._x` and `this._y`, but by
dynamically binding the `this` reference in a call to `Point2D` it became possible to change
the target of its property creation code.
I will not go too deeply into JavaScript metaprogramming in this book because it’s or‐
thogonal to functional programming, but I’ll take advantage of it occasionally through‐
out this book.4

## Applicative Programming

So far in this book I’ve shown only one aspect of functional programming that deals
with a narrow band of the capabilities of functions—namely, applicative programming.
Applicative programming is defined as the calling by function B of a function A, supplied
as an argument to function B originally. I will not use the term “applicative” very often
in this book because variations of that word can appear in different contexts with dif‐
ferent meanings, but it’s good to know should you see it in the future. That said, the
three canonical examples of applicative functions are map, reduce, and filter. Observe
how they operate:

```js
var nums = [1, 2, 3, 4, 5];
function doubleAll(array) {
  return _.map(array, function (n) {
    return n * 2;
  });
}
doubleAll(nums);
//=> [2, 4, 6, 8, 10]
function average(array) {
  var sum = _.reduce(array, function (a, b) {
    return a + b;
  });
  return sum / _.size(array);
}
average(nums);
//=> 3
/* grab only even numbers in nums */
function onlyEven(array) {
  return _.filter(array, function (n) {
    return n % 2 === 0;
  });
}
onlyEven(nums);
//=> [2, 4]
```

You can imagine that somewhere inside of map, reduce, and filter a call to the function
that’s passed in occurs, and indeed that is the case. In fact, the semantics of these func‐
tions can be defined in terms of that very relationship:
The functions map, reduce, and filter are as simple and as emblematic of applicative

• _.map calls a function on every value in a collection in turn, returning a collection
of the results
• _.reduce collects a composite value from the incremental results of a function
supplied with an accumulation value and each value in a collection
34 | Chapter 2: First-Class Functions and Applicative Programming
www.it-ebooks.info
• \_.filter calls a predicate function (one returning a true or false value) and grabs
each value where said predicate returned true, returning them in a new collection

functional programming as you can get, but Underscore provides numerous others for
your use. Before I get into those, let me take a moment to cover the idea of collectioncentric programming, which is often coupled with functional programming itself.

### Collection-Centric Programming

Functional programming is extremely useful for tasks requiring that some operation happen on many items in a collection.

### Other Examples of Applicative Programming

##### reduceRight

You've already seen the `_.reduce` function, but I failed to mention its sibling `_.reduceRight`. The two function operate in much the same way, except that `_reduce` works from left to right, wheares `_.reduceRight` works from right to left. Observe the differences:

```js
var nums = [100, 2, 25];

function div(x, y) {return x/y}

_.reduce(nums, div)
//=> 2

_.reduceRight(nums, div):
//=> 0.125
```
