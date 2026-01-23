import { buildExpression } from './expression'
import { evaluateTokens, type Operand, type Token, tokenizeExpression } from './token'

export type WhenBaseFn = (strings: TemplateStringsArray, ...values: Operand[]) => WhenBaseResult
type WhenBaseResult = (fn: () => void) => void

// && {
//   ctx: WhenCtx
// }

export const whenBase: WhenBaseFn = (strings, ...values) => {
  const expression: string = buildExpression(strings, values)
  console.log('Built expression:', expression)

  const evaluate: WhenBaseResult = (fn: () => void): void => {
    const tokens: Token[] = tokenizeExpression(expression)
    console.log('Tokenized expression:', tokens)

    if (evaluateTokens(tokens, values)) {
      fn()
    }
  }

  return evaluate
}
