// @ts-expect-error created during build
import { when } from '../dist/esm/index.js'

const user = { active: true }
const isAdmin = false

console.group('Variables:')
console.log('user.active', user.active)
console.log('isAdmin', isAdmin)
console.groupEnd()

console.group('\nClassic:')
if (user.active && !isAdmin) {
  console.log('Expression: (user.active && !isAdmin)')
  console.log('Result: OK')
}
console.groupEnd()

console.group('\nWith "when":')
when`${user.active} AND NOT ${isAdmin}`(() => {
  console.log('Expression: when`${user.active} AND NOT ${isAdmin}`')
  console.log('Result: OK')
})
console.groupEnd()

console.group('\nWith context and aliases:')
when.ctx({
  admin: isAdmin,
  userActive: user.active,
})`#userActive AND NOT #admin`(() => {
  console.log(
    'Expression: when.ctx({ admin: isAdmin, userActive: user.active, })`#userActive AND NOT #admin`',
  )
  console.log('Result: OK')
})
console.groupEnd()

console.group('\nComplex example:')
when.ctx({
  a: true,
  b: false,
  c: false,
})`(#a AND #b) OR (NOT #c AND ${true})`(() => {
  console.log(
    'Expression: when.ctx({ a: true, b: false, c: false, })`(#a AND #b) OR (NOT #c AND ${true})`',
  )
  console.log('Result: OK')
})
console.groupEnd()
