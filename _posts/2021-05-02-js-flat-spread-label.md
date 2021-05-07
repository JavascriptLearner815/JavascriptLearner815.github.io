---
title: "MyLabel: ...JavaScript.skills.flat(Infinity)"
date: 2021-05-02
---

[prev]: https://javascriptlearner815.github.io/blog/2021/05/01/javascript-basics.html
[next]: https://javascriptlearner815.github.io/blog/2021/05/06/how-to-gamble-food.html

# `MyLabel: ...JavaScript.skills.flat(Infinity)`

[In my previous article,][prev] I forgot some important things I was gonna explain: `Array.flat()` and `...` for arrays. And now I'll even add `MyLabel:` for your own sanity!!

## `Array.flat()`

To start learning about arrays, let's make a simple one:

```javascript
const array = [
  1,
  2,
  [
    3,
    1000000
  ]
]
```

Now, this would be pretty great on its own, but what if we wanted to loop over every value in the array?

We would start with a simple `for... of` loop:

```javascript
for (const item of array) {
  console.log(item)
}
```

Now our console would show this:

```javascript
1
2
[3, 1000000]
```

But looking back at that sentence, this isn't literally EVERY value in the array. The values in the "nested" array (an array nested inside of an array, use context clues there) are still not looped over.

**This is where `Array.flat()` comes in.**

With `Array.flat()`, all we need to do is to supply the levels of nesting to lift the values out of the arrays it finds there on that level:

```javascript
// ...
const refinedArray = array.flat()
// ...
```

This may look a bit confusing, but by default, that value is `1`.

Now, if we repeat that same loop from before again, we'll get this correctly:

```javascript
1
2
3
1000000
```

And if we have even more arrays nested inside of nested arrays, we can increase the number.

**But what if we are constantly updating `array`?**

Then it gets a little tricky. Your first thought would be to get something like `array.highestNestingLevel`, right? Now, something like that would be cool, but sadly, it doesn't exist.

This means you would have to calculate this value yourself, which would be a real pain.

**But there's a better way.**

What if we pass `Infinity` to `Array.flat()`? Now, it might sound just as dumb as questioning if `array.highestNestingLevel` exists in the complicated world of JavaScript, but `Infinity` actually works - and exactly how we expected it to!

```javascript
const array = [
  1,
  2,
  [
    3, // Editing
    [
      1000000,
      1000000000, // Editing
      [
        "handspeak",
        [ // Editing
          "nintendo",
          "speedothreesixty",
          "blog",
          "webdevsimplified",
          "blog"
        ] // More editing
      ] // EDITING EVERYWHERE!!!!
    ]
  ]
] // Who the heck knows how much nesting there is here?!? Millions of people are updating this in commits, and if only one person is, they aren't gonna update the number everytime to test!
const refinedArray = array.flat(Infinity) // :O Heck???
for (const item of refinedArray) { // Testing lines
  console.log(item) // Testing lines
} // Testing lines
```

Okay, I know those comments were a bit... Melodramatic, but they're still mostly true!!!

Now, I'm not gonna go through and show you all of the values in the array, but I'll tell you JavaScript WILL do it!!

## `Array.map()`

Now, I didn't include this in the initial list, but since I explained `Array.flat()`, I'm gonna explain its buddy: `Array.map()`. In fact, they're such best buddies that JavaScript developers added a feature where they go hand-in-hand which I'll explain later.

Let's make a `people` array of objects:

```javascript
const people = [
  { name: "Bob", favoriteNumbers: [ 350, 1, -998001, 998001, -Infinity, Infinity ] },
  { name: "Speedo", favoriteNumbers: [ 360, 998001, -Infinity, Infinity ] },
]
```

Now what if we wanted both Bob's and Speedo's favorite numbers into one array, with each number only appearing once?

`Array.map()` allows us to loop over each item in an array and then turn that into an array of a specific return value. Conventionally, the item's data should be used somewhere for the return value.

Let me explain.

For our `people` array, let's run `Array.map()` on it:

```javascript
// ...
people.map()
```

The next step is to create a function that gives us the data we want.

```javascript
// ...
people.map(p => /* ??? */)
```

What do we want?

We want `favoriteNumbers`, so let's move on.

```javascript
// ...
people.map(p => p.favoriteNumbers)
```

Finally, we set that to be the value of some variable.

