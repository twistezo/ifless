import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Boolean conversion (truthy/falsy, !!)', () => {
  it('treats truthy values as true', () => {
    const fn = vi.fn()
    when`${'string'} AND ${42}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('treats falsy values as false', () => {
    const fn = vi.fn()
    when`${0} OR ${''}`(fn)
    expect(fn).not.toHaveBeenCalled()
  })
})
