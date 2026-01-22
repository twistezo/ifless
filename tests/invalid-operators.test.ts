import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Invalid operators only', () => {
  it('treats unknown operators as always true (no-op)', () => {
    const fn = vi.fn()
    when`??? ??? ???`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles mix of valid and invalid operators', () => {
    const fn = vi.fn()
    when`${true} ??? AND ??? ${true}`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`${false} ???`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })

  it('handles only whitespace and invalid tokens', () => {
    const fn = vi.fn()
    when`   ???   ???   `(fn)
    expect(fn).toHaveBeenCalled()
  })
})
