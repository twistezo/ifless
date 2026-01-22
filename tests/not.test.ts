import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Logical NOT (NOT, !)', () => {
  it('executes fn if operand is false', () => {
    const fn = vi.fn()
    when`NOT ${false}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('does not execute fn if operand is true', () => {
    const fn = vi.fn()
    when`NOT ${true}`(fn)
    expect(fn).not.toHaveBeenCalled()
  })

  it('works with ! as alias', () => {
    const fn = vi.fn()
    when`!${false}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles double negation', () => {
    const fn = vi.fn()
    when`NOT NOT ${true}`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`!!${false}`(fn2)
    expect(fn2).toHaveBeenCalled()
  })

  it('handles NOT with parentheses', () => {
    const fn = vi.fn()
    when`NOT (${false} OR ${false})`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`NOT (${true} AND ${true})`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })
})
