---
title: "Understanding promise objects"
date: "2021-12-12"
description: "What they are, how they are created and used, with examples."
---

Note: This article assumes familiarity with JavaScript in general.

## Table of contents:

- [How to create a promise?](#how-to-create-a-promise)
- [What is actually a promise?](#what-is-actually-a-promise)
- [Changing the state and result of promises](#changing-the-state-and-result-of-promises)
- [How to use a promise?](#how-to-use-a-promise)
- [A more realistic example](#a-more-realistic-example)
- [Further reading](#further-reading)
- [Feedback](#feedback)


<a id="how-to-create-a-promise"></a>
## How to create a promise?

We can create a promise with the Promise constructor:

```jsx
// example 1

function foo() {} // We can rename "foo"  however we like.

const myPromise = new Promise(foo) // Creates a promise.
```

The constructor expects one argument in the form of a function to initialize a promise. The specifications gave this function the name "executor".

In example 1, we have passed an executor that does nothing (the function's body is empty), still, the constructor successfully creates a promise. 

If nothing, or anything other than a function is passed, we get a type error:

```jsx
// example 2

const myPromise = new Promise() // Type error since nothing is passed.
```

However, to create a useful promise, we probably want to pass an executor to the constructor that does something useful. We will do just that at the end of this post, but first, let's develop a better sense for what a promise actually is.

<a id="what-is-actually-a-promise"></a>
## What is actually a promise?

According to the ECMAScript Language Specification:

> A Promise is an object that is used as a placeholder for the eventual results of a deferred (and possibly asynchronous) computation.

Do not let the language specification's use of "Promise", with a capital letter "P" confuse you. It does not refer to the Promise constructor (constructors are usually capitalized), it refers to an instance (which we normally do not capitalize). Think of "Promise" in the quote from the specification as "myPromise" in example 1.

So a promise is an object.

More specifically, it is an instance of the Promise constructor or Promise type, if you will.

It has properties and methods like any other object. 

If we console.log a promise, we can take a look at the anatomy of the object:

```jsx
// example 3

const myPromise = new Promise(() => {})

console.log(myPromise)
```

We see that 3 properties live directly on each instance of a Promise. In chrome, they are called "Prototype" (we will get to this later),  "PromiseState" and "PromiseResult".

We can think of the "PromiseState" and "PromiseResult" properties as the actual "placeholders"  the specification is referring to in a more abstract manner. Both properties are internal, i.e. inaccessible or not meant to be accessed by us directly.

Their initial values are "pending" and "undefined", respectively. 

Now take a look at this example:

```jsx
// example 4

function executor() {
  /**
   * We may do some "computation".
   * 
   * ...
   * 
   * Once we are finished,
   * we may mutate the properties of the promise object
   * to reflect the result of the computation.
   **/
}

const myPromise = new Promise(executor)
```

The "computation" the language specification refers to is the code we write in our executor (see example 4).

And basically, the purpose of each promise object is to:

1. Allow us to reflect the result of our computation in its properties ("PromiseState" and "PromiseResult")
2. Provide methods to schedule function calls for the time after a change in its state.

We will discuss the second point and how to use the methods (*Promise.prototype.then*, *Promise.prototype.catch*, *Promise.prototype.finally*) very soon, but only after looking at some examples of how the properties (state and result) of a promise can be mutated.

<a id="changing-the-state-and-result-of-promises"></a>
## Changing the state and result of promises

We still won't do any computations in our executor - although without it, promises are kind of useless. However, to mutate the properties of a promise, we don't actually need any computation. We just have to call either the first or the second argument of an executor.

Let's see some examples!

Neither function is called:

```jsx
// example 5

function executor() {}

const myPromise = new Promise(executor)

console.log(myPromise) // state: "pending", result: undefined
```

Call the first function without arguments:

```jsx
// example 6

function executor(fulfill) {
  fulfill()
}

const myPromise = new Promise(executor)

console.log(myPromise) // state: "fulfilled", result: undefined
```

Call it with a number:

```jsx
// example 7

function executor(fulfill) {
  fulfill(9)
}

const myPromise = new Promise(executor)

console.log(myPromise) // state: "fulfilled", result: 9
```

The result could be an object:

```jsx
// example 8 

function executor(fulfill) {
// We could pass an object:
  fulfill({word: 'discombobulate', frequency: 'rare'})
}

const myPromise = new Promise(executor)

console.log(myPromise) // state: "fulfilled", result: {word: 'discombobulate', frequency: 'rare'}
```

Call our reject function without arguments:

```jsx
// example 9 

function executor(fulfill, reject) {
  reject()
}

const myPromise = new Promise(executor)

console.log(myPromise) // state: "rejected", result: undefined
```

Call our reject function with a number:

```jsx
// example 10 

function executor(fulfill, reject) {
  reject(11) // We could pass a number, if we wanted
}

const myPromise = new Promise(executor)

console.log(myPromise) // state: "rejected", result: 11
```

Usually we call our reject function with an Error object:

```jsx
// example 11

function executor(fulfill, reject) {
  reject(new Error('My error message.')) // Usually an Error object is passed
}

const myPromise = new Promise(executor)

console.log(myPromise) // state: "rejected", result: error object
```

Note: we may replace "fulfill" and "reject" with any name we want.

<a id="how-to-use-promises"></a>
## How to use promises

If you recall from earlier, all instances of Promise also have a "Prototype" property. This is where the methods shared by all instances live. We are interested in *Promise.prototype.then*, *Promise.prototype.catch* and *Promise.prototype.finally*.

Take a look at this example:

```jsx

// example 12

function executor(fulfill, reject) {
  setTimeout(() => {
    const computation = "apple" === "apple"

    if (computation) {
      fulfill("Successful")
    } else {
      reject("Failed")
    }
  }, 3000)
}

const myPromise = new Promise(executor)

setTimeout(() => {
  console.log('promise state after 1s: ', myPromise)
  // state: "pending", result: undefined
}, 1000)

setTimeout(() => {
  console.log('promise state after 5s: ', myPromise)
  // state: "fulfilled", result: "Successful"
}, 5000)
```

Here, we use *setTimeout* to pretend doing some computation for 3 seconds, and then the function passed to *setTimeout* is run. For this example, the result is always true, which always satisfies our *if* condition, therefore we always call *fulfill* with the string "Successful".

What is interesting about the above, is how we log myPromise twice (after 1 second and after 5 seconds).

Look at the state and the result: they change. As you might expect, since we call *fulfill* with a string, to change the state and the result.

It would be tedious and arbitrary to check like this whether our program has finished computing yet. Also, how do we access something like the result of the computation?

Luckily, promise objects have methods to come to our rescue!

Let's see how they work.

```jsx
// example 13

function executor(fulfill, reject) {
  setTimeout(() => {
  const computation = "apple" === "apple"

    if (computation) { // Satisfies the condition
      fulfill("Successful") // Do this.
    } else {
      reject("Failed")
    }
  }, 3000)
}

const myPromise = new Promise(executor)

myPromise.then(
  (result) => console.log(result),
  (error)=>console.log(error)
)
```

And with a slight modification, to always call the second argument of the executor:

```jsx
// example 14

function executor(fulfill, reject) {
  setTimeout(() => {
  const computation = "apple" === "orange"

    if (computation) { // Fails to satisfy the condition.
      fulfill("Successful")
    } else {
      reject("Failed") // Do this.
    }
  }, 3000)
}

const myPromise = new Promise(executor)

myPromise.then(
  (result) => console.log(result),
  (error)=>console.log(error)
)
```

With the *Promise.prototype.then* method we can schedule function calls ("callbacks") for the time after the promise's state changes.
Not only that, it also allow accesss to the object's result property via the optional argument of the callback.

In more detail:

*Promise.prototype.then* can take two callback functions.

Depending on which state the promise ends up in, either the first or the second callback is run.

- The first callback is run if the promise's state changes to "fulfilled". It can take one argument. This argument takes the value we have passed to the first function of our executor. In example 13, it is the a string saying "Successful".

- The second callback is run if the promise's state changes to "rejected". It can also take one argument, but this argument takes the value we have passed to the second function of our executor. In example 13, it is the a string saying "Failed".

Now take a look at this example:

```jsx
// example 15

function executor(fulfill, reject) {
  setTimeout(() => {
  const computation = "apple" === "orange"

    if (computation) { // Fails to satisfy the condition.
      fulfill("Successful")
    } else {
      reject("Failed") // Do this.
    }
  }, 3000)
}

const myPromise = new Promise(executor)

myPromise.then(
  (result) => console.log(result),
).catch((error)=>console.log(error))
```

This does something similar to the previous example.

*Promise.prototype.catch* gives us an opportunity to handle or "catch" any problematic promises (i.e. promises with a "rejected" state). 
I suggest looking at these examples to see how this compares to handling problems with *Promise.prototype.then*:

[https://stackoverflow.com/questions/40067852/in-a-promise-whats-the-difference-between-using-catch-and-the-2nd-argument-of](https://stackoverflow.com/questions/40067852/in-a-promise-whats-the-difference-between-using-catch-and-the-2nd-argument-of)


Now take a look at this example:

```jsx
// example 16

function executor(fulfill, reject) {
  setTimeout(() => {
  const computation = "apple" === "orange"

    if (computation) { // Fails to satisfy the condition.
      fulfill("Successful")
    } else {
      reject("Failed") // Do this.
    }
  }, 3000)
}

const myPromise = new Promise(executor)

myPromise.then(
  (result) => console.log(result)
).catch(
  (error) => console.log(error)
).finally(
  () => console.log("Clean things up.")
)
```

*Promise.prototype.finally* allows us to schedule a callback that always runs if the promise is settled, meaning, if its state becomes "fulfilled" or "rejected".

It is important to note that all 3 methods discussed here (*Promise.prototype.then*, *Promise.prototype.catch*, *Promise.prototype.finally*) return a promise, which makes it possible to chain them.

<a id="a-more-realistic-example"></a>
## A more realistic example

As MDN points out:

> The Promise constructor is primarily used to wrap functions that do not already support promises.

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

The article also gives this example:

```jsx
// example 17

function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  });
}
```

Based on what we have learned so far, what does this code do? We don't have to understand each bit of code, but in essence:

1. A call to myAsyncFunction returns a new promise object.
2. The executor function, as we have discussed, has two arguments, resolve and reject.
3. In the executor's body, we do our "computation":
    1. We prepare a GET request by creating an XHR object.
    1. We get ready to call resolve with the response to the GET request, in case the request is successful.
    1. We get ready to call reject with the response status of the GET request, in case the request encounters an error.
    1. Dispatch the request to the server.

And this is how we might use this function (with *Promise.prototype.then*, as discussed earlier):

```jsx
// example 18

function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  });
}

const myPromise = myAsyncFunction("https://catfact.ninja/fact")

myPromise.then(
  (result) => console.log(result),
  (error) => console.log(error)
)
```

<a id="further-reading"></a>
## Further reading

We arrived to the end of this post, I will finish with some addition reading material:

[https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

How to use an XHR object without "promisification":

[https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

We don't actually need to promisify requests since there is a new API for fetching resources with promise capabilities out of the box:

[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

<a id="feedback"></a>
## Feedback

There is more to promises, but I didn't want to make this post  longer. 

In my opinion, the terminology around promises can be a bit confusing - I hope I did not add more to it.

I don't have a comments section, but you can open an [issue on github](https://github.com/andrasna/gatsby-theme-andras/issues), or send me an email, to ask questions, suggest changes and what have you.