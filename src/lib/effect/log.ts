import { Dispatch, Effect } from "hyperapp"

export const log = <S>(x: unknown): Effect<S> =>
  [runLog, x]

const runLog = <S>(_dispatch: Dispatch<S>, x: unknown): void => {
  window.requestAnimationFrame(() => console.log(x))
}
