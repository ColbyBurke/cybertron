import { map, compose, filter, reduce, append, pluck, lt, __,
 join, prop, path }  from 'ramda'
import { test } from 'tape-modern'

/**
 * Level 5 - Ramda All The Things
 *
 * Results Data
 */

const data = {
  rows: [
    {
      key: '1',
      doc: {
        _id: '1',
        type: 'movie',
        name: 'Ghostbusters',
        year: '1984'
      }
    },
    {
      key: '2',
      doc: {
        _id: '2',
        type: 'movie',
        name: 'Caddyshack',
        year: '1980'
      }
    },
    {
      key: '2',
      doc: {
        _id: '3',
        type: 'movie',
        name: 'Groundhog Day',
        year: '1993'
      }
    }
  ]
}

/**
 * Level 5 - Challenge 1
 *
 * map through the data.rows array and return a list of movie docs.
 */
const challenge1 = () => {
  return map(x => x.doc, data.rows)
}

/** Level 5 = Challenge 2
 *
 * map through the data.rows array and then filter all movies that were
 * filmed before 1990
 *
 */
const challenge2 = () => {

  let movies = map(x => x.doc, data.rows)
  console.log(movies);
  
  console.log(JSON.stringify(filter(x => Number(x.year) < 1990, movies)));
  
  const result = filter(x => Number(x.year) < 1990, movies, null, 0)
  return result
}

/** level 5 - Challenge 3
 *
 * Use reduce to group movies by decade 80s, 90s etc
 *  { '80s': [], '90s': [] }
 *
 * HINT: you will want to append each movie to the right group array
 * check out - append - http://ramdajs.com/docs/#append
 */
const challenge3 = () => {
  const docs = map(x => x.doc, data.rows)
  const eighties = filter(x => Number(x.year) >= 1980 && Number(x.year) < 1990, docs)
  const nineties = filter(x => Number(x.year) >= 1990 && Number(x.year) < 2000, docs)
  const result = reduce((x, y) => {
    let obj = {}
    obj['80s'] = eighties
    obj['90s'] = nineties
    return obj
  }, [], docs)
  console.log(JSON.stringify(result));
  
  return result
}

/**
 * Level 5 - Challenge 4
 *
 * map over the rows and pick the movie documents
 * transform to an array of strings `[name] - [year]`
 * then transform to a set of list items - `<li>${movie}</li>`
 *
 * use the compose function to only map once.
 *
 */
const challenge4 = () => {
  const mapper = map(x => `[${x.doc.name}] - [${x.doc.year}]`)
  let reducer = reduce((x,y) => {
    let splitted = y.split('').filter(y => y !== '[' && y !== ']' && y !== ' - ').join('')
    return x + (`<li>${splitted}</li>`)

  }, [])
  const result = compose(reducer(),mapper())(data.rows).split('')
  console.log(result);
  
  return result 
}

export default () => {
  test('Level 5 - Challenge 1', t => {
    t.deepequals(pluck('doc', data.rows), challenge1())
  })

  test('Level 5 - Challenge 2', t => {
    t.deepequals(
      filter(
        compose(lt(__, '1990'), prop('year')),
        pluck('doc', data.rows)
      ),
      challenge2()
    )
  })

  test('Level 5 - Challenge 3', t => {
    t.deepequals(challenge3(), {
      '90s': [{ _id: '3', type: 'movie', name: 'Groundhog Day', year: '1993' }],
      '80s': [
        { _id: '1', type: 'movie', name: 'Ghostbusters', year: '1984' },
        { _id: '2', type: 'movie', name: 'Caddyshack', year: '1980' }
      ]
    })
  })

  test('Level 5 - Challenge 4', t => {
    t.equal(
      challenge4().join(''),
      '<li>Ghostbusters - 1984</li><li>Caddyshack - 1980</li><li>Groundhog Day - 1993</li>'
    )
  })
}
