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

  it('handles 20+ operands and deep nesting', () => {
    const fn = vi.fn()
    const arr = Array(25).fill(true)
    arr[5] = false
    arr[15] = false
    when`(${arr[0]} AND ${arr[1]} AND ${arr[2]} AND ${arr[3]} AND ${arr[4]} AND ${arr[5]}) OR (${arr[6]} AND ${arr[7]} AND ${arr[8]} AND ${arr[9]} AND ${arr[10]} AND ${arr[11]}) OR (${arr[12]} AND ${arr[13]} AND ${arr[14]} AND ${arr[15]} AND ${arr[16]} AND ${arr[17]}) OR (${arr[18]} AND ${arr[19]} AND ${arr[20]} AND ${arr[21]} AND ${arr[22]} AND ${arr[23]} AND ${arr[24]})`(
      fn,
    )
    expect(fn).toHaveBeenCalled()
  })
})
