/**
 * @author yaoyao1987
 * @date 2020-10-08
 * @param {*} type 类型
 * @param {*} key
 * @param {*} props 节点属性
 * @param {*} children
 * @param {*} text
 * @returns 
 */
export default function vnode(type, key, props, children, text) {
  return {
    type,
    props,
    key,
    children,
    text
  }
}