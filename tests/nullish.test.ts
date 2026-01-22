import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Null/undefined as false', () => {
  it('treats null and undefined as false', () => {
    const fn = vi.fn()
    when`${null} AND ${undefined}`(fn)
    expect(fn).not.toHaveBeenCalled()
  })

  it('works with nullish coalescing', () => {
    const fn = vi.fn()
    const obj: { x: boolean | null } = { x: null }
    when`${obj.x ?? false}`(fn)
    expect(fn).not.toHaveBeenCalled()
    const obj2: { x: boolean | null } = { x: true }
    when`${obj2.x ?? false}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles multiple nullish values', () => {
    const fn = vi.fn()
    const a = undefined
    const b = null
    const c = false
    when`${a ?? b ?? c}`(fn)
    expect(fn).not.toHaveBeenCalled()
    const d = 1
    const fn2 = vi.fn()
    when`${a ?? b ?? d}`(fn2)
    expect(fn2).toHaveBeenCalled()
  })

  it('handles nullish with AND/OR', () => {
    const fn = vi.fn()
    const a = null
    const b = 0
    when`${a ?? b} AND ${true}`(fn)
    expect(fn).not.toHaveBeenCalled()
    const fn2 = vi.fn()
    when`${a ?? 1} OR ${false}`(fn2)
    expect(fn2).toHaveBeenCalled()
  })
})
