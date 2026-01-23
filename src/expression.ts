import type { AllowedValue } from './context'
import type { Operand } from './token'

export const buildExpression = (strings: TemplateStringsArray, values: Operand[]): string => {
  let result: string = ''
  strings.forEach((el: string, i: number): void => {
    result += el

    if (i < values.length) {
      result += '${' + i + '}'
    }
  })

  return result
}

export const buildAliasedExpression = (
  strings: TemplateStringsArray,
  values: Operand[],
  context: Record<string, AllowedValue>,
): {
  contextValues: Operand[]
  expression: string
} => {
  let expression: string = ''
  const contextValues: Operand[] = []

  strings.forEach((str: string, i: number) => {
    expression += str.replace(/#([a-zA-Z0-9_]+)/g, (_, name) => {
      if (/[^a-zA-Z0-9_]/.test(name)) {
        throw new Error(
          `Invalid alias: #${name}. Only letters, numbers, and underscores are allowed.`,
        )
      }

      if (!(name in context)) {
        throw new Error(`Unknown context variable: #${name}`)
      }
      contextValues.push(context[name])
      return '${' + (contextValues.length - 1) + '}'
    })

    if (i < values.length) {
      expression += '${' + (contextValues.length + i) + '}'
    }
  })

  return {
    contextValues,
    expression,
  }
}
