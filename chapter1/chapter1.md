# chapter 1 - Introductin Functional JavaScript

This chapter sets up the book in a number of importatnt ways.
In it, I will introduce Underscore and explain
how you can start using it.
Additioanlly, I will define the terms and goals of the rest of the book.

## The Case for JavaScript

The question of why you might choose JavaScript is easily answered in a word: reach.
In ohter words, aside from perhaps Java,
there is no more popular programming lan-guage right now than JavaScript.
Its ubiquity in the browser and its near-ubiquity in a vast sea of current and emerging technologies make it a nice

- and sometimes the only - choice for portability.
  With the reemergence of client-service and single-page application architectures,
  the use of JavaScript in discrete applications
  (i.e., signle-page apps)
  attached to numerous network service is exploding.
  For example, Google Apps are all written in JavaScript,
  and are prime examples of the single-page application paradigm.
  If you've come to JavaScript with a ready interest in functional programming,
  then the good news is that it supports functional techniques
  "right out of the box"
  (e.g., the function is a core element in JavaScript)/
  For example, if you have any experiece with JavaScript,
  then you might have seen code like the following:

```js
[1, 2, 3].forEach(alert);
// alert box with "1" pops up
// alert box with "2" pops up
// alert box with "3" pops up
```

The `Array#forEach` method, added in the fifth edition of the ECMA-262 language standard,
takes some function (in this case, `alert`)
and passes each array element to the funciton one after the other.
That is, JavaScript provides various methods and functions that take other functions as arguments for some innter purpose.
I'll talk more about this style of programming as the book progress.
JavaScript is alos built on a solid foundation of language primitives,
which is amazing,
but a double-edged sword
(as I'l discuss soon).
From functions to closures to prototypes to a fairly nice dynamic core,
JavaScript provides a well-stocked set of tools.
In addition, JavaScript provides a very open and flexible execution model.
As a small example,
all JavaScript functions have an `apply` method that allows you to call the function with an array as if the array elements were the arguments to the function itself.
Using `apply`, I can create a neat little function named `splat` that just takes a function and returns another function that takes an array and calls the original with `apply`, so that its elements server as its arguments:

```js
functions splat(fun) {
  return function(array) {
    return fun.apply(null, array);
  }
}

var addArrayElements = splat(function(x, y) {return x + y});

addArrayElements([1, 2]);
// => 3
```

This is your first taste of functional programming

- a function that returns another function - but I'll get to the meat of that later. The point is that `apply` is only one of many ways that JavaScript is a hugely flexible programming language.

Another way that JavaScript proves its flexibility is that any function may be called with any number of arguments of any type,
at any time.
We can create a function `unsplat` that works opposite from `splat`,
taking a funciton and returning another function
that takes any number of arguments and calls the original with an array of the values given:

```js
function unsplat(fun) {
  return function () {
    return fun.call(null, _.toArray(arguments));
  };
}

var joinElements = unsplat(function (array) {
  return array.join(" ");
});

joinelements(1, 2);
// => "1 2"

joinElements("-", "$", "/", "!", ":");
// => "- $ / ! :"
```

Every JavaScript function can access a local value named `arguments`
that is an array-like structure holding the values that
the function was called with.
Having access to `arguments` is surprisingly powerfule,
and is used to amazing effect i JavaScript in the wild.
Additionally,
`call` method is similar to `apply` except that
the former takes the `arguments` one by one rahter than as an array,
as expected by `apply`.
The trifecta of `apply`, `call`, and `arguments` is only a small smaple of the
extreme flexibility provided by JavaScript.
With the emergent growth of JavaScript for creating applications of all sizes,
you might expect stagnation in the language itself
or its runtime support.
However, enven a casual investigation of the
`ECMAScript.next` initiative shows that it's clear that
JavaScript is ans evolving (albeit slowly) language.
Likewise, JavaScript engines like V8 are constantly evolving
and improving JavaScript speed and efficiency using both time-tested and novel techniques.

## Some Limitations of JavaScript

The case against JavaScript - in light of its evolution,
ubiquity, and reach - is quite thin.
You can say much about the language quirks and robustness failings,
but the fact is that JavaScript is here to say,
now and indefinitely.
Regradless, it's worth acknowledging that JavaScrit is a flawed language.
In fact, the most popular book on JavaScript,
Doublas Crockford's _JavaScript: The Good Parts_ (O'Reilly),
spends more pages discussing the terribel parts than the good.
The language has true oddities, and by and large is not particularly succinct in expression.
However, changing the problems with JavaScript would likely
"break the Web",
a circumstance that's unacceptable to most.
It's because of these problems that the number of languages targeting JavaSciprt as a compilation platform is growing;
indeed, this is a very fertile niche.

