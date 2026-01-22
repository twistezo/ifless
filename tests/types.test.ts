import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('Various operand types', () => {
  it('handles symbol, bigint, function, array, object, string, number, boolean, null, undefined', () => {
    const fn = vi.fn()
    const sym = Symbol('x')
    const big = BigInt(123)
    const arr = [1]
    const obj = { a: 1 }
    const str = 'abc'
    const num = 42
    const bool = true
    const nul = null
    const und = undefined
    const fun = () => true
    when`${sym} AND ${big} AND ${arr} AND ${obj} AND ${str} AND ${num} AND ${bool} AND ${fun}`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`${nul} OR ${und}`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })

  it('handles mixed types in complex expressions', () => {
    const fn = vi.fn()
    const sym = Symbol('y')
    const big = BigInt(0)
    const arr = []
    const obj = {}
    const str = ''
    const num = 0
    const bool = false
    const fun = () => false
    when`${sym} OR ${big} OR ${arr} OR ${obj} OR ${str} OR ${num} OR ${bool} OR ${fun}`(fn)
    expect(fn).toHaveBeenCalled()
    const fn2 = vi.fn()
    when`${str} AND ${num} AND ${bool}`(fn2)
    expect(fn2).not.toHaveBeenCalled()
  })
})
