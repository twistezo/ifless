import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Edge cases', () => {
  it('handles 0 and empty string as falsy', () => {
    const fn = vi.fn()
    when`${0} OR ${''}`(fn)
    expect(fn).not.toHaveBeenCalled()
    const fn2 = vi.fn()
    when`${0} OR ${1}`(fn2)
    expect(fn2).toHaveBeenCalled()
  })

  it('handles deeply nested parentheses', () => {
    const fn = vi.fn()
    when`(((((((((((${true})))))))))))`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles empty template', () => {
    const fn = vi.fn()
    when``(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('throws on only operators and whitespace', () => {
    const fn = vi.fn()
    expect(() => when`   AND   OR   `(fn)).toThrow()
  })

  it('throws on only parentheses', () => {
    const fn = vi.fn()
    expect(() => when`(((())))`(fn)).toThrow()
  })
})
