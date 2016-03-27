import {fromIncomplete} from 'static-land'

const Signal = fromIncomplete({

  // creates an arbitrary signal
  create(producer, initialValue) {

    let current = initialValue
    let observers = []

    producer(next => {
      current = next
      observers.forEach(observer => observer())
    })

    return {
      get() {
        return current
      },
      observe(observer) {
        let disposed = false
        const protectedObserver = () => {
          if (!disposed) {
            observer()
          }
        }
        observers = observers.concat([protectedObserver])
        return () => {
          disposed = true
          const index = observers.indexOf(protectedObserver)
          if (index !== -1) {
            observers = observers.slice(0, index).concat(observers.slice(index + 1, observers.length))
          }
        }
      },
    }

  },


  // a helper for easier observing
  react(fn, signal) {
    fn(signal.get())
    return signal.observe(() => {
      fn(signal.get())
    })
  },


  // creates a constant signal containing given value
  of(x) {
    return {
      get() {
        return x
      },
      observe() {},
    }
  },


  map(fn, signal) {
    return {
      get() {
        // fn must be pure
        return fn(signal.get())
      },
      observe(observer) {
        return signal.observe(observer)
      },
    }
  },


  // works like flatMapLatest or switch
  chain(fn, signal) {
    return Signal.create(sink => {
      let disposePrev = null
      Signal.react(x => {
        if (disposePrev) {
          disposePrev()
        }
        disposePrev = Signal.react(sink, fn(x))
      }, signal)
    }, null)
  },


  ap(ofFn, ofValue) {
    return Signal.create(sink => {
      const update = () => {
        sink(ofFn.get()(ofValue.get()))
      }
      update()
      ofFn.observe(update)
      ofValue.observe(update)
    }, null)
  },


  scan(reducer, seed, signal) {
    return Signal.create(sink => {
      let prev = seed
      Signal.react(next => {
        prev = reducer(prev, next)
        sink(prev)
      }, signal)
    }, null)
  },


})

export default Signal
