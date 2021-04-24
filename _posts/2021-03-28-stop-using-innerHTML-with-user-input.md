---
title: "Stop Using InnerHTML with User Input"
date: 2021-03-28
---
[prev]: https://javascriptlearner815.github.io/blog/2021/03/19/using-the-a-minecraft-struggle-api.html
[next]: https://javascriptlearner815.github.io/blog/2021/04/02/remembering-morse-code.html
# Stop Using `InnerHTML` with User Input

## Why?

**Security.**

Let's say you have an input-based navigation system like so:

`index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bob's Books</title>
    <link rel="stylesheet" href="main.css">
    <script defer src="script.js"></script>
  </head>
  <body>
    <header>
      <h1>Bob's Books</h1>
    </header>
    <hr>
    <main>
      <div id="default">
        <p><i>Where would you like to go?</i></p>
        <input id="location" type="text" placeholder="Where would you like to go?">
        <button id="go">Go!</button>
      </div>
      <div id="result" hidden>
        <!-- ... -->
        <!-- Elements with spans for things like name, image, etc. that have IDs handled in script -->
      </div>
    </main>
    <hr>
    <footer>
      This Project Is Under The MIT License.
    </footer>
  </body>
</html>
```

`main.css`:

```css
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* ... */
```

`script.js`:

```javascript
// ...
// <span>.innerHTML = <requestedLocation>;
```

Now, this would be great, right? ... Not so much.

***If a malicious person wanted to execute scripts messing with databases, importing scripts, etc., they would type something like this:***

```html
<script>function goodbyeBob(){/*...*/}</script><img src onerror="goodbyeBob()"/>
```

And, since `innerHTML` allows HTML, all of that malicious JavaScript code would get executed heartily.

## How To Fix

Change all references to `innerHTML` from user-input to `innerText`. If you want SOME HTML features to be able to be entered by the user and executed (preferrably filtered), use `.replace()`, `if ... else`, guard clauses, etc.

[< Using the A Minecraft Struggle API][prev] | [Remembering Morse Code >][next]
