import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Template literals with embedded values', () => {
  it('works with object property access', () => {
    const fn = vi.fn()
    const user = { profile: { email: 'a@b.com', phone: null } }
    when`${user} AND ${user.profile}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('works with any interpolated value', () => {
    const fn = vi.fn()
    when`${1} AND ${'nonempty'} AND ${[]} AND ${{}}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles template with expressions and functions', () => {
    const fn = vi.fn()
    const a = 1
    const b = () => true
    when`${a + 1} AND ${b}`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles template with nested template literals', () => {
    const fn = vi.fn()
    const a = 'x'
    const b = `y${a}`
    when`${a} AND ${b}`(fn)
    expect(fn).toHaveBeenCalled()
  })
})
