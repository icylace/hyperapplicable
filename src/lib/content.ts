import { MaybeVNode, VNode, text } from "hyperapp"
import type { Content } from "./types"

export { contentNode, isContent, isVNode }

// -----------------------------------------------------------------------------

const contentNode = <S>(x: Content<S>): MaybeVNode<S> | readonly MaybeVNode<S>[] =>
  typeof x === "number" || typeof x === "string" ? text(x) : x

const isContent = <S>(x: unknown): x is Content<S> =>
  typeof x === "number"
  || typeof x === "string"
  || x == null
  || Array.isArray(x)
  || typeof x === "boolean"
  || isVNode(x)

const isVNode = <S>(x: unknown): x is VNode<S> =>
  x != null && typeof x === "object" && "node" in x
