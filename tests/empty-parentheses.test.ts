import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Empty parentheses', () => {
  it('handles empty parentheses as always true', () => {
    const fn = vi.fn()
    when`((()))`(fn)
    expect(fn).toHaveBeenCalled()
  })
})
