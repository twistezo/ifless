import { describe, expect, it } from 'bun:test'

import { when } from '../../src/index'

describe('null/undefined as false - eval comparison', () => {
  it('should match eval() result for null treated as false', () => {
    const a = null
    const b = true

    let whenResult = false
    when`${a} AND ${b}`(() => {
      whenResult = true
    })
    const evalResult = !!(eval('a && b') as boolean)
    expect(whenResult).toBe(evalResult)
  })

  it('should match eval() result for undefined treated as false', () => {
    let a
    const b = true

    let whenResult = false
    when`${a} AND ${b}`(() => {
      whenResult = true
    })
    const evalResult = !!(eval('a && b') as boolean)
    expect(whenResult).toBe(evalResult)
  })

  it('should match eval() result for null in OR expression', () => {
    const a = null
    const b = false
    const c = true

    let whenResult = false
    when`${a} OR ${b} OR ${c}`(() => {
      whenResult = true
    })
    const evalResult = !!(eval('a || b || c') as boolean)
    expect(whenResult).toBe(evalResult)
  })

  it('should match eval() result for mixed null and undefined', () => {
    const x = null
    let y
    const z = false

    let whenResult = false
    when`${x} AND ${y} AND ${z}`(() => {
      whenResult = true
    })
    const evalResult = !!(eval('x && y && z') as boolean)
    expect(whenResult).toBe(evalResult)
  })

  it('should match eval() result for null with NOT operator', () => {
    const a = null

    let whenResult = false
    when`NOT ${a}`(() => {
      whenResult = true
    })
    // When a=null: NOT null = true (null is falsy, so !null = true)
    // eval('!a') returns true
    const evalResult = eval('!a') as boolean
    expect(whenResult).toBe(evalResult)
    expect(whenResult).toBe(true)
    expect(evalResult).toBe(true)
  })

  it('should match eval() result for complex expression with nullish values', () => {
    const p = null
    let q
    const r = true

    let whenResult = false
    when`(${p} OR ${q}) AND ${r}`(() => {
      whenResult = true
    })
    const evalResult = !!(eval('(p || q) && r') as boolean)
    expect(whenResult).toBe(evalResult)
  })
})
