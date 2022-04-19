import type { Dispatch, Dispatchable, Effect } from "hyperapp"

export { next }

// -----------------------------------------------------------------------------

const runNext = <S>(dispatch: Dispatch<S>, x: Dispatchable<S>): void => {
  window.requestAnimationFrame(() => dispatch(x))
}

const next = <S>(x: Dispatchable<S>): Effect<S> =>
  [runNext, x]