As a language supporting - and at times preferring -
imperative programming techniques and a reliance on global scoping,
JavaScript is unsafe by default.
That is, building programs with a key focus on mutability is potentially confusing
as programs grow.
Likewise, the very language itself provides the building blocks of many high-level features found by default in other languages.
For example, JavaScript itself,
prior to trunk versions of ECMAScript 6,
provides no module system,
but facilitates their creation using raw objects.
That JavaScript provides a loose collection of basic parts ensures a bevy of custom module implementations,
each incompatible with the next.
Language oddities, unsafe features, and a sea of competing libraries:
three legitimate reasons to think hard about the adoption of JavaScript.
But there is a light at the end of the tunnel
that's not just the light of an oncoming train.
The light is that through discipline and an observance to certain conventions,
JavaScript code can be not only safe,
but also simple to understand and test,
in addition to being proportionally scalable to the size of the code base.
This book will lead you on the path to one such approach:
functional programming.

## Getting Started with Functional Programming

You may have heard of functional programming on your favorite news aggregation site,
or maybe you've worked in a language supporting functional techniques.
If you've written JavaScript (and in this book I assume that you have)
then you indeed _have_ used a language supporting funcional programming.
However, htat being the case, you might not have used JavaScript in a functional way.
This book outlines a functional style of programming that aims to simplify
your own libraries and applications,
and helps tame the wild beast of JavaScript complexity.
As a bare-bones introduction,
functional programming can be described in a single sentence:

```
  Functional programming is the use of functions that transform values into units of abstraction,
  subsequently used to build software systems.
```

This is a simplification bordering on libel,
but it's functional (ha!)
for this early stage in the book.
The library that I use as my medium of functional expression
in JavaScript is Underscore,
and for the most part,
it adheres to this basic definition.
However, this definition fails to explain the "why" of functional programming.

## Why Functional Programming Matters

```
  The major evolution that is still going on for me is towards a more functional programming style,
  which involves unlearning a lot of old habits,
  and backing away from some OOP directions.
  - John Carmack
```

If you're familiar with object-oriented programming,
then you may agree that its primary goal is to break a problem into parts,
as shown in Figure 1-1 (Gamma 1995).

```
image
Figure 1-1. a problem broken into object-oriented parts
```

Likewise, these parts/objects can be aggregated and composed to form larger parts,
as shown in Figure 1-2.

```
image
Figure 1-2. Objects are "composed" together to from bigger objects
```

Based on these parts and their aggregates,
a system is then described in terms of the interactions and values of the parts,
as shown in Figure 1-3.

```
image
Figure 1-3. An object-oriented system and its interactions as a sequence diagram
```

This is a gross simplification of how object-oriented systems are formed,
but I think that as a high-level description it works just fine.

By comparison, a strict functional programming approach to solving problems also breaks a problem into parts (namely, functions), as shown in Figure 1-4.

```
image
Figure 1-4. A problem broken into functional parts
```

Whereas the object-oriented approach tends to break problems into grouping of "nouns," or objects, a functional approach breaks the same problem into groupings of "verbs," or functions.
As with object-oriented programming,
larger functions are formed by "gluing" or "composing" other functions together to build high-level behaviors,
as shown in Figure 1-5.

```
image
Figure 1-5. Functions are also componsed together to from more behaviors
```

Finally, one way that the functional parts are fomed into a system
(as shown in Figure 1-6) is by taking a value and gradually "transforming" it

- via one primitive or composed function - into another.

```
image
Figure 1-6. A functional system interacts via data transfomation
```

In a system observing a strict object-oriented style,
the interactions between objects cause internal change to each object,
leading to an overall system state that is the amalgamation of many smaller,
potentially subtle state changes.
These interrelated state changes form a conceptual "web of change"
that, at times, can be confusing to keep in your head.
This confusion becomes a problem when the act of adding new objects and
system features requires a working knowledge of the subtleties of potentially farreaching state changes.

