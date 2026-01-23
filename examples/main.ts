// @ts-expect-error created during build
import { when } from '../dist/esm/index.js'

const user = { active: true }
const isAdmin = false

console.group('Variables:')
console.log('user.active', user.active)
console.log('isAdmin', isAdmin)
console.groupEnd()

if (user.active && !isAdmin) {
  console.group('\nClassic:')
  console.log('Expression: (user.active && !isAdmin)')
  console.log('Result: OK')
  console.groupEnd()
}

when`${user.active} AND NOT ${isAdmin}`(() => {
  console.group(`\nWith 'when':`)
  console.log('Expression: when`${user.active} AND NOT ${isAdmin}`')
  console.log('Result: OK')
  console.groupEnd()
})

when.ctx({
  admin: isAdmin,
  userActive: user.active,
})`#userActive AND NOT #admin`(() => {
  console.group(`\nWith context and aliases:`)
  console.log(
    'Expression: when.ctx({ admin: isAdmin, userActive: user.active, })`#userActive AND NOT #admin`',
  )
  console.log('Result: OK')
  console.groupEnd()
})

when.ctx({
  a: true,
  b: false,
  c: false,
})`(#a AND #b) OR (NOT #c AND ${true})`(() => {
  console.group(`\nComplex example:`)
  console.log(
    'Expression: when.ctx({ a: true, b: false, c: false, })`(#a AND #b) OR (NOT #c AND ${true})`',
  )
  console.log('Result: OK')
  console.groupEnd()
})
