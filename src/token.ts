export type EvaluationResult = (() => boolean) | boolean | Token
export type EvaluationState = {
  index: number
  tokens: Token[]
  values: Operand[]
}
export type Operand = unknown

export type Token =
  | { index: number; type: 'operand' }
  | { type: 'and' }
  | { type: 'lparen' }
  | { type: 'not' }
  | { type: 'or' }
  | { type: 'rparen' }

export const tokenizeExpression = (expression: string): Token[] => {
  const rawTokens = expression
    .replace(/\bAND\b/g, '&&')
    .replace(/\bOR\b/g, '||')
    .replace(/\bNOT\b/g, '!')
    .split(/(\s+|\(|\))/)
    .filter(t => t.trim().length > 0)

  return rawTokens.map(t => {
    if (t === '&&') return { type: 'and' }
    else if (t === '||') return { type: 'or' }
    else if (t === '!') return { type: 'not' }
    else if (t === '(') return { type: 'lparen' }
    else if (t === ')') return { type: 'rparen' }
    else if (/^\$\{\d+\}$/.test(t)) return { index: parseInt(t.slice(2, -1)), type: 'operand' }
    else {
      throw new Error(`Invalid token: ${t}`)
    }
  })
}

export const evaluateTokens = (tokens: Token[], values: Operand[]): boolean => {
  const state: EvaluationState = {
    index: 0,
    tokens,
    values,
  }

  return parseOr(state)
}

const parseOr = (state: EvaluationState): boolean => {
  let left: boolean = parseAnd(state)
  while (peek(state)?.type === 'or') {
    next(state)
    const right: boolean = parseAnd(state)
    left = left || right
  }

  return left
}

const parseAnd = (state: EvaluationState): boolean => {
  let left: boolean = parseUnary(state)
  while (peek(state)?.type === 'and') {
    next(state)
    const right: boolean = parseUnary(state)
    left = left && right
  }

  return left
}

const parseUnary = (state: EvaluationState): boolean => {
  const token: Token | undefined = next(state)
  if (!token) {
    return true
  }

  if (token.type === 'not') {
    return !parseUnary(state)
  }

  if (token.type === 'lparen') {
    const value: boolean = parseOr(state)
    const closing: Token | undefined = next(state)

    if (!closing || closing.type !== 'rparen') {
      throw new SyntaxError('Missing closing parenthesis')
    }
    return value
  }

  if (token.type === 'operand') {
    return toBoolean(state.values[token.index])
  }
  throw new SyntaxError(`Unexpected token: ${JSON.stringify(token)}`)
}

const peek = (state: EvaluationState): Token | undefined => state.tokens[state.index]
const next = (state: EvaluationState): Token | undefined => state.tokens[state.index++]

const toBoolean = (value: Operand): boolean => {
  if (typeof value === 'function') return Boolean(value())
  return Boolean(value)
}
