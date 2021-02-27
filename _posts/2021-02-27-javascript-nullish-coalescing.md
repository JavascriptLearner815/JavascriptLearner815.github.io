---
title: "JavaScript Nullish Coalescing"
date: 2021-02-27
---

# JavaScript Nullish Coalescing

Nullish coalescing is represented by `??`. It comes in place of `||`'s usage, but is a little different. Unlike `||`'s check for a false value to revert to the next value specified, `??` fallbacks to the value after it if the value before it is either equal to null or equal to undefined, nothing else.

## Why You Want to Use It

Nullish coalescing has a huge purpose for some JavaScript functions. Say you have the following function:

```javascript
function calculatePrice(price, taxes, description) {
  taxes = taxes ?? 0.05
  description = description ?? "Default item"
  const total = price * (1 + taxes)
  console.log(`${description} With Tax: $${total}`)
}
```

If you passed 0 because there were no taxes using the OR operator instead of the nullish coalescing operator, it would assume you forgot to pass the taxes although you meant there were no taxes and execute with that default value.

## Caveats

### Other Devs

If you don't contact other devs about the nullish coalescing, they might get confused about your code. You should a comment at the top of your code explaining nullish coalescing like this, or contact them:

```javascript
// THE ?? OPERATOR IS CALLED NULLISH COALESCING, IT CHECKS FOR EITHER NULL OR UNDEFINED ON THE EXPRESSION BEFORE AND IF THAT CHECK RETURNS TRUE, FALLS BACK TO THE EXPRESSION AFTER.
```

## Pros and Cons

### Pros

- Shorter way to check for null or undefined
- Flaunt your JavaScript knowledge

### Cons

- Difficult to be cognizant of without a comment or contact
- Not supported in all browsers
