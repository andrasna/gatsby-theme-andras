---
title: "Understanding promise objects"
date: "2021-12-12"
description: "What they are, how they are created and used, with examples."
---

*Note: This article assumes familiarity with JavaScript in general. You might want to refresh your memory on [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) in particular.*

Table of contents:

- [How to create a promise?](#how-to-create-a-promise)
- [What is actually a promise?](#what-is-actually-a-promise)
- [Changing the state and result of promises](#changing-the-state-and-result-of-promises)
- [How to use promises](#how-to-use-promises)
- [A more realistic example](#a-more-realistic-example)
- [A few words about asynchronicity](#a-few-words-about-asynchronicity)
- [How to use promises with async and await?](#how-to-use-promises-with-async-and-await)
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

The constructor expects one argument in the form of a function to initialize a promise. The specification gave this function the name "executor".

In *example 1*, we have passed an executor that does nothing (the function's body is empty), still, the constructor successfully creates a promise.

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

Do not let the language specification's use of "Promise", with a capital letter "P", confuse you. It does not refer to the Promise constructor (constructors are usually capitalized), it refers to an instance (which we normally do not capitalize). Think of "Promise" in the quote from the specification as "myPromise" in *example 1*.

So a promise is an object.

More specifically, it is an instance of the Promise constructor or Promise type, if you will.

It has properties and methods like any other object.

If we console.log a promise, we can take a look at the anatomy of the object:

```jsx
// example 3

const myPromise = new Promise(() => {})

console.log(myPromise)
```

We see 3 properties live directly on each instance of a Promise. In chrome, they are called "Prototype" (we will get to this later),  "PromiseState" and "PromiseResult".

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

The "computation" the language specification refers to is the code we write in our executor (see *example 4*).

And basically, the purpose of each promise object is to:

1. Allow us to reflect the result of our computation in its properties ("PromiseState" and "PromiseResult").
2. Provide methods to schedule function calls ("callbacks") for the time after a change in its state.

We will discuss the second point and how to use the methods (*Promise.prototype.then*, *Promise.prototype.catch*, *Promise.prototype.finally*) very soon, but only after looking at some examples of how the properties (state and result) of a promise can be mutated.

<a id="changing-the-state-and-result-of-promises"></a>

## Changing the state and result of promises

The executor is actually a *higher order function*. It takes two functions as arguments. To mutate the properties of a promise, we just have to call either the first or the second.

Let's see the examples!

Without having called anything, state and result are populated with their initial values:

```jsx
// example 5

function executor(fufill, reject) {
  /**
   * We are still computing...
   *
   * Our program has yet to reach our call to fulfill or reject.
   **/
}

const myPromise = new Promise(executor)

console.log(myPromise)

// state: "pending", result: undefined

// These are the initial values.
```

Call the first function (without an argument):

```jsx
// example 6

function executor(fulfill) {
  // Finished computing.

  fulfill() // Our program finally reached this call
}

const myPromise = new Promise(executor)

console.log(myPromise)
// state: "fulfilled", result: undefined
```

Call it with a number:

```jsx
// example 7

function executor(fulfill) {
  // Finished computing.

  fulfill(9) // Our program finally reached this call
}

const myPromise = new Promise(executor)

console.log(myPromise)
// state: "fulfilled", result: 9
```

The result could be an object:

```jsx
// example 8

function executor(fulfill) {
  // Finished computing.

  // We could pass an object:
  fulfill({word: 'discombobulate', frequency: 'rare'})
}

const myPromise = new Promise(executor)

console.log(myPromise)
// state: "fulfilled", result: {word: 'discombobulate', frequency: 'rare'}
```

Call our reject function without an argument:

```jsx
// example 9

function executor(fulfill, reject) {
  // Finished computing, but something went wrong.

  reject()
}

const myPromise = new Promise(executor)

console.log(myPromise)
// state: "rejected", result: undefined
```

Call our reject function with a number:

```jsx
// example 10

function executor(fulfill, reject) {
  // Finished computing, but something went wrong.

  // We could pass a number (if we wanted):
  reject(11)
}

const myPromise = new Promise(executor)

console.log(myPromise)
// state: "rejected", result: 11
```

Usually we call our reject function with an Error object:

```jsx
// example 11

function executor(fulfill, reject) {
  // Finished computing, but something went wrong.

  // Usually an Error object is passed:
  reject(new Error('My error message.'))
}

const myPromise = new Promise(executor)

console.log(myPromise)
// state: "rejected", result: error object
```

*Note: we may replace "fulfill" and "reject" with any name we want.*

<a id="how-to-use-promises"></a>

## How to use promises

If you recall from earlier, all instances of Promise also have a "Prototype" property. This is where the methods shared by all instances live. We are interested in *Promise.prototype.then*, *Promise.prototype.catch* and *Promise.prototype.finally*.

Take a look at this example:

```jsx
// example 12

function executor(fulfill, reject) {
  setTimeout(() => {
    const computation = 'apple' === 'apple'

    if (computation) {
      fulfill('Successful')
    } else {
      reject('Failed')
    }
  }, 3000)
}

const myPromise = new Promise(executor)

setTimeout(() => {
  console.log('Our promise after 1s: ', myPromise)
  // state: "pending", result: undefined
}, 1000)

setTimeout(() => {
  console.log('Our promise after 5s: ', myPromise)
  // state: "fulfilled", result: "Successful"
}, 5000)
```

Here we use *setTimeout* to pretend doing some computation for 3 seconds, and then, the function passed to *setTimeout* is run. For this example, the result is always true, which always satisfies our condition, therefore we always call *fulfill* with the string "Successful".

What is interesting about the above, is how we log myPromise twice (after 1 second and after 5 seconds).

Look at the state and the result: they change (as we might expect, since after 3 seconds, we call *fulfill* with a string, to change the state and the result).

However, it would be tedious and inefficient to make guesses how long the computation will take. Wouldn't it be convenient, if we could just tell what to do if it's finished? Also, how do we use something like the result of the computation?

Luckily, promise objects have methods to come to our rescue!

Let's see how they work.

```jsx
// example 13

function executor(fulfill, reject) {
  setTimeout(() => {
    const computation = 'apple' === 'apple'

    if (computation) { // Satisfies the condition
      fulfill('Successful') // Do this.
    } else {
      reject('Failed')
    }
  }, 3000)
}

const myPromise = new Promise(executor)

myPromise.then(
  (result) => console.log(result),
  (error) => console.log(error)
)
```

And with a slight modification, to always call the second argument of the executor:

```jsx
// example 14

function executor(fulfill, reject) {
  setTimeout(() => {
    const computation = 'apple' === 'orange'

    if (computation) { // Fails to satisfy the condition.
      fulfill('Successful')
    } else {
      reject('Failed') // Do this.
    }
  }, 3000)
}

const myPromise = new Promise(executor)

myPromise.then(
  (result) => console.log(result),
  (error) => console.log(error)
)
```

With the *Promise.prototype.then* method, we can schedule function calls ("callbacks") for the time after the promise's state changes.
Not only that, it allows us to use the value of the object's result property via the optional parameter of the callback.

In more detail:

*Promise.prototype.then* can take two callback functions.

Depending on which state the promise ends up in, either the first or the second callback is run.

- The first callback is run if the promise's state changes to "fulfilled". It can take one argument. This argument takes the value we have passed to the first function of our executor. In *example 13*, it is the string saying "Successful".

- The second callback is run if the promise's state changes to "rejected". It can also take one argument, but this argument takes the value we have passed to the second function of our executor. In *example 14*, it is the string saying "Failed".

Now take a look at this example:

```jsx
// example 15

function executor(fulfill, reject) {
  setTimeout(() => {
    const computation = 'apple' === 'orange'

    if (computation) { // Fails to satisfy the condition.
      fulfill('Successful')
    } else {
      reject('Failed') // Do this.
    }
  }, 3000)
}

const myPromise = new Promise(executor)

myPromise.then(
  (result) => console.log(result),
).catch((error) => console.log(error))
```

This does something similar to the previous example.

*Promise.prototype.catch* gives us an opportunity to handle or "catch" any problematic promises (i.e. promises with a "rejected" state).

In case you are wondering, here is some further reading about how *catch()* compares to handling errors with *then()*:

[https://stackoverflow.com/questions/40067852/in-a-promise-whats-the-difference-between-using-catch-and-the-2nd-argument-of](https://stackoverflow.com/questions/40067852/in-a-promise-whats-the-difference-between-using-catch-and-the-2nd-argument-of)

It is important to note here, that all 3 methods (*then()*, *catch()*, *finally()*) return a promise, which makes it possible to chain them. This concept is called "method chaining".

Now take a look at this example:

```jsx
// example 16

function executor(fulfill, reject) {
  setTimeout(() => {
    const computation = 'apple' === 'orange'

    if (computation) { // Fails to satisfy the condition.
      fulfill('Successful')
    } else {
      reject('Failed') // Do this.
    }
  }, 3000)
}

const myPromise = new Promise(executor)

myPromise.then(
  (result) => console.log(result)
).catch(
  (error) => console.log(error)
).finally(
  () => console.log('Clean things up.')
)
```

*Promise.prototype.finally* allows us to schedule a callback that always runs if the promise is settled, meaning, if its state becomes "fulfilled" or "rejected".

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
    xhr.open('GET', url)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  });
}
```

And this is how we might use this function (with *Promise.prototype.then*):

```jsx
// example 18

function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  });
}

const myPromise = myAsyncFunction('https://catfact.ninja/fact')

myPromise.then(
  (result) => console.log(result),
  (error) => console.log(error)
)
```

Based on what we have learned so far, what does this code do? We don't have to understand each bit, but in essence:

1. myAsyncFunction is a function that uses a **Promise constructor** to create an instance of a promise.
    1. The constructor takes an **executor function** (with parameters called "resolve" and "reject" in this case).
    1. In the executor's body, we do our **"computation"**:
        1. We create an XHR object and prepare a GET request.
        1. We **get ready to call resolve** with the response text, in case the request is successful.
        1. We **get ready to call reject** with the status text, in case the request encounters an error.
        1. We dispatch the request to the server.
1. We call myAsyncFunction to **create a promise** ("myPromise").
1. We call the promise's *then()* method, to **schedule our callbacks**.

<a id="a-few-words-about-asynchronicity"></a>

## A few words about promise asynchronicity

*Much of this section is based on this presentation by Philip Roberts: https://www.youtube.com/watch?v=8aGhZQkoFbQ*

One thing that might be confusing is what setTimeout has to do with asynchronicity.

setTimeout sets a timer and schedules a function call (callback) for the time after the timer has expired. However we do not have to wait for the timer to expire, we can continue running other code.

How can the JS runtime keep track of a countdown and also continue running other code?

It can't, it only has a single thread, it can do one thing at a time.

However, browsers can also access Web APIs, which you can think of as other threads, which is how concurrent computations are possible.

To my best understanding, asynchronicity in JavaScript means that some computation (like the countdown) is handed over to a Web API and is then able to run concurrently, and that we can schedule callbacks for the time after the computation has finished.

This does not mean the callback we pass to something like setTimeout is run concurrently - it could run out of order though (i.e. not in the order it appears in the source code).

In other words, being able to run code out of order, probably to avoid blocking behavior, is asynchronicity, which would not be possible without concurrent computations via Web APIs (even if a computation is merely a countdown).

### Calling functions asynchronously

You might have come across something like this line in the MDN docs:

> Once a Promise is fulfilled or rejected, the respective handler function (onFulfilled or onRejected) will be called asynchronously (scheduled in the current thread loop).

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#return_value

What does "asynchronously" mean here?

I do find this a bit confusing.

But it seems to mean, even if the promise is fulfilled immediately, the callback won't run until the main thread executes.

I am wondering though, if deferring a function call, without being bound by a concurrent computation as well, would be a good example of an asynchronous callback.

I think the important thing however is to know what the documentation might mean by "asynchronous callback".

Here is an example:

```js
// example 19

function executor(fulfill) {
  fulfill('Successful')
}

const myPromise = new Promise(executor)


myPromise.then(() => console.log('First'))

console.log('Second')

// Second
// First
```

Almost as though we were using setTimout with a 0 delay, to defer running our code. In reality, Promise callbacks are added to the "microtask queue", whereas setTimout callbacks are added to the "task queue". Microtasks are processed *right after* the main thread is clear (which also means, they are processed before any new tasks/macrotasks).


### Blocking promises

The code of an executor could produce blocking behavior, since it is run synchronously. For this reason, if you were wondering, if we could wrap a synchronous computation in a promise, to make it asynchronous, *we can not*.

Further discussion: https://stackoverflow.com/questions/53876344/correct-way-to-write-a-non-blocking-function-in-node-js

<a id="how-to-use-promises-with-async-and-await"></a>

## How to use promises with async and await?

Promise methods are not the only way we can use promises.

We could similarly schedule operations for the time after a promise's state changes with async and await.

Let's see an example!

```js
// example 20

const url = 'https://catfact.ninja/fact'

function fetchCatFactOne(url) {
  return fetch(url)
    .then(response => response.json())
    .then(obj => obj.fact)
}

async function fetchCatFactTwo(url) {
  const response = await fetch(url)
  const obj = await response.json()
  return obj.fact
}

fetchCatFactOne(url).then(a => console.log(a))

fetchCatFactTwo(url).then(a => console.log(a))
```

Both functions do the same thing, only the syntax is different.

They fetch data from an API and return a promise that is fulfilled with a text about cats.

We can observe how in the first function, the first argument to *then()* will be the promise's fulfillment value.

Whereas in our async function, we have access to the same fulfillment value by preceding a function - that returns a promise - with the await keyword.

<a id="further-reading"></a>

## Further reading:

We've arrived at the end of this post, I will finish with some additional reading material:

[https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

How to use an XHR object without "promisification":

[https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

We don't actually need to "promisify" requests since there is a new API for fetching resources with promise capabilities out of the box:

[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

More about how to use async and await:

[https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await)

About tasks and microtasks:
[https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

<a id="feedback"></a>
## Feedback

There is more to promises, but I didn't want to make this post  longer.

In my opinion, the terminology around promises can be a bit confusing - I hope I did not add more to it.

I don't have a comments section, but to ask questions, suggest changes and what have you, you can open an [issue on github](https://github.com/andrasna/gatsby-theme-andras/issues), or you can send me an email.
