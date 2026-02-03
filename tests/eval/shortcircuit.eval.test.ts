import { describe, expect, it } from 'bun:test'

import { when } from '../../src/index'

describe('Short-circuit evaluation - eval comparison', () => {
  it('should evaluate all function operands and match eval() result with AND', () => {
    const fn1 = () => false
    const fn2 = () => true

    let whenResult = false
    when`${fn1} AND ${fn2}`(() => {
      whenResult = true
    })

    const evalResult = eval('fn1() && fn2()')
    expect(whenResult).toBe(evalResult)
    expect(whenResult).toBe(false)
  })

  it('should evaluate all function operands and match eval() result with OR', () => {
    const fn1 = () => true
    const fn2 = () => false

    let whenResult = false
    when`${fn1} OR ${fn2}`(() => {
      whenResult = true
    })

    const evalResult = eval('fn1() || fn2()')
    expect(whenResult).toBe(evalResult)
    expect(whenResult).toBe(true)
  })

  it('should match eval() result for function returning true AND true', () => {
    const fn1 = () => true
    const fn2 = () => true

    let whenResult = false
    when`${fn1} AND ${fn2}`(() => {
      whenResult = true
    })

    const evalResult = eval('fn1() && fn2()')
    expect(whenResult).toBe(evalResult)
    expect(whenResult).toBe(true)
  })

  it('should match eval() result for function returning false OR false', () => {
    const fn1 = () => false
    const fn2 = () => false

    let whenResult = false
    when`${fn1} OR ${fn2}`(() => {
      whenResult = true
    })

    const evalResult = eval('fn1() || fn2()')
    expect(whenResult).toBe(evalResult)
    expect(whenResult).toBe(false)
  })
})
