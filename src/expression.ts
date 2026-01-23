import type { AllowedValue } from './context'

import {
  evaluateToken,
  type EvaluationResult,
  type EvaluationState,
  type Operand,
  type Token,
} from './token'

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

export const evaluateExpression = (state: EvaluationState): boolean => {
  let left: EvaluationResult = evaluateToken(state, evaluateExpression)

  if (typeof left === 'function') {
    left = left()
  }

  while (state.index < state.tokens.length) {
    const operator: Token = state.tokens[state.index]

    if (operator === ')' || !operator) {
      break
    }

    state.index++
    switch (operator) {
      case '&&': {
        if (!left) {
          evaluateToken(state, evaluateExpression)
          return false
        }

        let right: EvaluationResult = evaluateToken(state, evaluateExpression)
        if (typeof right === 'function') {
          right = right()
        }

        left = left && right
        break
      }

      case '||': {
        if (left) {
          evaluateToken(state, evaluateExpression)
          return true
        }

        let right: EvaluationResult = evaluateToken(state, evaluateExpression)
        if (typeof right === 'function') {
          right = right()
        }

        left = left || right
        break
      }

      default:
        break
    }
  }

  return left as boolean
}
