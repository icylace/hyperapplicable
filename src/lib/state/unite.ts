import { StateFormat, Transform } from "../types"

// Transforms state while preserving/expanding the list of effects to run.
export const unite = <S>(stateForm: StateFormat<S>, ...transforms: Transform<S>[]): StateFormat<S> => {
  let result = stateForm

  for (let i = 0; i < transforms.length; ++i) {
    const transform = transforms[i]

    if (!Array.isArray(result)) {
      result = transform(result)
    } else {
      const [state, ...effects] = result
      const nextStateForm = transform(state)

      if (!Array.isArray(nextStateForm)) {
        result = [nextStateForm, ...effects]
      } else {
        const [nextState, ...nextEffects] = nextStateForm
        result = [nextState, ...effects, ...nextEffects]
      }
    }
  }
  return result
}
