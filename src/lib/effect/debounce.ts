import { Action, Dispatch, Effect } from "hyperapp"

// https://dev.to/monaye/refactor-davidwalsh-s-debounce-function-5afc

type Debounce<S> = {
  action: Action<S>
  delay: number
  payload: unknown
}

let timerID: number

export const debounce = <S>(
  action: Action<S>,
  delay: number,
  payload?: unknown
): Effect<S, Debounce<S>> => {
  return [runDebounce, { action, delay, payload }]
}

const runDebounce = <S>(dispatch: Dispatch<S>, props: Debounce<S>): void => {
  clearTimeout(timerID)
  timerID = setTimeout(
    (() => window.requestAnimationFrame(
      () => dispatch(props.action, props.payload)
    )) as TimerHandler,
    props.delay
  )
}