A functional system,
on the other hand,
strives to minimize observable state modification.
Therefore, adding new features to a system
built using functional principles is a matter of understanding
how new functions can operate within the context of localized,
nondestructive (i.e., original data is never changed)
data transformations.
However, I hesitate to create a false dichotomy and say that functional and object-oriented styles should stand in opposition.
That JavaScript supports both models means that systems can and should be
composed of both models.
Finding the balance between functional and object-oriented styles is a tricky task that will be tackled much later in the book,
when discussing mixins in Chapter 9.
However, since this is a book about functional programming in JavaScript,
the bulk of the discussion is focused on functional styles rather than object-oriented ones.

Having said that,
a nice image of a system built along functional principles is an
assemply-line device that takes raw materials in one end,
and gradually builds a product that comes out the other end (Figure 1-7).

```
image
Figure 1-7. A functional program is a machine for transforming data
```

The assembly line analogy is,
of course, not entirely perfect,
because every machine I know consumes its raw materials to produce a product.
By contrast,
functional programming is what happens when you take a system built in an imperative way and shrink explicit state changes to the smalles possible footprint to make it more modular (Hughes 1984).
Practival functional programming is not about eliminating state change,
but instead about reducing the occurrences of mutation to the smallest area possible for any given system.

## Functions as Units of Abstraction

One method of abstraction is that functions hide implementation details from view.
In fact, functions are a beautiful unit of work allowing you to adhere to the long-practiced maxim in the UNIX community,
set forth by Butler Lampson:

`Make it run, make it right, make it fast.`

Likewise, functions-as-abstraction allow you to fulfill Kent Beck's similarly phrased mantra of test-driven development (TDD):

`Make it run, then make it right, the make it fast.`

For example, in the case of reporting errors and warnings,
you could write something like the following:

```js
function parseAge(age) {
  if (!_.isString(age)) throw new Error("Expecting a string");
  var a;

  console.log("Attempting to parse an age");

  a = parseInt(age, 10);

  if (!_isNaN(a)) {
    console.log(["Could not parse age: ", age].join(" "));
    a = 0;
  }

  return a;
}
```

This function, although not comprehensive for parsing age strings,
is nicely illustrative.
Use of `parseAge` is as follows:

```js
parseAge("42");
// (console) Attempting to parse an age
// => 42

parseAge(42);
// Error: Expecting a string

parseAge("frab");
// (console) Attempting to parse an age
// (console) Could not parse age: frab
// => 0
```

The `parseAge` function works as written,
but if you want to modify the way that errors,
information, and warnings are presented,
then changes need to be made to the appropriate lines therein,
and anywhere else similar patterns are used.
A better approach is to "abstract" the notion of errors,
information, and warnings info functions:

```js
function fail(thing) {
  throw new Error(thing);
}

function warn(thing) {
  console.log(["WARNING: ", thing].join(" "));
}

function note(thing) {
  console.log(["NOTE: ", thing].join(" "));
}
```

Using these functions, the `parseAge` function can be rewritten as follows:

```js
function parseAge(age) {
  if (!_.isString(age)) fail("Expecting a string");
  var a;

  note("Attempting to parse an age");
  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    warn(["Could not parse age: ", age].join(" "));
    a = 0;
  }

  return a;
}
```

Here's the new behavior:

```js
parseAge("frob");
// (console) NOTE: Attempting to parse an age
// (console) WARNING: Could not parse age: frob
// => 0
```

It's not very different from the old behavior,
except that now the idea of reporting errors,
information, and warnings has been abstracted away.
The reporting or errors,
information, and warings can thus be modified entirely:

```js
function note() {}
function warn(str) {
  alert("That doesn't look like a valid age");
}

parseAge("frob");
// (alert box) That doesn't look like a valid age
// => 0
```

Therefore, because the behavior is contained within a single function,
the function can be replaced by new functions providing similar behavior or outright different behaviors altogether (Abelson and Sussman 1996).

## Encapsulation and Hiding

