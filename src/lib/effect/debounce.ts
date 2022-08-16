import type { Action, Dispatch, Effect } from "hyperapp"

export { debounce }

// -----------------------------------------------------------------------------

type Debounce<S> = {
  action: Action<S>
  delay: number
  payload: unknown
}

// https://dev.to/monaye/refactor-davidwalsh-s-debounce-function-5afc

let timerID: number

const runDebounce = <S>(dispatch: Dispatch<S>, props: Debounce<S>): void => {
  clearTimeout(timerID)
  timerID = setTimeout(
    (() => window.requestAnimationFrame(
      () => dispatch(props.action, props.payload)
    )) as TimerHandler,
    props.delay
  )
}

const debounce = <S>(action: Action<S>, delay: number, payload?: unknown): Effect<S, Debounce<S>> =>
  [runDebounce, { action, delay, payload }]
