import { VNode, h, text } from "hyperapp"

export const readout = <S>(prop: string) => (obj: Record<string, unknown>): VNode<S> =>
  h("pre", {}, text(`${prop}: ${JSON.stringify(obj[prop], readoutReplacer, 2)}`))

const readoutReplacer = <T>(_key: unknown, value: T): T | string =>
  typeof value === "function" ? "function" : value
