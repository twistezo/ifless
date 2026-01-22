import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Invalid operators only', () => {
  it('treats unknown operators as always true (no-op)', () => {
    const fn = vi.fn()
    when`??? ??? ???`(fn)
    expect(fn).toHaveBeenCalled()
  })
})
