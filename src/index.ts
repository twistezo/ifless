// Any value that can be used as a logic operand
export type Operand = unknown

// Converts any value to boolean, treating null/undefined as false
const toBoolean = (value: Operand): boolean => {
  if (typeof value === 'function') {
    return Boolean(value())
  }

  return value !== null && value !== undefined && Boolean(value)
}

// Builds a string representation of the template literal with placeholders
const buildExpressionString = (strings: TemplateStringsArray, values: Operand[]): string => {
  let result = ''
  strings.forEach((str, i) => {
    result += str
    if (i < values.length) {
      result += '${' + i + '}'
    }
  })
  return result
}

// Tokenizes the logic expression, replacing natural language operators
const tokenizeExpression = (expression: string): string[] =>
  expression
    .replace(/\bAND\b/g, '&&')
    .replace(/\bOR\b/g, '||')
    .replace(/\bNOT\b/g, '!')
    .replace(/\bXOR\b/g, '^')
    .split(/(\s+|\(|\))/)
    .filter(token => token.trim().length > 0)

// Returns a function that evaluates the operand at runtime
const parseOperand = (token: string, values: Operand[]): (() => boolean) | string => {
  if (token.startsWith('${')) {
    const valueIndex = parseInt(token.slice(2, -1))
    return () => toBoolean(values[valueIndex])
  }
  return token
}

type EvalState = {
  index: number
  tokens: string[]
  values: Operand[]
}

// Evaluates a single token (operand, operator, or parenthesis)
const evaluateToken = (
  state: EvalState,
  evaluateExpression: (state: EvalState) => boolean,
): unknown => {
  const { tokens, values } = state
  const token = tokens[state.index++]
  if (!token) {
    return true
  }
  if (token === '!') {
    const operand = evaluateToken(state, evaluateExpression)
    if (typeof operand === 'function') {
      return () => !operand()
    }

    return !operand
  }
  if (token === '(') {
    const value = evaluateExpression(state)
    state.index++ // skip )

    return value
  }
  if (token.startsWith('${')) {
    return parseOperand(token, values)
  }

  return token
}

// Evaluates a full expression (recursive descent)
const evaluateExpression = (state: EvalState): boolean => {
  let left = evaluateToken(state, evaluateExpression)
  if (typeof left === 'function') {
    left = left()
  }
  while (state.index < state.tokens.length) {
    const operator = state.tokens[state.index]
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
        let right = evaluateToken(state, evaluateExpression)
        if (typeof right === 'function') {
          right = right()
        }
        left = left && right
        break
      }
      case '^': {
        // XOR
        let right = evaluateToken(state, evaluateExpression)
        if (typeof right === 'function') {
          right = right()
        }
        left = Boolean(left) !== Boolean(right)
        break
      }
      case '||': {
        if (left) {
          evaluateToken(state, evaluateExpression)
          return true
        }
        let right = evaluateToken(state, evaluateExpression)
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

// Entry point for evaluating tokenized expressions
const evaluateTokens = (tokens: string[], values: Operand[]): boolean => {
  const state: EvalState = { index: 0, tokens, values }
  return evaluateExpression(state)
}

// Main API: tagged template for logic expressions
export const when = (strings: TemplateStringsArray, ...values: Operand[]) => {
  const expression = buildExpressionString(strings, values)

  const evaluate = (fn: () => void): void => {
    const tokens = tokenizeExpression(expression)
    if (evaluateTokens(tokens, values)) {
      fn()
    }
  }

  return evaluate
}
