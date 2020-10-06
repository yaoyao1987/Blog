function shuffle(arr) {
  let len = arr.length;
  while (len > 0) {
    const index = parseInt(Math.random() * len--);
    [arr[index], arr[len]] = [arr[len], arr[index]];
  }
  return arr;
}