Over the years,
we've been taught that a conrnerstone of object-oriented programming in _encapsulation_.
The term encapsulation in reference to object-oriented programming refers to a way of
packaging certain peices of data with the very operations that manipulate them,
as seen in Figure 1-8.

```
image
Figure 1-8. Most object-oriented languages use object boundaries
to package data elements
with the operations that work on them;
a Stack class would therefore package an array of elements with the push,
pop, and peek opeartions used to manipulate it
```

JavaScript provides an object system
that does indeed allow you to encapsulate data
with its manipulators.
However,
sometimes encapsulation is used to restrict
the visibility of certain elements,
and this act is known as _data hiding_.
JavaScript's object system
does not provide a way to hide data directly,
so data is hidden using something called closures,
as shown in Figure 1-9.

```
image
Figure 1-9. Using a closure to encapsulate data is a functional way to hide details from a client's view
```

Closures are not covered in any depth until Chapter 3,
but for now you should keep in mind that clousures
are kinds of functions.
By using functional techniques
involving closuers,
you can achieve data hiding that is as effective as the same capability
offered by most object-oriented languages,
though I hesitate to say whether functional encapsulation or object-oriented encpasulation is better.
Instead, while they are different in practice,
they both provide similar ways of building
certain kinds of abstraction.
In fact,
this book is not at all about encourating you to
throw away everything that you might have ever leanred in favor of functional programmin;
instead, it's meant to explain functional programming on its own terms so that you can decide if it's right for your needs.

## Functions as Units of Behavior

Hiding data and behavior (which has the side effect of providing a more agile change experience) is just one way that functions can be units of abstraction.
Another is to provide an easy way to store and pass around discrete units of basic behavior.
Take, for example,
JavaScript's syntax to denote looking up a value in an array by index:

```js
var letters = ["a", "b", "c"];

letters[1];
//=> 'b'
```

While array indexing is a core behavior of JavaScript,
there is no way to grab hold of the
behavior and use it as needed without placing it into a function.
Therefore, a simple example of a function that abstracts array indexing behavior
could be called be `nth`.
The naive implementation of `nth` is as follows:

```js
function naiveNth(a, index) {
  return a[index];
}
```

As you might suspect,
`nth` operates along the happy path perfectly fine:

```js
naiveNth(letters, 1);
//=> "b"
```

However, the function will fail if given something unexpected:

```js
naiveNth({}, 1);
//=> undefined
```

Therefore, if I were to think about the abstraction surrounding a function `nth`,
I might devise the following statement:
_nth returns located at a valid index within a data type allowing indexed access._
A key part of this statement is the idea of an indexed data type.
To determine if something is an indexed data type,
I can create a function `isIndexed`, implemented as follows:

```js
function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}
```

The function `isIndexed` is also a function providing an abstraction
over checking if a piece of data is a string or an array.
Building abstraction on abstraction leads to the following complete implementation of `nth`:

```js
function nth(a, index) {
  if (!_.isNumber(index)) fail("Expected a number as the index");
  if (!isIndexed(a)) fail("Not supported on not-indexed type");
  if (index < 0 || index > a.length - 1) fail("Index value is out of bounds");

  return a[index];
}
```

The completed implementation of `nth` operates as follows:

```js
nth(letters, 1);
//=> 'b'

nth("abc", 0);
//=> "a"

nth({}, 2);
// Error: Not supported on non-indexed type

nth(letters, 4000);
// Error: Index value is out of bounds

nth(letters, "aaaaa");
// Error: Expected a number as the index
```

In the same way that I built the `nth` abstraction out of an `indexed` abstraction,
I can likewise build a `second` abstraction:

```js
function second(a) {
  return nth(a, 1);
}
```

The `second` function allows me to appropriate the correct behavior of `nth` for a different but related use case:

```js
second(["a", "b"]);
//=> "b"

second("fogus");
//=> "o"

second({});
// Error: Not supported on non-indexed type
```

Another unit of basic behavior in JavaScript is the idea of a comparator.
A comparator is a function that takes two values and returns `<1` if the first is `less` than the second,
`>1` if it is `greater`, and `0` if they are equal.
In fact,
JavaScript itself can appear to use the very nature of numbers themselves to provide a default `sort` method:

```js
[2, 3, -6, 0, -108, 42].sort();
//=> [-108, -6, 0, 2, 3, 42]
```

