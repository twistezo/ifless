import { whenContext } from './context'
import { whenBase } from './when'

export const when = Object.assign(whenBase, {
  ctx: whenContext,
})
