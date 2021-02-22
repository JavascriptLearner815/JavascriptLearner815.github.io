---
title: "Simplify Your JavaScript Code"
date: 2021-02-21
---
# Simplify Your JavaScript Code
## Bad Practices
### Changing Prototypes of Built-in Objects
You may have made a function on the `String` object prototype before similar to this:
```javascript

String.prototype.reverse = (() => {
  // stuff like this.toString(), etc.
});

```
This is bad practice, however. You should instead use this:
```javascript

function reverse(string) {
  // stuff like string.toString(), etc.
}

```
### Useless Else-If
Let's say you had a function like this:
```javascript

function isZero(number) {
  if (number === 0) {
    return true;
  } else if (number !== 0) {
    return false;
  }
}

```
There's a bad practice here. Can you spot it?

If you said that the else-if can be changed into an else, you'd be correct! If the check before hadn't run, we know the number isn't 0, so we don't need to check that after we already know that the number isn't 0.

Our function would now be:
```javascript

function isZero(number) {
  if (number === 0) {
    return true;
  } else {
    return false;
  }
}

```
