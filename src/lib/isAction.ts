import { Action } from "hyperapp"

export const isAction = <S, P = any>(x: unknown): x is Action<S, P> =>
  typeof x === "function" || (Array.isArray(x) && x.length > 0)
