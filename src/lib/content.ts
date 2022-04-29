import { MaybeVNode, VNode, text } from "hyperapp"
import type { Content, View } from "./types"

export { contentNode, isContent, isVNode, vista }

// -----------------------------------------------------------------------------

const contentNode = <S>(x: Content<S>): MaybeVNode<S> =>
  typeof x === "number" || typeof x === "string" ? text(x) : x

const isContent = <S>(x: unknown): x is Content<S> =>
  typeof x === "number"
  || typeof x === "string"
  || x == null
  || typeof x === "boolean"
  || isVNode(x)

const isVNode = <S>(x: unknown): x is VNode<S> =>
  x != null && typeof x === "object" && "node" in x

const vista =
  <S>(xs: readonly (Content<S> | View<S>)[]) =>
    (state: S): MaybeVNode<S>[] =>
      xs.map((x) => typeof x === "function" ? x(state) : contentNode(x))
