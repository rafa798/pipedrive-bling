const { of, from } = require('rxjs')
const { map, mergeMap, delay, mergeAll } = require('rxjs/operators')

const getData = (param) => {
  return of(`retrieved new data with param ${param}`).pipe(
    delay(100)
  )
}

// using a regular map
from([1, 2, 3, 4]).pipe(
  map(param => getData(param))
).subscribe(val => val.subscribe(data => console.log('a', data)));

// using map and mergeAll
from([1, 2, 3, 4]).pipe(
  map(param => getData(param)),
  mergeAll()
).subscribe(val => console.log('b', val));


// using mergeMap
from([1, 2, 3, 4]).pipe(
  mergeMap(param => getData(param))
).subscribe(val => console.log('c', val));
