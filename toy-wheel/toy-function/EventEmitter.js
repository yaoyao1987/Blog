// 组件通信，一个触发与监听的过程
class EventEmitter {
  constructor() {
    this.events = {}; // 用对象的方式来缓存订阅者队列（事件名称：回调）
  }
  setMaxListeners(count) {
    this.maxListeners = count;
  }
  getMaxListeners() {
    return this.maxListeners ? this.maxListeners : EventEmitter.defaultMaxListeners;
  }
  // 订阅事件
  on(eventName, listener) {
    if (typeof listener !== 'function') return;

    //如果只被继承了prototype，需要在继承的对象上添加events属性
    if (!this.events) {
      this.events = Object.create(null)
    }
    const maxListeners = this.getMaxListeners();
    if (this.events[eventName].length > maxListeners) {
      throw new Error('超过最大数量' + maxListeners + '个')
    }

    this.emit('newListener', event, listener); // 触发newListener事件回调

    //事件队列不存在
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener); // 添加观察者
  }
  // 发布事件
  emit(eventName, ...args) {
    if (!this.events[eventName]) return;

    // 通知所有的订阅者，发起回调
    this.events[eventName].forEach(callback => {
      callback.apply(this, args)
    })
  }
  // 发布一次
  once(eventName, listener) {
    function wrap(args) {
      listener.apply(this, args);
      this.removeListener(eventName, wrap);
    }
    wrap.cb = listener; // 将回调存储起来用于删除时对比
    this.on(eventName, wrap)
  }
  // 取消订阅事件
  off(eventName, listener) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events.filter(l => {
      return l !== listener && l.cb !== listener;
    });
  }
}

// ======================================================
/**
 * testing
 */
// 测试例子
var emitter = new EventEmitter();
const task1 = () => { console.log('task1'); }
const task2 = () => { console.log('task2'); }
eventBus.on('task', task1)
eventBus.on('task', task2)

setTimeout(() => {
  eventBus.emit('task')
}, 1000)