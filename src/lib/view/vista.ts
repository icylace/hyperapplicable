import { MaybeVNode, VNode, text } from "hyperapp"
import type { Content, Vista, VistaView } from "../types"

export { contentView, isVista, isVNode, vista }

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

const isVista = <S>(x: unknown): x is Vista<S> =>
  x == null
    || typeof x === "boolean"
    || typeof x === "function"
    || typeof x === "number"
    || typeof x === "string"
    || Array.isArray(x)
    || isVNode(x)

const isVNode = <S>(x: unknown): x is VNode<S> =>
  typeof x === "object" && x != null && "node" in x

const vista = <S>(views: Vista<S>) => (state: S): MaybeVNode<S>[] =>
  !Array.isArray(views)
    ? contentView(views)(state)
    : views.reduce((nodes: MaybeVNode<S>[], view: Vista<S>) => [
        ...nodes,
        ...!Array.isArray(view)
          ? contentView(view)(state)
          : vista(view)(state),
      ], [])
