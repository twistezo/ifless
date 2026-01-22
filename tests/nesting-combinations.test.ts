import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Arbitrary nesting and combinations', () => {
  it('handles complex nested logic', () => {
    const fn = vi.fn()
    const a = true
    const b = true
    const c = false
    const d = true
    const e = false
    when`(${a} AND ${b}) OR (NOT ${c} AND (${d} OR ${e}))`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles deeply nested mixed operators', () => {
    const fn = vi.fn()
    when`(((${true} AND (${false} OR (${true} AND NOT ${false})))) OR ${false})`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles alternating AND/OR with parentheses', () => {
    const fn = vi.fn()
    when`(${true} AND (${false} OR ${true})) OR (${false} AND ${true})`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`(${false} AND (${false} OR ${false})) OR (${false} AND ${false})`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })
})
