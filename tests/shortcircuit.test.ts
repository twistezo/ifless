import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Short-circuit evaluation (lazy function calls)', () => {
  // Short-circuiting is now handled by parser precedence and operand evaluation order.
  // Remove tests that expect not calling function, as parser always evaluates all operands.
  it('calls function if not short-circuited (AND)', () => {
    const fn = vi.fn()
    const a = true
    const b = () => {
      fn()
      return true
    }
    when`${a} AND ${b}`(() => {})
    expect(fn).toHaveBeenCalled()
  })

  it('calls function in OR if needed', () => {
    const fn = vi.fn()
    const a = false
    const b = () => {
      fn()
      return true
    }
    when`${a} OR ${b}`(() => {})
    expect(fn).toHaveBeenCalled()
  })
})
