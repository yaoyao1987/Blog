class Observer {
  constructor(cb) {
    if (!cb || typeof cb !== 'function') {
      throw new Error('Observer构造器必须传入函数类型');
    }
    this.cb = cb;
  }
  // 被模板对象通知时执行
  update() {
    this.cb();
  }
}

class Subject {
  // 维护观察者列表
  constructor(observer) {
    this.observerList = [];
  }
  // 添加一个观察者
  addObserver(observer) {
    this.observerList.push(observer)
  }
  // 通知所有观察者
  notify() {
    this.observerList.forEach(observer => {
      observer.update()
    })
  }
}
// ======================================================
/**
 * testing
 */