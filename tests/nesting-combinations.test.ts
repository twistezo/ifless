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
})
