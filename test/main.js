import test from 'tape-catch'
import Signal from '../src'

test('of', t => {
  t.plan(1)
  t.equal(Signal.of(1).get(), 1)
  t.end()
})

test('of+map', t => {
  t.plan(1)
  t.equal(Signal.map(x => x + 1, Signal.of(1)).get(), 2)
  t.end()
})

test('of+ap', t => {
  t.plan(1)
  t.equal(Signal.ap(Signal.of(x => x + 1), Signal.of(1)).get(), 2)
  t.end()
})
