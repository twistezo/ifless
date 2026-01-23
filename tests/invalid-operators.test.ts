import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Invalid operators only', () => {
  it('throws on unknown operators', () => {
    const fn = vi.fn()
    expect(() => when`??? ??? ???`(fn)).toThrow('Invalid token: ???')
  })

  it('throws on mix of valid and invalid operators', () => {
    const fn = vi.fn()
    expect(() => when`${true} ??? AND ??? ${true}`(fn)).toThrow('Invalid token: ???')
    const fn2 = vi.fn()
    expect(() => when`${false} ???`(fn2)).toThrow('Invalid token: ???')
  })

  it('throws on only whitespace and invalid tokens', () => {
    const fn = vi.fn()
    expect(() => when`   ???   ???   `(fn)).toThrow('Invalid token: ???')
  })
})
