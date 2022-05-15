import type { StateFormat, Transform } from "./types"

export { unite }

// -----------------------------------------------------------------------------

// Transforms state while preserving/expanding the list of effects to run.
const unite = <S, P = any>(
  stateForm: StateFormat<S>,
  transformation: Transform<S> | [Transform<S>, P],
): StateFormat<S> => {
  let transform, payload

  if (Array.isArray(transformation)) {
    transform = transformation[0]
    payload = transformation[1]
  } else {
    transform = transformation
  }

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
