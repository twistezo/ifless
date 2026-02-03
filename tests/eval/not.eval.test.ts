import { describe, expect, it } from 'bun:test'

import { when } from '../../src/index'

describe('NOT (!) - eval comparison', () => {
  it('should match eval() result for NOT operation', () => {
    const a = true
    const b = false

    let whenResult = false
    when`NOT ${a}`(() => {
      whenResult = true
    })
    const evalResult1 = eval('!a')
    expect(whenResult).toBe(evalResult1)
    expect(whenResult).toBe(false)
    expect(evalResult1).toBe(false)

    whenResult = false
    when`NOT ${b}`(() => {
      whenResult = true
    })
    const evalResult2 = eval('!b')
    expect(whenResult).toBe(evalResult2)
    expect(whenResult).toBe(true)
    expect(evalResult2).toBe(true)
  })

  it('should match eval() result for NOT with AND', () => {
    const x = true
    const y = true

    let whenResult = false
    when`NOT ${x} AND ${y}`(() => {
      whenResult = true
    })
    const evalResult = eval('!x && y')
    expect(whenResult).toBe(evalResult)
  })

  it('should match eval() result for NOT with OR', () => {
    const x = false
    const y = false

    let whenResult = false
    when`NOT ${x} OR NOT ${y}`(() => {
      whenResult = true
    })
    const evalResult = eval('!x || !y')
    expect(whenResult).toBe(evalResult)
  })
})
