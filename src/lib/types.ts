// Convenience types.

import type {
  Action,
  CustomPayloads,
  Dispatch,
  Effect,
  MaybeVNode,
  Unsubscribe,
} from "hyperapp"

export type {
  ActionWithPayload,
  Content,
  CustomProps,
  Effecter,
  Reaction,
  StateFormat,
  StateWithEffects,
  Subscriber,
  Transform,
  View,
  ViewComponent,
  Vista,
  VistaView,
}

// -----------------------------------------------------------------------------

type ActionWithPayload<S, P = any> = [action: Action<S, P>, payload: P]

type Content<S> = number | string | MaybeVNode<S>

type CustomProps<T, S, P> = CustomPayloads<S, P> & T

// An effecter is where side effects and any additional dispatching may occur.
type Effecter<S, P> = (dispatch: Dispatch<S>, payload: P) => void | Promise<void>

type Reaction<S, P = any> = Action<S, P> | ActionWithPayload<S, P>

type StateFormat<S, P = any> = S | StateWithEffects<S, P>

// State can be associated with a list of effects to run.
type StateWithEffects<S, P = any> = [state: S, ...effects: Effect<S, P>[]]

// A subscriber reacts to subscription updates.
type Subscriber<S, P> = (dispatch: Dispatch<S>, payload: P) => void | Unsubscribe

// A transform carries out the transition from one state to another.
type Transform<S, P = any> = (state: StateFormat<S>, payload: P) => StateFormat<S>

type View<S> = (state: S) => MaybeVNode<S>

type ViewComponent<S, P> = <X>(
  props: CustomPayloads<S, X> & P,
  content: MaybeVNode<S>[]
) => MaybeVNode<S>
// Credit: https://github.com/jorgebucaran/hyperapp/discussions/1052#discussioncomment-630744

type Vista<S> = Content<S> | VistaView<S> | Vista<S>[]

type VistaView<S> = (state: S) => MaybeVNode<S> | MaybeVNode<S>[]
