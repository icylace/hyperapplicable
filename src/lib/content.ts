import { MaybeVNode, VNode, text } from "hyperapp"
import type { Content, Contents, View } from "./types"

export { contentNode, contentView, isContent, isVNode, vista }

// -----------------------------------------------------------------------------

const contentNode = <S>(x: Content<S>): MaybeVNode<S> =>
  typeof x === "number" || typeof x === "string" ? text(x) : x

const contentView = <S>(view: Content<S> | View<S>) => (state: S): MaybeVNode<S> =>
  typeof view === "function" ? view(state) : contentNode(view)

const isContent = <S>(x: unknown): x is Content<S> =>
  typeof x === "number"
    || typeof x === "string"
    || x == null
    || typeof x === "boolean"
    || isVNode(x)

const isVNode = <S>(x: unknown): x is VNode<S> =>
  x != null && typeof x === "object" && "node" in x

const vista = <S>(views: Contents<S>) => (state: S): MaybeVNode<S>[] =>
  Array.isArray(views)
    ? views.map((view) => contentView<S>(view)(state))
    : [contentView(views)(state)]
