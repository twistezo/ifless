import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Empty parentheses', () => {
  it('handles empty parentheses as always true', () => {
    const fn = vi.fn()
    when`((()))`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles nested empty parentheses with AND/OR', () => {
    const fn = vi.fn()
    when`((())) AND ((()))`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`((())) OR ((()))`(fn2)
    expect(fn2).toHaveBeenCalled()
  })

  it('handles empty parentheses with NOT', () => {
    const fn = vi.fn()
    when`NOT ((()))`(fn)
    expect(fn).not.toHaveBeenCalled()
  })
})
