import { Dispatch, Effect } from "hyperapp"

export const nextFrame = <S>(f: Function, ...args: any[]): Effect<S> =>
  [runNextFrame, { f, args }]

const runNextFrame = <S>(dispatch: Dispatch<S>, props: any): void => {
  window.requestAnimationFrame(() => {
    const newState = props.f(...props.args)
    if (newState instanceof Error) throw newState
    dispatch((state) => newState == null ? state : newState)
  })
}
