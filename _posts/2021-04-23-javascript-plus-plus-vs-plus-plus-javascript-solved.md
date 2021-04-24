---
title: "(JavaScript++ && ++JavaScript) && console.log('Solved')"
date: 2021-04-23
---

[WDS]: https://www.youtube.com/c/WebDevSimplified/videos

# (JavaScript++ && ++JavaScript) && console.log('Solved')

Here's some JavaScript code for ya:

```javascript
function f(x) {
  x++
  (x = x - 3) && ++x
  return x--
}

f(2) // 0
```

Think the code runs like this?

```javascript
function f(x) { // 2
  x++ // 3
  (x = x - 3) /* 0 */ && ++x // 1
  return x-- // 0
}

f(2) // 0
```

Right? WRONG!

The code actually runs like this:

```javascript
function f(x) { // 2
  x++ // 3
  (x = x - 3) /* 0 */ && ++x // 0
  return x-- // 0, but x is now actually -1
}

f(2) // 0
```

In this article, I will show you why this happens, and the differences between `x++` and `++x`. (It's a very important topic in JavaScript, so listen up!)

(This code was made by [WebDevSimplified][WDS] for _Who Wants To Be A Megabit_.)

## Definitions

### `x++`

Using `x++` returns the current value of `x`, and _then_ increments it by 1.

### `++x`

Using `++x` increments it by 1, and _then_ returns the new value of `x`.

## Examples

Let's back up from that big example a little bit.

**_I mean, a lot._**

Let's say you were making a function that increments `x` and sets `y` to the same value.

Let's try to make this with `x++`:

```javascript
let x = 360;
let y;

function incrementXAndSetToY(x, y) {
  y = x++
}

incrementXAndSetToY(x, y)
```

Now, you would expect `x` to be `361`, and `y` to also be `361`, right?

WRONG!

If you try logging these variables out to the console, you would get this result:

```javascript
console.log(x) // 361
console.log(y) // 360
```

This is because, by definition, `x++` returns the value of `x` _before_ incrementing, which in this case is the initial declaration, `360`, and then we are setting `y` to equal that.

Now, we could write the function like this:

```javascript
let x = 360;
let y;

function incrementXAndSetToY(x, y) {
  x++
  y = x
}

incrementXAndSetToY(x, y) // Now both x and y are set to 361
```

...But there is a better way, a better practice.

Just use `++x`:

```javascript
let x = 360;
let y;

function incrementXAndSetToY(x, y) {
  y = ++x
}

incrementXAndSetToY(x, y) // Now both x and y are set to 361
```

Now, by just changing the position of `++` relative to `x`, we have now narrowed down this code to almost exactly the same thing as the start - only that it fits on one line and looks nicer to intermediate developers.

## Back to the Big Boi

With our new knowledge, let's break down the "big boi code" step-by-step:

```javascript
function f(x) { // 3
  x++ // 3 /*<
^^^^^^^^^^^^^^*/
  (x = x - 3) /* 0 */ && ++x // 0
  return x-- // 0, but x is now actually -1
}

f(2) // 0
```

This increments `x` by 1, so with the value we passed in, `2`, `x` is now `3`.

```javascript
function f(x) { // 3
  x++ // 3
  (x = x - 3) /* 0 */ && ++x // 0 /*<
^^^^^^^^^^^^^^*/
  return x-- // 0, but x is now actually -1
}

f(2) // 0
```

This does TWO things.

First, we set `x` to its current value, `3`, minus `3`, which is `0`.

Second, we append an `&&` after that and increment `x` with `++x`. This would set `x` to `1` now, however, when we set `x` to `0`, that assignment returned the new value of `x`, `0`, which is a falsy value. Thus, the `&&` "short-circuits" and doesn't run. (I may write another article about this soon, possibly tomorrow.)

So, the value of `x` is now `0`.


```javascript
function f(x) { // 3
  x++ // 3
  (x = x - 3) /* 0 */ && ++x // 0
  return x-- // 0, but x is now actually -1 /*<
^^^^^^^^^^^^^^*/
}

f(2) // 0
```

This requests a `return` statement be run, and DECREMENTS `x` with `x--`.

However, by definition, `return` returns from the function and makes its value equal the value of the expression after the `return` statement, or `undefined` if there is none or there is a newline (due to ASI, again, may also write another article about this soon). Remember, `x--` returns the value of `x` _before_ decrementing. Thus, the `return` statement exits the function with the value `0`. Then the `f(2)` line is just running the functions with our already-factored-in value of `2`, which returns the value of `0`.

(NOTE: If the value of `x` was able to emerge, it would correctly be `-1`, due to the definition from above, obviously.)

## Conclusion

`x++` vs. `++x` is a very common topic covered pretty much anywhere, but is crucial for beginners getting stuck trying to learn intermediate developers' code containing this kind of amazing, vital knowledge. If you ever try to apply for a Developer job in JavaScript and don't know the difference between `x++` and `++x`, that's going to be an immediate red flag to them as this is very simple and necessary knowledge to need on your résumé.

Thanks for reading (and blogging with GitHub Pages et. al.), and have a great day!
