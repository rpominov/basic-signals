# Basic-signals

This project is similar to [basic-streams](https://github.com/rpominov/basic-streams) in its purpose.
The idea is to explore what kind of operations we can implement for a certain async abstraction.
And to find cases where that abstraction can be usable.

Basic-streams project explores a "Stream" abstraction which is very similar to RxJS
observables in the core idea, but with much simpler and limited API.

Basic-signals focuses on a slightly different abstraction called "Signal".
It has following differences from streams:

 - Signals are not inert. When we create a _stream_ it does nothing until we subscribe to it,
   _signals_ on other hand are more like Promises, they "activate" immediately once created,
   and adding or removing an observer should not affect any other observers in any way.
 - Signals have a current value, which is always available without subscribing.

## Signal API

Signal is an object with two methods:

```
const currentValue = signal.get()

const unobserve = signal.observe(observer)
unobserve()
```

### `get`

`get` method must return the current value of the signal.

### `observe`

`observe` accepts an `observer`, and must return an `unobserve` function.
`observer` is a function which must be called with no arguments every time the current value changes.
After `unobserve` was called, `observer` must not be called.

```js
console.log('Current value is:', signal.get())
signal.observe(() => {
  console.log('Value has changed, the new value is:', signal.get())
})
```
