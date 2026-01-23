import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Empty parentheses', () => {
  it('throws on empty parentheses', () => {
    const fn = vi.fn()
    expect(() => when`((()))`(fn)).toThrow('Unexpected token: {"type":"rparen"}')
  })

  it('throws on nested empty parentheses with AND/OR', () => {
    const fn = vi.fn()
    expect(() => when`((())) AND ((()))`(fn)).toThrow('Unexpected token: {"type":"rparen"}')
    const fn2 = vi.fn()
    expect(() => when`((())) OR ((()))`(fn2)).toThrow('Unexpected token: {"type":"rparen"}')
  })

  it('throws on empty parentheses with NOT', () => {
    const fn = vi.fn()
    expect(() => when`NOT ((()))`(fn)).toThrow('Unexpected token: {"type":"rparen"}')
  })
})
