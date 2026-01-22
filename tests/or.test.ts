import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Logical OR (OR, ||)', () => {
  it('executes fn if any operand is true', () => {
    const fn = vi.fn()
    when`${false} OR ${true}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('does not execute fn if all operands are false', () => {
    const fn = vi.fn()
    when`${false} OR ${false}`(fn)
    expect(fn).not.toHaveBeenCalled()
  })

  it('works with || as alias', () => {
    const fn = vi.fn()
    when`${false} || ${true}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles multiple operands', () => {
    const fn = vi.fn()
    when`${false} OR ${false} OR ${true}`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`${false} OR ${false} OR ${false}`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })

  it('handles nested OR with parentheses', () => {
    const fn = vi.fn()
    when`(${false} OR ${false}) OR ${true}`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`(${false} OR ${false}) OR ${false}`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })

  it('handles OR with functions', () => {
    const f1 = vi.fn(() => false)
    const f2 = vi.fn(() => true)
    when`${f1} OR ${f2}`(() => {})
    expect(f1).toHaveBeenCalled()
    expect(f2).toHaveBeenCalled()
  })
})
