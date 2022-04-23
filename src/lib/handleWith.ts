import type { StateFormat, Transform } from "./types"
import { unite } from "./unite"

export { handleWith }

// -----------------------------------------------------------------------------

// Invokes a collection of event handlers for the same event.
const handleWith = <S>(handlers: readonly Transform<S, Event>[]) =>
  (state: StateFormat<S>, event: Event): StateFormat<S> =>
    handlers.reduce((stateForm, transform) => unite(transform, stateForm, event), state)
