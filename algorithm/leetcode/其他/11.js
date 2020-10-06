const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const END_OF_WORD = "$";

class Trie {
  constructor() {
    this.root = Object.create(null);
  }
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) node[char] = Object.create(null);
      node = node[char];
    }
    if (!node[END_OF_WORD]) {
      node[END_OF_WORD] = 0;
    }
    node[END_OF_WORD]++;
  }
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }
    return node[END_OF_WORD] ? true : false;
  }
}

var dfs = function(board, i, j, word, dict, result) {
  word += board[i][j];
  dict = dict[board[i][j]];

  if (dict[END_OF_WORD]) {
    console.log("word", word);
    result.add(word);
  }
  let tmp = board[i][j];
  board[i][j] = "@";
  for (const k in 4) {
    let x = i + dx[k];
    let y = j + dy[k];

    if (0 <= x < m && 0 <= y < n && board[x][y] != "@" && dict[board[x][y]]) {
      dfs(board, x, y, word, dict, result);
    }
  }
  board[i][j] = tmp;
  console.log(result);
};
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  let trie = new Trie();
  let result = new Set();
  let m = board.length,
    n = board[0].length;

  for (let i = 0; i < m; i++) {
    trie.insert(board[i]);
  }

  console.log(trie.root);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (trie.root[board[i][j]]) {
        dfs(board, i, j, "", trie.root, result);
      }
    }
  }
};

const board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];
const word = "ABCCED";
console.log(exist(board, word));
