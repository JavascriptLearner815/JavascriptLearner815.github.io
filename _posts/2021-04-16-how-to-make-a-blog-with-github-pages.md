---
title: "How to Make a Blog with GitHub Pages"
date: 2021-04-16
---

# How to Make a Blog with GitHub Pages 

My blog isn't really that active, so you may want to start your own, more active one! This post can help you with that, guiding you based on my own personal setup, in order to create a blog with ease! 

_If you prefer to learn visually, check out the video version of this article._ 
<br/> 
<!--- [![TITLE](https://adrotog-yt-embed.herokuapp.com/embed?v=ID)](https://www.youtube.com/watch?v=ID "TITLE") ---> [deleted due to recorder bug, see final result](https://github.com/Example360/blog) 

## Creating the Barebones Blog 

Sadly, you will be alone for this step, and, as of making the video, I didn't know what the updated version of the course was going to be. This post will be updated accordingly if improvising happens. 

In order to create your blog, you need to finish [the GitHub Learning Lab course for making one](https://lab.github.com/githubtraining/github-pages). After you're done, you can come back and really start working on your blog! 

## I Like to Move It, Move It! 

The most important first step to creating your blog is by changing the name to "blog", the description to the description on the blog already, the website link to "https://your-username.github.io/blog/", and the tags to "blog" and nothing else. You can also add topics that you plan to focus on with your blog if you want, as well. 

## Don’t Look Like a Fool 

The following will help your blog not look like it is managed by a fool! 

### Create a `<head>` Element 

When you see this, you're probably thinking: This is supposed to be Markdown, not HTML! Well, yes and no. The real content of your blog is all within Markdown, but that is not the case for what we're using this for. I'll get to the reason just after explaining what to type in. 

Create a new file, then type this into the name text input: `_includes/head.html`. This is exactly for what we need: The `<head>` element! 

Then, just type in this code: 
```html 
<head>
<!-- Default head tags -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="blog-description">
  <link rel="stylesheet" href="{{ "https://your-username.github.io/blog/assets/main.css" | relative_url }}">
  <link rel="alternate" type="application/rss+xml" title="{{ site.title | escape }}" href="{{ "https://your-username.github.io/blog/feed.xml" | relative_url }}">
  <title>blog-name</title>

<!-- Favicon head tag -->
<link rel="apple-touch-icon" sizes="180x180" href="https://your-username.github.io/blog/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="https://your-username.github.io/blog/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="https://your-username.github.io/blog/favicon-16x16.png">
<link rel="manifest" href="https://your-username.github.io/blog/site.webmanifest">
<link rel="mask-icon" href="https://your-username.github.io/blog/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">

<!-- Font -->
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">

<!-- Styling -->
  <style>
    body { font-family: "Merriweather", serif }
  </style>
</head>
``` 

 The reason we're using this is for the following (the rest of the code substitutes for what is being overwritten): 

#### 1. Font 

If you've ever seen [WebDevSimplified's blog](https://blog.webdevsimplified.com), you've probably noticed the font change. That's exactly what I've done with this blog, too, and this `<head>` element is the trick! This is the magical code that's done this: 

```html 
<!-- Font -->
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">

<!-- Styling -->
  <style>
    body { font-family: "Merriweather", serif }
  </style>
``` 

This loads [Google Fonts](https://fonts.google.com), then imports the Merriweather font with this mid-dark boldness. Finally, the styles simply set the global font to that Merriweather one, and makes it fall back to serif if it cannot be used for some reason. 

#### 2. Favicon 

If you've been taking a look at your blog, the "favicon" that is usually right next to it is essentially gone, displaying an ugly """Earth""" favicon. Heck, for this blog, I've used the favicon that I already used for [my "classroom" website](https://javascriptlearner815.github.io/speedothreesixty-classroom/)! This is the magical code that’s done this: 

```html 
<!-- Favicon head tag -->
<link rel="apple-touch-icon" sizes="180x180" href="https://your-username.github.io/blog/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="https://your-username.github.io/blog/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="https://your-username.github.io/blog/favicon-16x16.png">
<link rel="manifest" href="https://your-username.github.io/blog/site.webmanifest">
<link rel="mask-icon" href="https://your-username.github.io/blog/safari-pinned-tab.svg" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">
``` 

This loads your blog's favicon, which you... didn't upload?!? 

##### Uploading the Favicon 

After you save this new file, [visit this website](https://realfavicongenerator.com). Press "Demo with a random image", and scroll all the way down to press "Generate your Favicons and HTML code". Download your ZIP file, then unzip it and upload each file inside of it one-by-one. I actually have used another generator for this blog, but yours can be different than mine, finally! The favicon should now take effect shortly. 

### Update your README.md File 

The inane text that the Learning Lab bot created for you needs to go. Comment out every single line of that file except for the copyright notice like this: 

```markdown 
<!--- Stuff --->
``` 

Now, type under everything you commented out (still keeping the copyright notice at the bottom) with this: 

```markdown 
# blog-name 
blog-description 

## About 

about-blog 
``` 

--- 

:tada: Tada! You no longer look like a fool! 

Also note that you can put a `youtube_username` in your `_config.yml` file, but the link will not work. 

## GitHub Polishing 

This is really simple. Just create these two files: 

`.github/CODEOWNERS`: 

```markdown 
# Code Owner For 42 
* @your-username 
``` 

`.github/PULL_REQUEST_TEMPLATE/content_update.md`: 

```markdown 
_To get your pull request merged, you must complete the following:_
- [ ] Added Keywords if necessary
- [ ] Approving review from Code Owner
- [ ] What This Contributes is properly filled out
- [ ] Why It Should Be Merged is properly filled out
- [ ] Edits are clean and safe-for-work
- [ ] Edits are on-topic to the blog post

***

**What This Contributes:**
<!-- 
Put a description of what this pull request adds. Don't just say "Title". Think about it like a documentation for MongoDB. Not short. Long!
Here's another example of something long: https://github.com/JavascriptLearner815/custom-programming-language/wiki/Console.Logging
-->

**Why It Should Be Merged:**
<!--
Why do these contributions matter?
Are there enough changed?
Is it helpful?
Why shouldn't the original content stay as it was?
-->

**Keywords:**
<!--
https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword
-->
``` 

## Done! 

And that's all you need to know in order to make a blog with [GitHub Pages](https://pages.github.com)! Hope to see you again soon, but for now: Farewell. 
