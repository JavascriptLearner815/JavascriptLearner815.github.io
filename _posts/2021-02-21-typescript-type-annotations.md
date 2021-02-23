---
title: "TypeScript Type Annotations"
date: 2021-02-21
---
[typescript]: https://www.typescriptlang.org/
[typeAnnotations]: https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html#type-annotations
# TypeScript Type Annotations
In [TypeScript][typescript], [type annotations][typeAnnotations] allow you to force anything's data type to be what you choose. If its data type is *not* the one 
you specify, the console will throw an error.
## Example
Here's an example:
```typescript
function remainder(dividend: number, divisor: number) {
    return dividend % divisor;
}
const variableOne = ["Hello", "World"];
const variableTwo = [12, "Hello World"];
const variableThree = [5, 2];
const remainderOne = remainder(variableOne[0], variableOne[1]);
const remainderTwo = remainder(variableTwo[0], variableTwo[1]);
const remainderThree = remainder(variableThree[0], variableThree[1]);
const results = [remainderOne, remainderTwo, remainderThree];
for (const result of results) {
    if (isNaN(result)) {
        continue;
    }
    console.log(result);
}
```
The console should output something like this:
```console
TypeError: Argument of type 'string' is not assignable to parameter of type 'number'.
TypeError: Argument of type 'string | number' is not assignable to parameter of type 'number'. 
TypeError: Type 'string' is not assignable to type 'number'.
```
## Pros and Cons
### Pros
- Ensures that you get the data type you want
- Short
- Easy to understand
- Provides a nice interface in IDEs
### Cons
- Throws an error if it gets a different data type
- Continues code execution
## Caveats
If the data type is not the one you specify, TypeScript will throw an error. To handle this, you can use a try/catch:
```typescript
function remainder(dividend: number, divisor: number) {
    return dividend % divisor;
}
try {
    const result = remainder("Some Random Text", 123);
    console.log(`The result is ${result}.`);
} catch {
    console.log("Wrong data type.");
}
```
Even if the data type is not the one you specify, the code will continue to execute. To handle this, you can use `typeof`:
```typescript
function remainder(dividend: number, divisor: number) {
    if (typeof dividend === 'number' || typeof divisor === 'number') {
        const response = dividend % divisor;
        /* if (!Number.isNaN(response)) */ return response;
    }
}
try {
    const result = remainder("Some Random Text", 123);
    console.log(`The result is ${result}.`);
} catch {
    console.log("Wrong data type.");
}
```
