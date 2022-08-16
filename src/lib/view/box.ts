import { ClassProp, MaybeVNode, VNode, h } from "hyperapp"

export { box }

// -----------------------------------------------------------------------------

const box = <S>(classProp: ClassProp, contents: MaybeVNode<S> | MaybeVNode<S>[]): VNode<S> =>
  h("div", { class: classProp }, contents)
