// 1. 利用set
const unique = arr => Array.from(new Set(arr));

// 2. 两层for循环 + splice
const unique = arr => {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        len--;
        j--;
      }
    }
  }
  return arr;
}

// 3. 利用indexOf
const unique = arr => {
  const len = arr.length;
  const res = [];
  for (let i = 0; i < len; i++) {
    if (res.findIndex(arr[i]) === -1) res.push(arr[i])
  }
  return res;
}

// 4. 利用includes
const unique = arr => {
  const len = arr.length;
  const res = [];
  for (let i = 0; i < len; i++) {
    if (!res.includes(arr[i])) res.push(arr[i])
  }
  return res;
}

// 5. 利用filter
const unique = arr => {
  const seen = new Map();
  return arr.filter((item) => !seen.has(item) && seen.set(item, true))
}

// 6. 利用map
const unique = arr => {
  const len = arr.length;
  const map = new Map();
  let res = [];
  for (let i = 0; i < len; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], true);
      res.push(arr[i])
    }
  }
  return res;
}

// ======================================================
/**
 * testing
 */