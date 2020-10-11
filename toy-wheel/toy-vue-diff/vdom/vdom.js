import vnode from './vnode.js'

/**
 * 创建一个元素节点
 * @param {*} type 类型
 * @param {*} props 节点属性
 * @param  {...any} children 所有孩子
 */
export default function createElement(type, props = {}, ...children) {
  let key;
  if (props.key) {
    key = props.key;
    delete props.key;
  }
  children = children.map(child => {
    if (typeof child === 'string') {
      return vnode(void 0, void 0, void 0, void 0, child)
    } else {
      return child
    }
  })

  return vnode(type, key, props, children)
};
