import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Realistic usage scenarios', () => {
  it('replaces multiple nested ifs with single when', () => {
    const fn = vi.fn()
    const user = { profile: { email: 'a@b.com', phone: null } }
    when`
      ${user}
      AND ${user.profile}
      AND (${user.profile.email} OR ${user.profile.phone})
    `(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles nested negations', () => {
    const fn = vi.fn()
    const a = true
    const b = false
    when`NOT (${a} AND NOT ${b})`(fn)
    expect(fn).not.toHaveBeenCalled()
  })
})
