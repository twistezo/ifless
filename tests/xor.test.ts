import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Logical XOR (XOR, ^)', () => {
  it('executes fn if exactly one operand is true', () => {
    const fn = vi.fn()
    when`${true} XOR ${false}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('does not execute fn if both operands are true or both are false', () => {
    const fn = vi.fn()
    when`${true} XOR ${true}`(fn)
    expect(fn).not.toHaveBeenCalled()
    const fn2 = vi.fn()
    when`${false} XOR ${false}`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })

  it('works with ^ as alias', () => {
    const fn = vi.fn()
    when`${true} ^ ${false}`(fn)
    expect(fn).toHaveBeenCalled()
  })
})
