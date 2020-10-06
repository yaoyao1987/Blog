const quickSort = array => {
  if (!array || array.length <= 0) return []
  quick(array, 0, array.length - 1)
}

// function quick(array, left, right) {
//   if (left < right) {
//     [array[], array[]] = [array[], array[]]
//   }
// }