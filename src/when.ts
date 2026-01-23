import type { Operand } from './types'

import { buildExpression } from './expression'
import { evaluateTokens, type Token, tokenizeExpression } from './token'

export type WhenBaseFn = (strings: TemplateStringsArray, ...values: Operand[]) => WhenBaseReturn
type WhenBaseReturn = (fn: () => void) => void

// && {
//   ctx: WhenCtx
// }

export const whenBase: WhenBaseFn = (strings, ...values) => {
  const expression: string = buildExpression(strings, values)
  console.log('Built expression:', expression)

  const evaluate: WhenBaseReturn = (fn: () => void): void => {
    const tokens: Token[] = tokenizeExpression(expression)
    console.log('Tokenized expression:', tokens)

    if (evaluateTokens(tokens, values)) {
      fn()
    }
  }

  return evaluate
}
