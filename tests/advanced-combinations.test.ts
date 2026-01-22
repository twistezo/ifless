import { describe, expect, it, vi } from 'bun:test'

describe('Advanced combinations: ternary, nullish, short-circuit', () => {
  it('supports ternary and nested ternary (JS only)', () => {
    const a = true
    const b = false
    const c = 'yes'
    const d = 'no'
    const result = a ? (b ? 'bad' : c) : d
    expect(result).toBe('yes')
  })

  it('supports nullish + short-circuit combo', () => {
    const fn = vi.fn()
    const input = null
    const defaultValue = false
    const isActive = true
    const doTask = () => {
      fn()
      return true
    }
    const fallback = false
    const result = (input ?? defaultValue) ? isActive && doTask() : fallback || 'none'
    expect(result).toBe('none')
    expect(fn).not.toHaveBeenCalled()
    // Also test when input is truthy
    const input2 = 1
    const result2 = (input2 ?? defaultValue) ? isActive && doTask() : fallback || 'none'
    expect(result2).toBe(true)
    expect(fn).toHaveBeenCalled()
  })
})