```javascript
// ...
const favoriteNumbers = people.map(p => p.favoriteNumbers)
```

But if we run this, we get:

```javascript
[[350, 1, -998001, 998001, -Infinity, Infinity], [360, 998001, -Infinity, Infinity]]
```

I already see two things wrong with this:

1. `favoriteNumbers` is two arrays, since we just combined them together.
1. `998001`, `-Infinity`, and `Infinity` are duplicated.

We can fix problem 1 by running `.flat()` on the result:

```javascript
// ...
const favoriteNumbers = people.map(p => p.favoriteNumbers).flat() // Combine favorite numbers together
```

Now our array looks like this:

```javascript
[350, 1, -998001, 998001, -Infinity, Infinity, 360, 998001, -Infinity, Infinity]
```

Now the duplicates are obvious.

The way to fix these is to use the new ES6 `Set`:

```javascript
// ...
let favoriteNumbers = people.map(p => p.favoriteNumbers).flat() // Combine favorite numbers together
favoriteNumbers = new Set(favoriteNumbers) // Remove duplicates
favoriteNumbers = [ ...favoriteNumbers ] // Convert the Set back into an array
```

And now we (finally) have this result:

```javascript
[350, 1, -998001, 998001, -Infinity, Infinity, 360]
```

## `Array.flatMap()`

For the specific case above, we didn't have to use `.flat(Infinity)`. And so JavaScript developers made `Array.flatMap()` for the specific case above.

Now we can write the solution like this, as well:

```javascript
// ...
let favoriteNumbers = people.flatMap(p => p.favoriteNumbers) // Combine favorite numbers together
favoriteNumbers = new Set(favoriteNumbers) // Remove duplicates
favoriteNumbers = [ ...favoriteNumbers ] // Convert the Set back into an array
```

## `...` for Arrays

In my last example, I used the spread operator (`...`).

**What the heck does that mean?!?**

To understand this, there is a side effect you learning array destructuring, another part of ES6 just like `...`.

OK? OK.

### First, More, Last

Let's say we magically had an array of YouTube comments on a video:

```javascript
const comments = [
  "First :)",
  "Second",
  "LOL",
  "Hi!",
  "S U B B I N G T O W H O E V E R L I K E S T H I S C O M M E N T A N D S U B S M E B A C K",
  "Ban me from your channel",
  "Go die",
  "Last :(",
] // const allows Array.push(), by the way :) <3
```

What if we wanted to get the first and last comments if the array was actually a jumbled mess with classes with loads more properties that bury the message itself, as well as an array of all the other comments for good measure??

**This is where array destructuring comes in.**

Let's do just that!

```javascript
const [ first, ...more ] = comments
```

This uses brackets (`[]`) to indicate destructuring, then has `first`. Since this is the first variable, it has the first comment. `...more` is prepended with `...`, so it is everything else past `first`.

The next thing to do would be to remove the last comment from `more`:

```javascript
const last = more.pop()
```

`more.pop()` removes the last element of itself, which is the last comment, and sets that to the value of `last`.

Now we can log our variables out:

```javascript
console.log(`first=${first}`) // first="First :)"
console.log(`more=${more}`) // more=["Second", "LOL", "Hi!", "S U B B I N G T O W H O E V E R L I K E S T H I S C O M M E N T A N D S U B S M E B A C K", "Ban me from your channel", "Go die"]
console.log(`last=${last}`) // last="Last :("
```

Another amazing thing to note is that `comments` is unchanged:

```javascript
console.log(comments) // ["First :)", "Second", "LOL", "Hi!", "S U B B I N G T O W H O E V E R L I K E S T H I S C O M M E N T A N D S U B S M E B A C K", "Ban me from your channel", "Go die", "Last :("]
```

### Concatenation

Another less-useful feature of `...` is a more readable syntax than:

```javascript
array1.concat(array2).concat(array3).concat(array4).concat(array5)
```

By using `...`:

```javascript
[ ...array1, ...array2, ...array3, ...array4, ...array5 ]
```

### True Clones

Due to pass-by-reference, if I make a clone of an array, I will be editing the cloned array everytime I edit that cloned array.

For example:

```javascript
const a = [1, 2, 3]
const b = a
b.push(4)
// a = [1, 2, 3, 4]
// b = [1, 2, 3, 4]
```

These are NOT true clones, and can cause a lot of bugs in everyone's code.

