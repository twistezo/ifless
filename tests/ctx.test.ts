import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('when.ctx context logic', () => {
  it('allows using #alias for context variables', () => {
    const fn = vi.fn()
    const a = true
    const b = false
    when.ctx({ a, b })`#a AND NOT #b`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('allows aliasing variable names', () => {
    const fn = vi.fn()
    const foo = 1
    when.ctx({ x: foo })`#x`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('throws if context contains a function', () => {
    const fn = () => true
    expect(() => when.ctx({ fn })`#fn`(() => {})).toThrow('Functions are not allowed in context')
  })

  it('throws if #name not in context', () => {
    expect(() => when.ctx({ a: 1 })`#b`(() => {})).toThrow('Unknown context variable: #b')
  })

  it('works with multiple aliases and values', () => {
    const fn = vi.fn()
    const foo = 1
    const bar = 2
    when.ctx({ x: foo, y: bar })`#x AND #y`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('works with nested property values', () => {
    const fn = vi.fn()
    const user = { active: true }
    when.ctx({ userActive: user.active })`#userActive`(fn)
    expect(fn).toHaveBeenCalled()
  })

  it('handles context with falsy values', () => {
    const fn = vi.fn()
    when.ctx({ a: 0, b: false })`#a AND #b`(fn)
    expect(fn).not.toHaveBeenCalled()
    const fn2 = vi.fn()
    when.ctx({ a: 1, b: true })`#a AND #b`(fn2)
    expect(fn2).toHaveBeenCalled()
  })

  it('handles context with null and undefined', () => {
    const fn = vi.fn()
    when.ctx({ a: null, b: undefined })`#a OR #b`(fn)
    expect(fn).not.toHaveBeenCalled()
  })

  it('throws if context is empty and #var is used', () => {
    expect(() => when.ctx({})`#missing`(() => {})).toThrow('Unknown context variable: #missing')
  })
})
