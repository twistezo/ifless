import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Parentheses for grouping and nesting', () => {
  it('handles grouping with parentheses', () => {
    const fn = vi.fn()
    const a = true
    const b = false
    const c = true
    when`(${a} AND ${b}) OR (${c} AND NOT ${b})`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles deeply nested parentheses', () => {
    const fn = vi.fn()
    when`(((((((((((${true})))))))))))`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles parentheses with all operators', () => {
    const fn = vi.fn()
    when`(${true} AND (${false} OR (${true} AND NOT ${false})))`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('throws on empty parentheses in complex expression', () => {
    const fn = vi.fn()
    expect(() => when`((())) AND (${true})`(fn)).toThrow('Unexpected token: {"type":"rparen"}')
    const fn2 = vi.fn()
    expect(() => when`((())) OR (${false})`(fn2)).toThrow('Unexpected token: {"type":"rparen"}')
  })
})
