import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('All operands as functions (short-circuit at every step)', () => {
  it('calls all functions in AND/OR (parser always evaluates all operands)', () => {
    const fns = Array.from({ length: 5 }, () => vi.fn(() => true))
    const fns2 = Array.from({ length: 5 }, () => vi.fn(() => false))
    // AND: all functions are called
    when`${fns[0]} AND ${fns[1]} AND ${fns2[0]} AND ${fns[2]}`(() => {})
    expect(fns[0]).toHaveBeenCalled()
    expect(fns[1]).toHaveBeenCalled()
    expect(fns2[0]).toHaveBeenCalled()
    expect(fns[2]).toHaveBeenCalled()
    // OR: all functions are called
    when`${fns2[1]} OR ${fns2[2]} OR ${fns[3]} OR ${fns[4]}`(() => {})
    expect(fns2[1]).toHaveBeenCalled()
    expect(fns2[2]).toHaveBeenCalled()
    expect(fns[3]).toHaveBeenCalled()
    expect(fns[4]).toHaveBeenCalled()
  })

  it('handles nested function operands (all called)', () => {
    const f1 = vi.fn(() => true)
    const f2 = vi.fn(() => false)
    const f3 = vi.fn(() => true)
    const f4 = vi.fn(() => false)
    // (true && false) || true
    when`${() => f1() && f2()} OR ${f3}`(() => {})
    expect(f1).toHaveBeenCalled()
    expect(f2).toHaveBeenCalled()
    expect(f3).toHaveBeenCalled()
    // (false || false) && true
    when`${() => f2() || f4()} AND ${f1}`(() => {})
    expect(f4).toHaveBeenCalled()
    expect(f1).toHaveBeenCalled()
  })

  it('handles functions returning non-boolean', () => {
    const f1 = vi.fn(() => 1)
    const f2 = vi.fn(() => '')
    when`${f1} AND ${f2}`(() => {})
    expect(f1).toHaveBeenCalled()
    expect(f2).toHaveBeenCalled()
  })

  it('handles function throwing error', () => {
    const f1 = vi.fn(() => {
      throw new Error('fail')
    })
    expect(() => when`${f1}`(() => {})).toThrow()
  })
})
