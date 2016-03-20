# basic-signals

An abstraction even more limited than basic-streams

```js
mySignal = sink => {
  // must (should?) emit initial value
  sink(1)
  // multicast by default?
  // no unsub functionality
}
```
