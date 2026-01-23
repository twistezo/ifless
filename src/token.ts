import { evaluateExpression } from './expression'

export type EvaluationResult = (() => boolean) | boolean | Token
export type EvaluationState = {
  index: number
  tokens: Token[]
  values: Operand[]
}
export type Operand = unknown
export type Token = string

export const tokenizeExpression = (expression: string): Token[] =>
  expression
    .replace(/\bAND\b/g, '&&') // replace 'AND' with '&&'
    .replace(/\bOR\b/g, '||') // replace 'OR' with '||'
    .replace(/\bNOT\b/g, '!') // replace 'NOT' with '!'
    .split(/(\s+|\(|\))/) // split by whitespace, '(' or ')'
    .filter((token: Token): boolean => token.trim().length > 0)

export const evaluateTokens = (tokens: Token[], values: Operand[]): boolean => {
  const state: EvaluationState = {
    index: 0,
    tokens,
    values,
  }

  return evaluateExpression(state)
}

export const evaluateToken = (
  state: EvaluationState,
  evaluateExpression: (state: EvaluationState) => boolean,
): EvaluationResult => {
  const { tokens, values } = state
  console.log('state:', state)

  const token: Token = tokens[state.index++]
  if (!token) {
    // falsy token
    return true
  }

  if (token === '!') {
    // negation
    const operand: Operand = evaluateToken(state, evaluateExpression)
    if (typeof operand === 'function') {
      // short-circuiting support
      return () => !operand()
    }
    return !operand
  }

  if (token === '(') {
    // recursive evaluation of sub-expression
    const value = evaluateExpression(state)
    state.index++ // skip ')'
    return value
  }

  if (token.startsWith('${')) {
    return parseOperand(token, values)
  }

  return token
}

const parseOperand = (token: Token, values: Operand[]): (() => boolean) => {
  const valueIndex: number = parseInt(token.slice(2, -1))

  // returns function because short-circuiting
  return () => toBoolean(values[valueIndex])
}

const toBoolean = (value: Operand): boolean => {
  if (typeof value === 'function') {
    return Boolean(value())
  } else if (value === false || value === 0) {
    return false
  } else {
    return Boolean(value)
  }
}
