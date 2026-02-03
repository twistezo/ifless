import { describe, expect, it } from 'bun:test'

import { when } from '../../src/index'

describe('Parentheses - eval comparison', () => {
  it('should match eval() result for simple parentheses', () => {
    const a = true
    const b = false
    const c = true

    let whenResult = false
    when`(${a} OR ${b}) AND ${c}`(() => {
      whenResult = true
    })
    const evalResult = eval('(a || b) && c')
    expect(whenResult).toBe(evalResult)
  })

  it('should match eval() result for nested parentheses', () => {
    const a = true
    const b = false
    const c = false
    const d = true
    const e = true

    let whenResult = false
    when`(${a} AND ${b}) OR (NOT ${c} AND (${d} OR ${e}))`(() => {
      whenResult = true
    })
    const evalResult = eval('(a && b) || (!c && (d || e))')
    expect(whenResult).toBe(evalResult)
  })

  it('should match eval() result for multiple nested levels', () => {
    const x = true
    const y = true
    const z = false

    let whenResult = false
    when`((${x} AND ${y}) OR ${z})`(() => {
      whenResult = true
    })
    const evalResult = eval('((x && y) || z)')
    expect(whenResult).toBe(evalResult)
  })

  it('should match eval() result for complex expression with parentheses', () => {
    const p = false
    const q = true
    const r = true

    let whenResult = false
    when`(${p} OR ${q}) AND (NOT ${r} OR ${q})`(() => {
      whenResult = true
    })
    const evalResult = eval('(p || q) && (!r || q)')
    expect(whenResult).toBe(evalResult)
  })
})
