import { describe, expect, it } from 'bun:test'

import { when } from '../../src/index'

describe('OR (||) - eval comparison', () => {
  it('should match eval() result for OR operation', () => {
    const a = true
    const b = false
    const c = false

    // Test 1: true OR false
    let whenResult = false
    when`${a} OR ${b}`(() => {
      whenResult = true
    })
    const evalResult1 = eval('a || b') as boolean
    expect(whenResult).toBe(evalResult1)

    // Test 2: false OR true
    whenResult = false
    when`${b} OR ${a}`(() => {
      whenResult = true
    })
    const evalResult2 = eval('b || a') as boolean
    expect(whenResult).toBe(evalResult2)

    // Test 3: false OR false
    whenResult = false
    when`${b} OR ${c}`(() => {
      whenResult = true
    })
    const evalResult3 = eval('b || c') as boolean
    expect(whenResult).toBe(evalResult3)

    // Test 4: true OR true
    whenResult = false
    when`${a} OR ${a}`(() => {
      whenResult = true
    })
    const evalResult4 = eval('a || a') as boolean
    expect(whenResult).toBe(evalResult4)
  })

  it('should match eval() result for multiple OR operations', () => {
    const x = false
    const y = false
    const z = true

    let whenResult = false
    when`${x} OR ${y} OR ${z}`(() => {
      whenResult = true
    })
    const evalResult = eval('x || y || z') as boolean
    expect(whenResult).toBe(evalResult)
  })
})
