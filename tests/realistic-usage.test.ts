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

  it('handles real-world feature flag scenario', () => {
    const fn = vi.fn()
    const user = { isAdmin: false, isBeta: true }
    const featureEnabled = true
    // Przekazujemy wartości jako booleany przez interpolację
    when`${!!featureEnabled} AND (${!!user.isAdmin} OR ${!!user.isBeta})`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    const orResult = !!user.isAdmin || false // false
    when`${!!featureEnabled} AND ${orResult}`(fn2)
    expect(fn2).not.toHaveBeenCalled() // user.isAdmin is false, OR is false, AND is false
  })

  it('handles permission check with context', () => {
    const fn = vi.fn()
    const ctx = { canEdit: true, isOwner: false }
    when.ctx(ctx)`#canEdit OR #isOwner`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when.ctx(ctx)`#canEdit AND #isOwner`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })
})
