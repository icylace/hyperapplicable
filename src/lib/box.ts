import { ClassProp, VNode, h } from "hyperapp"
import type { Content } from "./types"
import { contentNode } from "./content"

export { box }

// -----------------------------------------------------------------------------

const box = <S>(classProp: ClassProp, content: Content<S> | Content<S>[]): VNode<S> => {
  const stuff = Array.isArray(content)
    ? content.map(contentNode)
    : contentNode(content)
  return h("div", { class: classProp }, stuff)
}
