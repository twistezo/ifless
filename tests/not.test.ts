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

  it('throws on ! as alias for interpolated value', () => {
    const fn = vi.fn()
    expect(() => when`!${false}`(fn)).toThrow('Invalid token: !${0}')
  })

  it('handles double negation for NOT keyword, throws for !! on interpolated value', () => {
    const fn = vi.fn()
    when`NOT NOT ${true}`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    expect(() => when`!!${false}`(fn2)).toThrow('Invalid token: !!${0}')
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
