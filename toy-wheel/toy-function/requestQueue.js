class requestQueue {
  constructor(max) {
    this.taskQueue = [];
    this.max = max || 10;
    setTimeout(() => {
      this.next()
    }, 0);
  }
  addTask(task) {
    this.taskQueue.push(task);
  }
  next() {
    const len = this.taskQueue.length;
    if (!len) {
      return
    }
    const min = Math.min(len, this.max);
    for (let i = 0; i < min; i++) {
      this.max--;
      let task = this.taskQueue.shift();
      task()
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.max++;
          this.next();
        })
    }
  }
}
// ======================================================
/**
 * testing
 */

const request = new requestQueue();
for (let i = 0; i < 20; i++) {
  request.addTask(function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(i)
      }, 2000);
    })
  })
}