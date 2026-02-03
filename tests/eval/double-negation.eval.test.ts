import { describe, expect, it } from 'bun:test'

import { when } from '../../src/index'

describe('Double negation (!!) - eval comparison', () => {
  it('should match eval() result for truthy values', () => {
    const a = true
    const b = 'hello'
    const c = 42

    // Test a = true
    let whenResult = false
    when`${a}`(() => {
      whenResult = true
    })
    const evalResult1 = !!(eval('a') as boolean)
    expect(whenResult).toBe(evalResult1)

    // Test b = 'hello'
    whenResult = false
    when`${b}`(() => {
      whenResult = true
    })
    const evalResult2 = !!(eval('b') as boolean)
    expect(whenResult).toBe(evalResult2)

    // Test c = 42
    whenResult = false
    when`${c}`(() => {
      whenResult = true
    })
    const evalResult3 = !!(eval('c') as boolean)
    expect(whenResult).toBe(evalResult3)
  })

  it('should match eval() result for falsy values', () => {
    const a = false
    const b = ''
    const c = 0

    // Test a = false
    let whenResult = false
    when`${a}`(() => {
      whenResult = true
    })
    const evalResult1 = !!(eval('a') as boolean)
    expect(whenResult).toBe(evalResult1)

    // Test b = ''
    whenResult = false
    when`${b}`(() => {
      whenResult = true
    })
    const evalResult2 = !!(eval('b') as boolean)
    expect(whenResult).toBe(evalResult2)

    // Test c = 0
    whenResult = false
    when`${c}`(() => {
      whenResult = true
    })
    const evalResult3 = !!(eval('c') as boolean)
    expect(whenResult).toBe(evalResult3)
  })

  it('should match eval() result for mixed truthy/falsy in AND', () => {
    const x = 'hello'
    const y = 0

    let whenResult = false
    when`${x} AND ${y}`(() => {
      whenResult = true
    })
    const evalResult = !!(eval('x && y') as boolean)
    expect(whenResult).toBe(evalResult)
  })

  it('should match eval() result for mixed truthy/falsy in OR', () => {
    const x = ''
    const y = 42

    let whenResult = false
    when`${x} OR ${y}`(() => {
      whenResult = true
    })
    const evalResult = !!(eval('x || y') as boolean)
    expect(whenResult).toBe(evalResult)
  })
})
