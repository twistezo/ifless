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

  it('handles boolean conversion for arrays and objects', () => {
    const fn = vi.fn()
    when`${[]} AND ${{}}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles boolean conversion for null and undefined', () => {
    const fn = vi.fn()
    when`${null} AND ${undefined}`(fn)
    expect(fn).not.toHaveBeenCalled()
  })

  it('handles boolean conversion for symbols and bigints', () => {
    const fn = vi.fn()
    when`${Symbol('x')} AND ${BigInt(1)}`(fn)
    expect(fn).toHaveBeenCalled()
  })
})
