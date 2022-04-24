import { ClassProp, VNode, h } from "hyperapp"
import type { Content } from "./types"

export { box }

// -----------------------------------------------------------------------------

const box = <S>(classes: ClassProp, content: Content<S>): VNode<S> =>
  h("div", { class: classes }, content)
