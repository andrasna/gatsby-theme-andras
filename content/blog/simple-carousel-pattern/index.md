---
title: "A simple carousel pattern"
date: "2021-10-21"
description: "A practicable carousel pattern without external dependencies."
---

One pattern for carousels I like a lot and see often is this:

- Have a previous and a next button
- Have a horizontal scrollbar (sometimes only visible on hover)

I think this creates a decent user experience, and we don't have to depend on external CSS and JS to do it.

You can check out an example I have created for fun (not made for production):

https://codepen.io/andrasnagy/pen/bGrwLGe

*At the time of writing this, you can go to [nike.com](https://www.nike.com/us/en/) or [amazon.com](https://www.amazon.com/) for real-world implementations of this pattern.*

I particularly like how we often have a partially visible item, which serves as a hint for the user that there are more items and therefore some kind of an action needs to be performed, scroll or press a button in our case.

It is fairly straightforward how we can define these partially visible items for any breakpoint with CSS grid or flexbox.

This example uses a few lines of JavaScript for the previous and next buttons, but the carousel is fully functional even without JavaScript.

For a css-only solution (including control buttons), I recommend checking out this article: https://css-tricks.com/css-only-carousel/
