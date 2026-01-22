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

  it('handles chained nullish and ternary', () => {
    const a = undefined
    const b = null
    const c = 'fallback'
    const d = 'final'
    const result = (a ?? b) ? 'should not happen' : (c ?? d)
    expect(result).toBe('fallback')
    const a2 = 0
    const result2 = (a2 ?? b) ? 'zero' : (c ?? d)
    expect(result2).toBe('fallback')
  })

  it('combines logical, ternary, and nullish in one expression', () => {
    const a = false
    const b = null
    const c = true
    const d = 'ok'
    const e = undefined
    const result = a && (b ?? c) ? 'bad' : (d ?? e)
    expect(result).toBe('ok')
  })

  it('handles nested short-circuit with functions', () => {
    const fn = vi.fn()
    const a = false
    const b = () => {
      fn()
      return true
    }
    const c = null
    const result = a && b() ? 'bad' : (c ?? 'fallback')
    expect(result).toBe('fallback')
    expect(fn).not.toHaveBeenCalled()
  })

  it('handles multiple fallback values with nullish', () => {
    const a = undefined
    const b = null
    const c = 0
    const d = false
    const e = 'final'
    const result = a ?? b ?? c ?? d ?? e
    expect(result).toBe(0)
    const result2 = b ?? a ?? d ?? e
    expect(result2).toBe(false)
  })
})
