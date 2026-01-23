import { evaluateTokens, type Operand, tokenizeExpression } from './token'

export type WhenCtx = (
  context: Record<string, unknown>,
) => (strings: TemplateStringsArray, ...values: Operand[]) => (fn: () => void) => void

export const whenCtx: WhenCtx = context => {
  assertNoFunctions(context)
  return (strings: TemplateStringsArray, ...values: Operand[]) => {
    let expr = ''
    const ctxValues: Operand[] = []
    strings.forEach((str, i) => {
      expr += str.replace(/#([a-zA-Z0-9_.$]+)/g, (_, name) => {
        if (!(name in context)) {
          throw new Error(`Unknown context variable: #${name}`)
        }
        ctxValues.push(context[name])
        return '${' + (ctxValues.length - 1) + '}'
      })
      if (i < values.length) {
        expr += '${' + (ctxValues.length + i) + '}'
      }
    })
    const allValues = [...ctxValues, ...values]
    return (fn: () => void) => {
      const tokens = tokenizeExpression(expr)
      if (evaluateTokens(tokens, allValues)) {
        fn()
      }
    }
  }
}

const assertNoFunctions = (context: Record<string, unknown>): void => {
  for (const [key, value] of Object.entries(context)) {
    if (typeof value === 'function') {
      throw new Error(`Functions are not allowed in context: ${key}`)
    }
  }
}
