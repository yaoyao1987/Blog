/**
 * 渲染vnode元素到真是的dom节点上
 * @param {*} vnode 用户写的虚拟节点
 * @param {*} container 要渲染到哪个容器中
 */
export function render(vnode, container) {
  let ele = createDomElementFromVnode(vnode); // 将虚拟节点转化成真实的节点
  container.appendChild(ele);
}

// 通过虚拟的对象，创建一个真实的dom元素
function createDomElementFromVnode(vnode) {
  let { type, key, props, children = [], text } = vnode;
  if (type) { // 传递了说明是标签
    vnode.domElement = document.createElement(type); // 简历虚拟节点和真实元素的关系，后面可以用来更新真实dom
    updateDomProperties(vnode); // 根据当前的虚拟节点的属性，去更新真实的dom元素
    // 递归渲染子的虚拟节点
    children.forEach(childVnode => {
      render(childVnode, vnode.domElement)
    });
  } else {
    // 文本节点
    vnode.domElement = document.createTextNode(text);
  }
  return vnode.domElement;
}

/**
 * 更新dom元素的属性
 * @param {*} newVnode 
 * @param {*} oldProps 
 */
function updateDomProperties(newVnode, oldProps = {}) {
  let domElement = newVnode.domElement; // 真实的dom元素
  let newProps = newVnode.props;

  // 老的里面有新的里面没有的属性，直接移除
  for (const oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      delete domElement[oldPropName];
    }
  }

  let newStyleObj = newProps ? (newProps.style || {}) : {};
  let oldStyleObj = oldProps ? (oldProps.style || {}) : {};

  for (const propName in oldStyleObj) {
    if (!newStyleObj[propName]) {
      domElement.style[propName] = '';
    }
  }

  // 老的里面没有新的里面有，则覆盖或增加
  for (const newPropName in newProps) {
    if (newPropName === 'style') {
      let styleObj = newProps.style;
      for (const s in styleObj) {
        domElement.style[s] = styleObj[s];
      }
    } else {
      domElement[newPropName] = newProps[newPropName]
    }
  }
}

/**
 * 更新方法，比对并更新
 * @param {*} oldVnode 
 * @param {*} newVnode 
 */
export function patch(oldVnode, newVnode) {
  // 类型不同
  if (oldVnode.type !== newVnode.type) {
    return oldVnode.domElement.parentNode.replaceChild(createDomElementFromVnode(newVnode), oldVnode.domElement)
  } else {
    // 类型相同
    // 文本
    if (!newVnode.type && (oldVnode.type || oldVnode.text !== newVnode.text)) {
      return oldVnode.domElement.textContent = newVnode.text;
    }

    // 类型一样 并且是标签 需要根据新节点的属性 更新老节点的属性
    let domElement = (newVnode.domElement = oldVnode.domElement);
    updateDomProperties(newVnode, oldVnode.props)

    let oldChildren = oldVnode.children; // 老的children
    let newChildren = newVnode.children; // 新的children

    // 1. 老的有children，新的有children
    // 2. 老的有children，新的没有children
    // 3. 新增了children
    if (oldChildren.length > 0 && newChildren.length > 0) {
      // 对比两个children
      updateChildren(domElement, oldChildren, newChildren);
    } else if (oldChildren.length > 0) {
      domElement.innerHTML = ''
    } else if (newChildren.length > 0) {
      render(newVnode, domElement)
    }
  }
}

function isSameVnode(oldVnode, newVnode) {
  return oldVnode.key === newVnode.key && oldVnode.type === newVnode.type;
}

// 
function createMapByKeyToIndex(oldChildren) {
  let map = {};
  for (let i = 0; i < oldChildren.length; i++) {
    let current = oldChildren[i];
    if (current.key) {
      map[current.key] = i;
    }
  }
  return map;
}

function updateChildren(parent, oldChildren, newChildren) {
  let oldStartIndex = 0;
  let oldStartVnode = oldChildren[0];
  let oldEndIndex = oldChildren.length - 1;
  let oldEndVnode = oldChildren[oldEndIndex];

  let newStartIndex = 0;
  let newStartVnode = newChildren[0];
  let newEndIndex = newChildren.length - 1;
  let newEndVnode = newChildren[newEndIndex];

  let map = createMapByKeyToIndex(oldChildren);

  // 判断谁先结束就停止循环
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (!oldStartVnode) {
      oldStartVnode = oldChildren[++oldStartIndex]
    } else if (!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndIndex];
    }

    if (isSameVnode(oldStartVnode, newStartVnode)) {
      patch(oldStartVnode, newStartVnode)
      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      patch(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      patch(oldStartVnode, newEndVnode);
      parent.insertBefore(oldStartVnode.domElement, oldEndVnode.domElement.nextSibling)
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldEndIndex, newStartIndex)) {
      patch(oldEndVnode, newStartVnode);
      parent.insertBefore(oldEndVnode.domElement, oldStartVnode.domElement)
      oldStartVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[++newStartIndex];
    } else {
      // 先拿到新的节点，去老的中查找，如果存在就复用，不存在就创建插入
      let index = map[newStartVnode.key];

      if (!index) {
        parent.insertBefore(createDomElementFromVnode(newStartVnode), oldStartVnode.domElement);
      } else {
        let toMoveMode = oldChildren[index];
        patch(toMoveMode, newStartVnode)
        parent.insertBefore(toMoveMode.domElement, oldStartVnode.domElement)
        oldChildren[index] = undefined;
      }
      newStartVnode = newChildren[++newStartIndex];
    }
  }

  // 合并前后追加的逻辑
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      let beforeElement = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].domElement
      parent.insertBefore(createDomElementFromVnode(newChildren[i]), beforeElement);
    }
  }
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldChildren[i]) {
        parent.removeChild(oldChildren[i].domElement)
      }
    }
  }
}