// 组件通信，一个触发与监听的过程
class EventEmitter {
  constructor() {
    // 存储事件
    this.events = this.events || new Map()
  }
  // 订阅事件：如果不存在此种type，创建相关数组
  on(type, fn) {
    if (!this.events.get(type)) {
      this.events.set(type, fn)
    }
  }
  // 发布事件：对于一个type中的所有事件函数，均进行触发
  emit(type, ...args) {
    let handle = this.events.get(type);
    handle.apply(this, ...args);
  }
  once(type, once = false) {
    const that = this;
  }
  // 删除事件：删除事件类型对应的array
  off(type, fn) {
    const tasks = this.events.get(type)
    if (tasks.length) {
      const index = tasks.findIndex((f) => f === fn || f.callback === fn)
      if (index >= 0) {
        tasks.splice(index, 1)
      }
    }
  }


}

// ======================================================
/**
 * testing
 */
// 测试例子
var emitter = new EventEmitter();
emitter.on('study', function (data) {
  console.log(`学习${data}`);
});
emitter.on('eat', function (data) {
  console.log(`吃${data}`);
});
emitter.once('relax', function () {
  console.log('relax');
})
emitter.emit('study', 'javascript'); // => 学习javascript
emitter.emit('eat', '苹果'); // => 吃苹果
emitter.emit('relax'); // => relax
emitter.emit('relax'); // => undefined