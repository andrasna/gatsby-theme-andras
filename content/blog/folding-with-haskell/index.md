---
title: 'Folding with Haskell'
date: '2022-01-29'
description: 'How foldr and foldl work.'
---

A simple example of using foldr would be this:

```haskell
sum = foldr (+) 0
```

```haskell
sum [1, 2, 3]

-- 6
```

A list can be written in another way, which is quite helpful for thinking about folding:

```haskell
1 : (2 : (3 : []))

-- [1,2,3]
```

Now this is how we could think of a call to sum:

```haskell
1 + (2 + (3 + 0))

-- 6
```

Basically, we replace every `:` with foldr's first argument `(+)`, and we replace `[]` with the second argument `0`.

In Haskell, the plus sign is a function either used with the infix notation, like we did before, or it can be used with a prefix notation, like how we would probably use most functions:

```haskell
(+) 1 2

-- 3
```

So we could rewrite the example as:

```haskell
(+) 1 ((+) 2 ((+) 3 0))

-- 6
```

Okay, now let’s look at the first code example again:

```haskell
length' = foldr (\_ acc -> 1 + acc) 0
```

```haskell
length' [1, 2, 3]

-- 3
```

If we tried to do what we did before (replacing `:` and `[]`), the compiler would throw an error:

```haskell
1 (\_ acc -> 1 + acc) (2 (\_ acc -> 1 + acc) (3 (\_ acc -> 1 + acc) 0))

-- Throws an error
```

But our thinking would not be wrong. We would just have to do some extra work, since we can not use lambda expressions with an infix notation (at least as far as I'm aware of).

The prefix notation would work as expected however:

```haskell
(\_ acc -> 1 + acc) 1  ((\_ acc -> 1 + acc) 2  ((\_ acc -> 1 + acc) 3  0))

-- 3
```

Let’s make this more readable.

We can name our function first:

```haskell
onePlus = \_ acc -> 1 + acc
```

And then we can use `onePlus` with the familiar prefix notation, or with an infix notation using backticks.

```haskell
100 `onePlus` 5

-- 6
```
```haskell
onePlus 100 5

-- 6
```

Which allows us to write:

```haskell
1 `onePlus` (2 `onePlus` (3 `onePlus` 0))

-- 3
```
```haskell
onePlus 1 (onePlus 2 (onePlus 3 0))

-- 3
```

To generalize this, if we see something like:

```haskell
newFunc = foldr func seed 
```

We can immediately think of `newFunc` like this:

```haskell
item1 `func` (item2 `func` (item3 `func` seed))

-- Or:

func item1 (func item2 (func item3 seed))

-- Or:

   f
  / \
 1   f
    / \
   2   f
      / \
     3   s
```

*The tree structure is from this [Wikipedia article](https://en.wikipedia.org/wiki/Fold_(higher-order_function)), if you wanna check out the original.*

Whereas in case of `foldl`:

```haskell
newFunc = foldl func seed 
```

We can think of `newFunc` as:

```haskell
(((seed `func` item1) `func` item2) `func` item3)

-- Or:

func (func (func seed item1) item2) item3

-- Or:

       f
      / \
     f   3
    / \
   f   2
  / \
 s   1
```