import type { VNode } from "hyperapp"
import type { Content } from "./types"

export { isContent, isVNode }

// -----------------------------------------------------------------------------

const isContent = <S>(x: unknown): x is Content<S> =>
  x == null || Array.isArray(x) || typeof x === "boolean" || isVNode(x)

const isVNode = <S>(x: unknown): x is VNode<S> =>
  x != null && typeof x === "object" && "node" in x
