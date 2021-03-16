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
