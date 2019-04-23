const arr = [1, 2, 3, 4, 5]

arr.map(num => num + 1)
//-> [2, 3, 4, 5, 6]

// map written as a standalone function
const map = fn => arr => arr.map(fn)

// this still works
map(num => num + 1)(arr)
//-> [2, 3, 4, 5, 6]

// Drawing a parallel between Array##map and Promise##then
Array.of(2).map(num => num + 1)
//-> same as Array.of(3)
Promise.resolve(2).then(num => num + 1)
//-> same as Promise.resolve(3)

Array.prototype.myMap = function(AtoB) {
  let arr = []
  for (elem of this) {
    arr.push(AtoB(elem))
  }
  return arr
}

// Writing our own functor
const Box = x => ({
  map: fn => Box(fn(x)),
  fold: _ => x
})

Box(2)
  .map(num => num + 1)
  .map(num => num * 2)
  .fold()
//-> 6

// map :: F a ~> (a -> b) -> F b
// map :: (r -> a) ~> (a -> b) -> r -> b
// This still blows my mind a little bit, but
// it allows us to map over the returned value
// of a function, before we actually call that
// function
Function.prototype.map = function(AtoB) {
  return R => {
    const RtoA = this
    const A = RtoA(R)
    const B = AtoB(A)
    return B
  }
}

const increment = num => num + 1

const incrementWithMessage = increment.map(
  n => `Heres the incremented number ${n}`
)
incrementWithMessage(3)
//-> "Here's the incremented number 4"

const add = x => y => x + y
const mult = x => y => x * y

const addThreeThenDouble = add(3).map(mult(2))

addThreeThenDouble(5)
//-> 16
