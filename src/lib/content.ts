import { MaybeVNode, VNode, text } from "hyperapp"
import type { Content, Vista, VistaView } from "./types"

export { contentView, isContent, isVNode, vista }

// -----------------------------------------------------------------------------

const contentView = <S>(view: Content<S> | VistaView<S>) => (state: S): MaybeVNode<S>[] => {
  if (typeof view === "function") {
    const x = view(state)
    return Array.isArray(x) ? x : [x]
  }
  return (typeof view === "number" || typeof view === "string")
    ? [text(view)]
    : [view]
}

const isContent = <S>(x: unknown): x is Content<S> =>
  x == null
    || typeof x === "boolean"
    || typeof x === "number"
    || typeof x === "string"
    || isVNode(x)

const isVNode = <S>(x: unknown): x is VNode<S> =>
  x != null && typeof x === "object" && "node" in x

const vista = <S>(views: Vista<S>) => (state: S): MaybeVNode<S>[] =>
  !Array.isArray(views)
    ? contentView(views)(state)
    : views.reduce((nodes: MaybeVNode<S>[], view: Vista<S>) => [
        ...nodes,
        ...!Array.isArray(view)
          ? contentView(view)(state)
          : vista(view)(state),
      ], [])
