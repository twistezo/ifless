import { describe, expect, it } from 'bun:test'

import { when } from '../../src/index'

describe('AND (&&) - eval comparison', () => {
  it('should match eval() result for AND operation', () => {
    const a = true
    const b = true
    const c = false

    // Test 1: true AND true
    let whenResult = false
    when`${a} AND ${b}`(() => {
      whenResult = true
    })
    const evalResult1 = eval('a && b') as boolean
    expect(whenResult).toBe(evalResult1)

    // Test 2: true AND false
    whenResult = false
    when`${a} AND ${c}`(() => {
      whenResult = true
    })
    const evalResult2 = eval('a && c') as boolean
    expect(whenResult).toBe(evalResult2)

    // Test 3: false AND true
    whenResult = false
    when`${c} AND ${a}`(() => {
      whenResult = true
    })
    const evalResult3 = eval('c && a') as boolean
    expect(whenResult).toBe(evalResult3)

    // Test 4: false AND false
    whenResult = false
    when`${c} AND ${c}`(() => {
      whenResult = true
    })
    const evalResult4 = eval('c && c') as boolean
    expect(whenResult).toBe(evalResult4)
  })

  it('should match eval() result for multiple AND operations', () => {
    const x = true
    const y = true
    const z = false

    let whenResult = false
    when`${x} AND ${y} AND ${z}`(() => {
      whenResult = true
    })
    const evalResult = eval('x && y && z') as boolean
    expect(whenResult).toBe(evalResult)
  })
})
