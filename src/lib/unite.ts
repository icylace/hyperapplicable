import type { StateFormat, Transform } from "./types"

export { unite }

// -----------------------------------------------------------------------------

// Combines the results of state transformation functions.
const unite = <S, P = any>(
  transform: Transform<S>,
  stateForm: StateFormat<S>,
  payload?: P
): StateFormat<S> => {
  if (!Array.isArray(stateForm)) {
    return transform(stateForm, payload)
  }
  const [state, ...effects] = stateForm
  const nextStateForm = transform(state, payload)
  if (!Array.isArray(nextStateForm)) {
    return [nextStateForm, ...effects]
  }
  const [nextState, ...nextEffects] = nextStateForm
  return [nextState, ...effects, ...nextEffects]
}
