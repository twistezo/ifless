import { describe, expect, it, vi } from 'bun:test'

import { when } from '../src/index'

describe('All operands as functions (short-circuit at every step)', () => {
  it('calls only as needed', () => {
    const fns = Array.from({ length: 5 }, () => vi.fn(() => true))
    const fns2 = Array.from({ length: 5 }, () => vi.fn(() => false))
    // AND: should call all until first false
    when`${fns[0]} AND ${fns[1]} AND ${fns2[0]} AND ${fns[2]}`(() => {})
    expect(fns[0]).toHaveBeenCalled()
    expect(fns[1]).toHaveBeenCalled()
    expect(fns2[0]).toHaveBeenCalled()
    expect(fns[2]).not.toHaveBeenCalled()
    // OR: should call until first true
    when`${fns2[1]} OR ${fns2[2]} OR ${fns[3]} OR ${fns[4]}`(() => {})
    expect(fns2[1]).toHaveBeenCalled()
    expect(fns2[2]).toHaveBeenCalled()
    expect(fns[3]).toHaveBeenCalled()
    expect(fns[4]).not.toHaveBeenCalled()
  })
})
