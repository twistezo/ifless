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
})
