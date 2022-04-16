import type { MaybeVNode, VNode } from "hyperapp"
import type { ContentView, View } from "./types"

export type { View, ContentView }
export { isContent, isVNode }

// -----------------------------------------------------------------------------

const isContent = <S>(x: unknown): x is (MaybeVNode<S> | readonly MaybeVNode<S>[]) =>
  x == null || Array.isArray(x) || typeof x === "boolean" || isVNode(x)

const isVNode = <S>(x: unknown): x is VNode<S> =>
  x != null && typeof x === "object" && "node" in x
