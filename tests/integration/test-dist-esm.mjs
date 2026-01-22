import { when } from '../../dist/esm/index.mjs'

let result = ''
const a = true
const b = false
when`${a} AND NOT ${b}`(() => {
  result = 'ok'
})
console.log('basic:', result === 'ok')

result = ''
when.ctx({ x: a, y: b })`#x AND NOT #y`(() => {
  result = 'ctx-ok'
})
console.log('ctx:', result === 'ctx-ok')

try {
  when.ctx({ fn: () => true })`#fn`(() => {})
  console.log('ctx-fn: fail')
} catch (e) {
  console.log('ctx-fn:', String(e).includes('Functions are not allowed'))
}
