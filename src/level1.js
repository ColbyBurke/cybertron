import { test, assert } from 'tape-modern'
import { equals, map, filter, reduce, compose, pipe } from 'ramda'

export default function() {
  /* Level 1 */
  const ex1 = 'use map to double each value and return'
  const exercise1 = _ => {
    const numbers = [1, 2, 4, 8, 16, 32]
    return numbers.map(x => x * 2)
  }

  const ex2 = 'use filter to only return even numbers'
  const exercise2 = _ => {
    const numbers = [1, 2, 3, 4, 5, 6]
    return numbers.filter(x => x % 2 === 0)
  }

  const ex3 = 'use reduce to sum the numbers'
  const exercise3 = _ => {
    const numbers = [1, 2, 3, 4, 5, 6]
    return reduce((x, y) => x + y, 0, numbers)
  }

  const ex4 = `use compose to run the following three commands

1. map over the numbers and square each number
2. use filter keep numbers divisible by 8
3. use reduce to count the resulting numbers
`
  const exercise4 = _ => {
    const numbers = [1, 2, 4, 8, 16, 32]
    const reducer = (acc, val) => acc + 1
    return pipe(map(x => Math.pow(x, 2)),
     filter(x => x % 8 === 0),
     reduce(reducer, 0))(numbers)
  }

  /* tests to validate exercises go here */
  return test('Level 1', assert => {
    assert.deepequals(exercise1(), [2, 4, 8, 16, 32, 64], ex1)
    assert.deepequals(exercise2(), [2, 4, 6], ex2)

    assert.equal(exercise3(), 21, ex3)

    assert.equal(exercise4(), 4, ex4)
  })
}
