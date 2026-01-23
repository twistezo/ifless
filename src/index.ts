import { whenCtx } from './context'
import { whenBase } from './when'

export const when = whenBase
when.ctx = whenCtx

const user = { active: true }
const isAdmin = false

console.group('variables:')
console.log('user.active', user.active)
console.log('isAdmin', isAdmin)
console.log('\n')
console.groupEnd()

when`${user.active} AND NOT ${isAdmin}`(() => {
  console.log('\n\nwhen: condition met')
})

// when.ctx({
//   admin: isAdmin,
//   userActive: user.active,
// })`#userActive AND NOT #admin`(() => {
//   console.log('when.ctx: condition met')
// })
