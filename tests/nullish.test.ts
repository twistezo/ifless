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
})