But a problem arises when you have a different mix of numbers:

```js
[0, -1, -2].sort();
//=>[-1, -2, 0]

[2, 3, -1, -6, 0, -108, 42, 10].sort();
//=> [-1, -108, -6, 0, 10, 2, 3, 42]
```

The problem is that when given no arguments,
The `Array#sort` method does a string comparison.
However, every JavaScript programmer knows that `Array#sort` expects a comparator,
and instead writes:

```js
[2, 3, -1, -6, 0, -108, 42, 10].sort(function (x, y) {
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
});

//=> [-108, -6, -1, 0, 2, 3, 10, 42]
```

That seems better, but there is a way to make it more generic.
After all, you might need to sort like this again in another part of the code,
so perhaps it's better to pull out the anonymous function and give it a name:

```js
function compareLessThanOrEqual(x, y) {
  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}

[2, 3, -1, -6, 0, -108, 42, 10].sort(compareLessThanOrEqual);
//=> [-108, -6, -1, 0, 2, 3, 10, 42]
```

But the problem with the `compareLessThanOrEqual` function is that it is coupled to the idea of "comparatorness" and cannot easily stand on its own as a generic comparison operation:

```js
if (compareLessThanOrEqual(1, 1)) console.log("less or equal");

// nothing prints
```

To achieve the desired effects,
I would need to _know_ about `compareLessThanOrEqual`'s comparator nature:

```js
if (_.contains([0, -1], compareLessThanOrEqual(1, 1)))
  console.log("less or equal");

// less or equal
```

But this is less than satisfying,
especially when there is a possibility for some developer
to come along in the future and change the return value of `compareLessThanOrEqual`
to `-42` for negative comparisons.
A better way to write `compareLessThanOrEqual` might be as follows:

```js
function lessOrEqual(x, y) {
  return x <= y;
}
```

Functions that always return a Boolean value (i.e., `true` or `false` only),
are called _predicates_. So, instead of an elaborate comparator construction,
`lessOrEqual` is simply a "skin" over the built-in `<=` operator:

```js
[2, 3, -1, -6, 0, -108, 42, 10].sort(lessOrEqual);
//=> [100, 10, 1, 0, -1, -1, -2]
```

At this point,
you mgiht be inclined to change careers.
However, upon further reflection,
the result makes sense. If `sort` expects a comparator, and `lessThan` only returns `true` or `false`, then you need to somehow get from the would of the latter to that of the former without duplicating a bunch of `if/then/else` boilerplate.
The solution lies in creating a function, `comparator`, that takes a predicate and converts its result the `-1/0/1` result
expected of `comparator` functions:

```js
function comparator(pred) {
  return function (x, y) {
    if (truthy(pred(x, y))) return -1;
    else if (truthy(pred(y, x))) return 1;
    else return 0;
  };
}
```

Now, the `comparator` function can be used to return a new function
that "maps" the results of the predicate `lessOrEqual` (i.e., `true` or `false`)
onto the results expected of comparators (i.e., `-1`, `0`, or `1`),
as shown in Figure 1-10.

```
image
Figure 1-10. Bridging the gap between two "worlds" using the comparator function
```

In functional programming,
you'll almost always see functions interacting in a way that allows
one type of data to be brought into the world of another type of data.
Observe `comparator` in action:

```js
[100, 1, 0, -1, -2, -1].sort(compartor(lessOrEqual));
//=> [-2, -1, -1, 0, 1, 10, 100]
```

The function `comparator` will work to map any function that returns
"truthy" or "falsey" values
onto the notion of "comparatorness".
This topic is covered in much greater depts in Chapter 4.
but it's worth noting now that `comparator` is a _higher-order function_
(because it takes a function and returns a new function).
Keep in mind that not every predicate makes sense for use with the
`comparator` function, however.
For example, what does it mean to use the `_.isEqual` function as the basis for a `comparator`?
Try it out and see what happens.

Throughout this book,
I will talk about the ways that functional techniques
provied and facilitate the creation of abstractions,
and as I'll discuss ensxt,
there is a beautiful synerge betwee
functions-an-abstraction and data.

## Data as Abstarction

