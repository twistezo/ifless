import { describe, expect, it, vi } from 'bun:test'
import { when } from '../src/index'

describe('Parser precedence and error handling', () => {
  it('respects NOT > AND > OR precedence', () => {
    const fn = vi.fn()
    // NOT has highest precedence, then AND, then OR
    // false OR true AND NOT false => false OR (true AND (NOT false)) => false OR (true AND true) => false OR true => true
    when`${false} OR ${true} AND NOT ${false}`(fn)
    expect(fn).toHaveBeenCalled()

    const fn2 = vi.fn()
    // true AND false OR true => (true AND false) OR true => false OR true => true
    when`${true} AND ${false} OR ${true}`(fn2)
    expect(fn2).toHaveBeenCalled()

    const fn3 = vi.fn()
    // true OR false AND false => true OR (false AND false) => true OR false => true
    when`${true} OR ${false} AND ${false}`(fn3)
    expect(fn3).toHaveBeenCalled()

    const fn4 = vi.fn()
    // false AND true OR false => (false AND true) OR false => false OR false => false
    when`${false} AND ${true} OR ${false}`(fn4)
    expect(fn4).not.toHaveBeenCalled()
  })

  it('throws on unknown operator', () => {
    const fn = vi.fn()
    expect(() => when`???`(fn)).toThrow('Invalid token: ???')
    expect(() => when`${true} ??? ${false}`(fn)).toThrow('Invalid token: ???')
  })

  it('throws on missing closing parenthesis', () => {
    const fn = vi.fn()
    expect(() => when`(${true} AND ${false}`(fn)).toThrow('Missing closing parenthesis')
  })

  it('handles nested NOT and parentheses', () => {
    const fn = vi.fn()
    // NOT (true OR false AND NOT false) => NOT (true OR (false AND (NOT false))) => NOT (true OR (false AND true)) => NOT (true OR false) => NOT true => false
    when`NOT (${true} OR ${false} AND NOT ${false})`(fn)
    expect(fn).not.toHaveBeenCalled()
  })
})
