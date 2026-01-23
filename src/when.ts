import type { WhenContext } from './context'

import { buildExpression } from './expression'
import { evaluateTokens, type Operand, type Token, tokenizeExpression } from './token'

export type WhenBase = ((strings: TemplateStringsArray, ...values: Operand[]) => WhenBaseResult) &
  Partial<{
    ctx: WhenContext
  }>

export type WhenBaseResult = (fn: () => void) => void

export const whenBase: WhenBase = (strings, ...values) => {
  const expression: string = buildExpression(strings, values)

  const evaluate: WhenBaseResult = (fn: () => void): void => {
    const tokens: Token[] = tokenizeExpression(expression)

    if (evaluateTokens(tokens, values)) {
      fn()
    }
  }

  return evaluate
}