JavaScript's object prototype model is a rich and foundational data scheme.
On its own, the prototype model provides a level of flexibility not found in many other mainstream programming languages.
However, many JavaScript programmers, as is their wont,
immediately sttempts to build a class-based object system using the prototype or closure features (or both).
Although a class system has its strong points,
very often the data needs of a JavaScript application are much simpler than is served by classes.

Instead, using JavaScript bare data primitives,
objects, and arrays, much of the data modeling tasks that are currently served by classes are subsumed.
Historically, functional programming has centered around building building functions that work to achieve higher-level behaviors ans work on very simple data constructs.

In the case of this book (and Underscore itself),
the focus is indeed on processing arrays and objects.
The flexibility in those two simple data types is astounding,
and it's unfortunate that they are often overlooked in favor of yet another class-based system.

Imagine that you're tasked with writing a JavaScript application that deals with comma separated value (CSV) files,
which are a standard way to represent data tables.
For example, suppose you have a CSV file that looks as follows:

```
name,    age,     hair
Merble,  35,      red
Bob,     64,      blonde
```

It should be clear that this data represents a table with three columns (name, age, and hair) and three rows (the first being the header row, and the res being the data rows).
A small function to parse this very constrained CSV representation stored in a string is implemented as follows:

```js
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
```

You'll notice that the function `lameCSV` processes the rows one by one,
splitting at `\n` and then stripping whitespace for each cell therein.
The whole data table is an array of sub-arrays,
each containing strings.
From the conceptual views shown in Table 1-1,
nested arrays can be viewed as a table.

_Table 1-1. Simply nested arrays are one way to abstract a data table_
|name|age|hair|
|Merble|35|64|
|Bob|64|blonde|

Using `lameCSV` to parse the data stored in a string works as follows:

```js
var peopleTable = lameCSV("name,age,hair\nMerble,35,red\nBob,64,blonde");

peopleTable;
//=> [["name", "age", "hair"],
//    ["Merble", "35", "red"],
//    ["Bob", "64", "blonde"]]
```

Using selective spacing highlights the table nature of the returned array.
In functional programming,
functions like `lameCSV` and the previously defined `comparator` are key in translating one datat type into another.
Figure 1-11 illustrates how data transformations in general can be viewed as getting from one "world" into another.

```
images
Figure 1-11. Functions can bridge the gap between two "worlds"
```

There are better ways to represent a table of such data,
but this nested arrays serves us well for now.
Indeed, there is littel motivation to build a complex class hierarchy representing either the table itself,
the rows, people, or whatever.
Instead, keeping the data representation minimal allows me to use existing array fields and array processing functions and methods out of the box.

```js
_.rest(peopleTable).sort();

//=> [["Bob", "64", "blonde"],
//    ["Merble", "35", "red"]]
```

Likewise, since I know the form of the original data,
I can create appropriately named selector functions to access the data in a more descriptive way:

```js
function selectNames(table) {
  return _.rest(_.map(table, _.first));
}

function selectAges(table) {
  return _.rest(_.map(table, second));
}

function selectHairColor(table) {
  return _.rest(
    _.map(table, function (row) {
      return nth(row, 2);
    })
  );
}

var mergeResults = _.zip;
```

The `select` functions defined here use existing array processing functions to provide fluent access to simple data types:

```js
selectNames(peopleTable);
//=> ["Merble", "Bob"]

selectAges(peopleTable);
//=> ["35", "64"]

selectHairColor(peopleTable);
//=> ["red", "blonde"]

mergeResults(selectNames(peopleTable), selectAge(peopleTable));
//=> [["Merble", "35"], ["Bob", "64"]]
```

The simplicity of implementation and use is a compelling argument for using JavaScript's core data structures for data modeling purposes.
That's not to say that there is no place for an object-oriented or class-based approach.
In my experience,
I've found that a functional approach centered around generic collection processing functions is ideal for handling data about people and an object-oriented approach works best for simulating people.

If you are so inclined,
the data table could be changed to a custom class-based model,
and as long as you use the selector abstractions,
then the user would never know,
nor care.
However, throughout this book,
I strive to keep the data needs as simple as possible and build abstract functions
that operate on them.
Constraining myself to functions operating on simple data,
interestingly enough,
increases my flexibility.
You might be surprised how far these funcdamental types will take you.

## A Taste of Function JavaScript
