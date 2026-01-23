import type { WhenBaseResult } from './when'

import { buildAliasedExpression } from './expression'
import { evaluateTokens, type Operand, type Token, tokenizeExpression } from './token'

export type AllowedValue = boolean | null | number | string | undefined

export type WhenContext = (
  context: Record<string, AllowedValue>,
) => (strings: TemplateStringsArray, ...values: Operand[]) => WhenBaseResult

export const whenContext: WhenContext = context => {
  void assertNoFunctions(context)

  return (strings: TemplateStringsArray, ...values: Operand[]): WhenBaseResult => {
    const { contextValues, expression } = buildAliasedExpression(strings, values, context)
    const allValues: Operand[] = [...contextValues, ...values]

    return (fn: () => void) => {
      const tokens: Token[] = tokenizeExpression(expression)

      if (evaluateTokens(tokens, allValues)) {
        fn()
      }
    }
  }
}

const assertNoFunctions = (context: Record<string, AllowedValue>): void => {
  for (const [key, value] of Object.entries(context)) {
    if (typeof value === 'function') {
      throw new Error(`Functions are not allowed in context: ${key}`)
    }
  }
}
