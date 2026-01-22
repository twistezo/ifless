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
})
