const arr = [1, 2, 3]
const arr2 = [4, 5, 6]

const newArr1 = arr.concat([4]) //?
const newArr1 = arr.concat(4) //?
const newArr2 = [...arr, 4] //?
;[...arr, ...arr2] //?
