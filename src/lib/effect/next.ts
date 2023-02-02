import { Dispatch, Dispatchable, Effect } from "hyperapp"

export { next }

// -----------------------------------------------------------------------------

// Dispatches a dispatchable on the next frame.

const next = <S>(x: Dispatchable<S>): Effect<S> =>
  [runNext, x]

const runNext = <S>(dispatch: Dispatch<S>, x: Dispatchable<S>): void => {
  window.requestAnimationFrame(() => dispatch(x))
}
