import { Dispatch, Effect } from "hyperapp"

export const nextFrame = <S>(
  f: (..._: any[]) => Record<string, any> | null,
  ...args: any[]
): Effect<S> => {
  return [runNextFrame, { f, args }]
}

const runNextFrame = <S>(dispatch: Dispatch<S>, props: any): void => {
  window.requestAnimationFrame(async (): Promise<void> => {
    const newState = await props.f(...props.args)
    if (newState instanceof Error) throw newState
    dispatch((state) => newState == null ? state : { ...state, ...newState })
  })
}
