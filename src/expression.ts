import type { Operand } from './types'

import { evaluateToken, type EvaluationResult, type EvaluationState, type Token } from './token'

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
