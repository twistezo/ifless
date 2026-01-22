import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Logical AND (AND, &&)', () => {
  it('executes fn when all operands are true', () => {
    const fn = vi.fn()
    when`${true} AND ${true}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('does not execute fn if any operand is false', () => {
    const fn = vi.fn()
    when`${true} AND ${false}`(fn)
    expect(fn).not.toHaveBeenCalled()
  })

  it('works with && as alias', () => {
    const fn = vi.fn()
    when`${true} && ${true}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles multiple operands', () => {
    const fn = vi.fn()
    when`${true} AND ${true} AND ${true}`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`${true} AND ${false} AND ${true}`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })

  it('handles nested AND with parentheses', () => {
    const fn = vi.fn()
    when`(${true} AND ${true}) AND ${true}`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`(${true} AND ${false}) AND ${true}`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })

  it('handles AND with functions', () => {
    const f1 = vi.fn(() => true)
    const f2 = vi.fn(() => false)
    when`${f1} AND ${f2}`(() => {})
    expect(f1).toHaveBeenCalled()
    expect(f2).toHaveBeenCalled()
  })
})
