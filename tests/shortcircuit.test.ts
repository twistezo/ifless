import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Short-circuit evaluation (lazy function calls)', () => {
  it('does not call function if short-circuited', () => {
    const fn = vi.fn()
    const a = false
    const b = () => {
      fn()
      return true
    }
    when`${a} AND ${b}`(() => {})
    expect(fn).not.toHaveBeenCalled()
  })

  it('calls function if not short-circuited', () => {
    const fn = vi.fn()
    const a = true
    const b = () => {
      fn()
      return true
    }
    when`${a} AND ${b}`(() => {})
    expect(fn).toHaveBeenCalled()
  })
})
