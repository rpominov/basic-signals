import {makeTest} from './utils'

const test = makeTest('foo')

test('of', 1, t => {
  t.deepEqual([1], [1])
})
