import test from 'lobot/test'
import Signal from '../src'

test('of', 1, t => {
  t.equal(Signal.of(1).get(), 1)
})

test('of+map', 1, t => {
  t.equal(Signal.map(x => x + 1, Signal.of(1)).get(), 2)
})

test('of+ap', 1, t => {
  t.equal(Signal.ap(Signal.of(x => x + 1), Signal.of(1)).get(), 2)
})
