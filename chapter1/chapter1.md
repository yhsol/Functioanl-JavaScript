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
