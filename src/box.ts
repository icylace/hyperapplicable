import { ClassProp, MaybeVNode, VNode, h } from "hyperapp"

export { box }

// -----------------------------------------------------------------------------

const box = <S>(classes: ClassProp, contents: MaybeVNode<S> | readonly MaybeVNode<S>[]): VNode<S> =>
  h("div", { class: classes }, contents)
