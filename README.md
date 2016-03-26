# Basic-signals

This project is similar to [basic-streams](https://github.com/rpominov/basic-streams) in its purpose.
The idea is to explore what kind of operations we can implement for a certain async abstraction.
And to find cases where that abstraction can be usable.

Basic-streams project explores the "Stream" abstraction which is very similar to RxJS
observables in the core idea, but with much simpler and limited API.

Basic-signals focuses on a slightly different abstraction called "Signal".
It has following differences from streams:

 - Signals are not inert. When we create a _stream_ it does nothing until we subscribe to it,
   _signals_ on other hand are more like Promises, they "activate" immediately once created.
   Adding or removing an observer should not affect any other observers in any way.
 - Each signal have a current value, which is always available without observing,
   and must always be up to date even if there are no observers.
   Adding or removing an observer should not affect the current value.

## Signal API

Signal is an object with two methods.

### `get`

Must return the current value of the signal.

### `observe`

Accepts an `observer`, and must return an `unobserve` function. An `observer` is a function
which must be called with no arguments every time the current value changes.
After `unobserve` was called, `observer` must not be called.

```js
console.log('Current value is:', signal.get())

const unobserve = signal.observe(() => {
  console.log('Value has changed, the new value is:', signal.get())
})

...

unobserve()
```