**Again, this is where array destructuring comes in.**

Let's do the exact same code with `...`:

```javascript
const a = [1, 2, 3]
const b = [ ...a ]
b.push(4)
// a = [1, 2, 3]
// b = [1, 2, 3, 4]
```

### Array-Like Objects Growing Up

This was used in the previous example <3.

Let's imagine we have an ES6 `Set`:

```javascript
const mySet = new Set([
  { name: "Sally", favoriteNumber: 3 },
  { name: "Billy", favoriteNumber: 5 },
])
```

But now what if we want to `map` over the `Set`?

```javascript
const favoriteNumbers = mySet.map(p => p.favoriteNumber) // Uncaught TypeError: mySet.map is not a function
```

This is because a `Set` is not a `typeof array`, and in fact a `typeof object`, since it is an `instanceof Set`, a class. Remember, classes are objects.

However, destructuring is so smart it can convert a `Set` into a normal array:

```javascript
const myArray = [ ...mySet ]
const favoriteNumbers = myArray.map(p => p.favoriteNumber) // [3, 5]
```

This is the trick we used for the YouTube comments: Convert it into a `Set`, then convert it back into an `Array`. Just so you know, `Set` removes duplicates.

(This will link to ES6 `Set`s once I create the blog post for them.)
(This will link to ES6 `Map`s once I create the blog post for them.)

### Destructuring Returns

Let's make an almost-useless function that takes an object with two properties - `a` and `b` - and returns those values of theirs:

```javascript
function twoProperties({a,b}){
  return [a,b]
}
```

This uses object destructuring (will link to blog post once I create it) to get the values of the properties `a` and `b` of an object provided.

Array destructuring can help split these into specific variables.

Let's do this!

```javascript
const object = { a: "Apple", b: "Butt" }
const [ a, b ] = twoProperties(object)
// a = "Apple"
// b = "Butt"
```

This creates an object wherein `a` is `"Apple"` and `b` is... `"Butt"`.

## `MyLabel:`

Labels are most useful for loops, so let's use those.

```javascript
const array1 = [1, 2, 3]
const array2 = [ ...array1, 4, 5, 6 ]
for (const i of array1) {
  if (i === 2) {
    for (const j of array2) {
      if (j === 6) {
        console.log("HA!")
        break
      } else { console.log("HO!") }
    }
  } else { console.log("HEY!") }
}
```

What you'll get is this:

```javascript
"HEY!"
"HO!"
"HO!"
"HO!"
"HO!"
"HO!"
"HA!"
```

Except that's not what you'll get.

You'll actually get this:

```javascript
"HEY!"
"HO!"
"HO!"
"HO!"
"HO!"
"HO!"
"HA!"
"HEY!"
```

This is because we are only `break`ing the second loop, which means for the last element of `array1`, `3`, we'll get an icky, lingering `"HEY!"`.

To fix this, we can literally LABEL the loop! (If you're like me, you've seen in your text editor "Unused label" at some point when you've messed around with your code. I was completely bemused until [WebDevSimplified](https://youtube.com/c/WebDevSimplified) saved me.)

Let me show you:

```javascript
const array1 = [1, 2, 3]
const array2 = [ ...array1, 4, 5, 6 ]
loop: for (const i of array1) {
  if (i === 2) {
    for (const j of array2) {
      if (j === 6) {
        console.log("HA!")
        break loop
      } else { console.log("HO!") }
    }
  } else { console.log("HEY!") }
}
/*
"HEY!"
"HO!"
"HO!"
"HO!"
"HO!"
"HO!"
"HA!"
*/
```

This labels the main loop as `loop`. Then our `break` statement is linked to `loop`, which contains our second loop, too. So when we reach our `"HA!"`, it breaks everything down.

## Conclusion

These topics are not taught in commonplace and are essential for you to even look like a developer. Soon, if you learn to think like a developer (which I probably will explain in more essay-based detail in another, far-in-the-future blog post), your code will start to look professional and actually look easy-to-read for anyone, especially by using small functions that have understandable names for everyone with all of this complex code still being compact in them.

*If you have any additional ideas for blog posts, please email me at [deanlovesmargie@gmail.com](mailto:deanlovesmargie@gmail.com).* `&&` - with that out of the way - `console.log("farewell, and have a great day!")`.

[< JavaScript Basics][prev] | [How to Gamble Food >][next]
