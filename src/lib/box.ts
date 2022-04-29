import { ClassProp, VNode, h } from "hyperapp"
import type { Content } from "./types"
import { contentNode } from "./content"

export { box }

// -----------------------------------------------------------------------------

const box = <S>(classProp: ClassProp, content: Content<S>): VNode<S> =>
  h("div", { class: classProp }, contentNode(content))
