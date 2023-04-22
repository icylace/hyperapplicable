import { ClassProp, MaybeVNode, VNode, h } from "hyperapp"

export const box = <S>(
  classProp: ClassProp,
  contents: MaybeVNode<S> | MaybeVNode<S>[]
): VNode<S> => {
  return h("div", { class: classProp }, contents)
}
