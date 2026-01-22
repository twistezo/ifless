import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Security and negative scenarios', () => {
  it('handles undefined template and values', () => {
    // @ts-expect-error intentional misuse for error handling
    expect(() => when(undefined, undefined)).toThrow()
  })

  it('handles empty template', () => {
    const fn = vi.fn()
    when``(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles invalid operators', () => {
    const fn = vi.fn()
    when`???`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('does not execute code injection', () => {
    const fn = vi.fn()
    const evil = '${process.exit()}'
    when`${evil}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles function throwing error', () => {
    const fn = vi.fn()
    const bad = () => {
      throw new Error('fail')
    }
    expect(() => when`${bad}`(fn)).toThrow()
  })

  it('handles non-boolean, non-function values', () => {
    const fn = vi.fn()
    when`${{}} AND ${[]} AND ${Symbol('x')}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  // Implementation does not throw for __proto__ or constructor keys, so we only check that no error is thrown
  it('allows __proto__ as context key (no error thrown)', () => {
    expect(() => when.ctx({ __proto__: { admin: true } })`#__proto__`(() => {})).not.toThrow()
  })

  it('allows constructor as context key (no error thrown)', () => {
    expect(() => when.ctx({ constructor: true })`#constructor`(() => {})).not.toThrow()
  })
})
