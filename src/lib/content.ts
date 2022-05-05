import { MaybeVNode, VNode, text } from "hyperapp"
import type { Content, ViewVista, Vista } from "./types"

export { contentNode, contentVista, isContent, isVNode, vista }

// -----------------------------------------------------------------------------

const contentNode = <S>(x: Content<S>): MaybeVNode<S> =>
  typeof x === "number" || typeof x === "string" ? text(x) : x

const contentVista = <S>(view: Content<S> | ViewVista<S>) =>
  (state: S): MaybeVNode<S> | MaybeVNode<S>[] =>
    typeof view === "function" ? view(state)
    : typeof view === "number" ? text(view)
    : typeof view === "string" ? text(view)
    : view

const isContent = <S>(x: unknown): x is Content<S> =>
  typeof x === "number"
    || typeof x === "string"
    || x == null
    || typeof x === "boolean"
    || isVNode(x)

const isVNode = <S>(x: unknown): x is VNode<S> =>
  x != null && typeof x === "object" && "node" in x

const vista = <S>(views: Vista<S>) => (state: S): MaybeVNode<S>[] => {
  if (!Array.isArray(views)) {
    const x = contentVista(views)(state)
    return Array.isArray(x) ? x : [x]
  }
  return views.reduce((nodes: MaybeVNode<S>[], view: Vista<S>) => {
    if (Array.isArray(view)) {
      const xs = vista(view)(state)
      return [...nodes, ...xs]
    }
    const x = contentVista(view)(state)
    return Array.isArray(x)
      ? [...nodes, ...x]
      : [...nodes, x]
  }, [] as MaybeVNode<S>[])
}
