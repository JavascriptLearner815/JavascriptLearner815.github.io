---
title: "false && console.log('JavaScript Short-Circuiting')"
date: 2021-04-24
---

[prev]: https://javascriptlearner815.github.io/blog/2021/04/23/javascript-plus-plus-vs-plus-plus-javascript-solved.html

# `false && console.log('JavaScript Short-Circuiting')`

If I gave you this code:

```javascript
x = 0 && console.log("Hi")
```

...You may be surprised to see the following output:

```javascript

```

Yes. Literally - Nothing.

Better yet, see this code:

```javascript
x = 1 || console.log("Hi") // 
```

Still nothing.

***What the heck is going on?***

Let me show you - Just keep on reading!

## What Is Short-Circuiting?

Short-circuiting is when you use a logical operator, e.g. `&&` or `||`, that doesn't check its second value.

...Let me explain.

Let's say, for some reason, the logical `&&` operator "short-circuited".

This is what I'd be meaning:

```javascript
console.log("Hi") /* Imagine this "short-circuiting" the code */ && console.log("Howdy") // "Hi"
```

Same goes for the logical `||` operator:

```javascript
console.log("Hi") /* Imagine this "short-circuiting" the code */ || console.log("Howdy") // "Hi"
```

### When Does It Happen?

Now that we understand (or at least, hopefully) what short-circuiting means, let's take a look at when it happens.

#### For `&&`

- If the first value is truthy, check the second value.
  - If the second value is truthy, return `true`.
  - If the second value is falsy, return `false`.
- If the first value is falsy, return `false` **and exit immediately**.

Woah, woah, woah, stop!

This is what the "first" and "second" values are:

```javascript
x /* first value */ && y // second value
```

Let's test every single thing in this simplified spec:

##### 1. First Value Is Truthy

###### 1.1. Second Value Is Truthy

```javascript
true && true
```

This checks if `true` is truthy, which it (obviously) is. Then it checks the next value, `true`, for truthiness, and it (again, obviously), is.

Then it just returns `true`. Using `||` would short-circuit here and return `true`, as we'll explain shortly after this set of examples for `&&`.

###### 1.2. Second Value Is Falsy

```javascript
true && false
```

This checks if `true` is truthy, which it (obviously) is. Then it checks the next value, `false`, for truthiness, and it (obviously), ISN'T.

Then it just returns `false`. However, `||` would also short-circuit here and return `true` as well, as we'll explain shortly after this set of examples for `&&`.

##### 2. First Value Is Falsy

```javascript
false && whatever
```

This checks if `false` is truthy, which it (obviously) ISN'T.

Then it short-circuits here and returns `false`. However, `||` would check the second value here, as we'll explain shortly after this.

#### For `||`

- If the first value is truthy, return `true` **and exit immediately**.
- If the first value is falsy, check the second value.
  - If the second value is truthy, return `true`.
  - If the second value is falsy, return `false`.


Woah, woah, woah, stop!

This is what the "first" and "second" values are:

```javascript
x /* first value */ || y // second value
```

Let's test every single thing in this simplified spec:

##### 1. First Value Is Truthy

```javascript
true || whatever
```

This checks if `true` is truthy, which it (obviously) is.

Then it short-circuits here and returns `true`. However, `&&` would check the second value here, as we explained before this.

##### 2. First Value Is Falsy

Using `&&` would short-circuit here and return `false`, as we explained before this.

###### 2.1. Second Value Is Truthy

```javascript
false || true
```

This checks if `false` is truthy, which it (obviously) ISN'T. Then it checks the next value, `true`, for truthiness, and it (obviously), is.

Then it just returns `true`.

###### 2.2. Second Value Is Falsy

```javascript
false || false
```

This checks if `false` is truthy, which it (obviously) ISN'T. Then it checks the next value, `false`, for truthiness, and it (again, obviously), ISN'T.

Then it just returns `false`.

## Relating To The Previous Article

[In my previous article,](https://javascriptlearner815.github.io/blog/2021/04/23/javascript-plus-plus-vs-plus-plus-javascript-solved.html) I showed this code that was made by [WebDevSimplified](https://www.youtube.com/c/WebDevSimplified/videos) for *Who Wants To Be A Megabit*:

```javascript
function f(x) { // 2
  x++ // 3
  (x = x - 3) /* 0 */ && ++x // 0
  return x-- // 0, but x is now actually -1
}

f(2) // 0
```

Let's look at line 3:

```javascript
function f(x) { // 2
  x++ // 3
  (x = x - 3) /* 0 */ && ++x // 0 /*<
^^^^^^^^^^^^^^*/
  return x-- // 0, but x is now actually -1
}

f(2) // 0
```

As you can see from the comment from the before line, `x` is currently `3`. Then, in parentheses, `x` is now being set to `x - 3`. `x` is currently `3`, so it is evaluating `3 - 3`, which evaluates to `0`.

Then we `&&` an increment to `x` via `++x`. However, the assignment operator (`=`) returns the new value of `x`. Since the new value of `x` is a falsy value, `0`, the `&&` short-circuits and exits immediately before incrementing `x` via `++x`.

## Using Short-Circuiting For Compactors

Almost all JavaScript compactors use this hack to save 2 bytes:

```javascript
if(cond)console.log("Hi")
```

TO:

```javascript
cond&&console.log("Hi")
```

## Conclusion

`&&` and `||` short-circuiting is a very popular JavaScript topic (although `||` short-circuiting being far less popular) but almost no beginner developer knows about it and it is crucial if you are making a JavaScript compactor.

Again, this is a very simple and necessary thing to have on your résumé.

*[If you have any additional ideas for blog posts, please email me at deanlovesmargie@gmail.com.](mailto:deanlovesmargie@gmail.com)* `&&` - with that out of the way - `console.log("farewell, and have a great day!")`

[< `(JavaScript++ && ++JavaScript) && console.log('Solved')`][prev] | `break`
