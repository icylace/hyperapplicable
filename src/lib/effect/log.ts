import type { Dispatch, Effect } from "hyperapp"

export { log }

// -----------------------------------------------------------------------------

const runLog = <S>(_dispatch: Dispatch<S>, x: unknown): void => {
  window.requestAnimationFrame(() => console.log(x))
}

const log = <S>(x: unknown): Effect<S> =>
  [runLog, x]
