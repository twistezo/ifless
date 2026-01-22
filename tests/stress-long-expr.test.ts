import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Stress: very long and mixed expression', () => {
  it('handles 10+ operands and mixed operators', () => {
    const fn = vi.fn()
    const arr = [true, true, false, true, true, false, true, true, true, true]
    // (true && true && false) || (true && true && false) || (true && true && true && true)
    when`${arr[0]} AND ${arr[1]} AND ${arr[2]} OR ${arr[3]} AND ${arr[4]} AND ${arr[5]} OR ${arr[6]} AND ${arr[7]} AND ${arr[8]} AND ${arr[9]}`(
      fn,
    )
    expect(fn).toHaveBeenCalled()
  })
})
