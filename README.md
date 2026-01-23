<div align="center">

## TL;DR

Akceptuje: `${value}`, `#alias`, operatory `AND`, `OR`, `NOT`, nawiasy
Nie akceptuje: inne słowa, puste nawiasy, podwójna negacja, alias bez wartości w context, funkcji w context

![](https://img.shields.io/npm/v/@twistezo/ifless?style=flat-square&color=9cf)
![](https://img.shields.io/npm/dt/@twistezo/ifless?style=flat-square&color=9cf)
![](https://img.shields.io/npm/l/@twistezo/ifless?style=flat-square&color=yellow)

</div>

<div align="center">

</div>

Conditional logic expressed using natural-language operators via JavaScript template literals.

Why? An experimental project for fun and learning, exploring alternative syntax for conditional logic.

## Examples

- [CodeSandbox](https://codesandbox.io/p/sandbox/ifless-fwwn3p) -> check console output
- Local [examples/](./examples/)

## Usage

`npm install ifless` and use as follows:

```ts
import { when } from '@twistezo/ifless'
// or const { when } = require('@twistezo/ifless')

const user = { active: true }
const isAdmin = false

// classic
if (user.active && !isAdmin) {
  console.log('condition met')
}

// with 'when'
when`${user.active} AND NOT ${isAdmin}`(() => {
  console.log('condition met')
})

// with context and aliases
when.ctx({
  admin: isAdmin,
  userActive: user.active,
})`#userActive AND NOT #admin`(() => {
  console.log('condition met')
})

// complex example
when.ctx({
  a: true,
  b: false,
  c: false,
})`(#a AND #b) OR (NOT #c AND ${true})`(() => {
  console.log('condition met')
})
```

## Limitations

Accepted: `${value}`, `#alias`, operators `AND`, `OR`, `NOT`, parentheses

Not accepted: other words, empty parentheses, double negation (`NOT NOT`, `!!${value}`, `#{!!value}`), alias without value in context, functions in context

---

## Supported logic and features

- `AND`, `&&`
  - Before:
    ```ts
    if (a && b)
    ```
  - After:
    ```ts
    when.ctx({ a, b })`#a AND #b`(() => {})
    ```

- `OR`, `||`
  - Before:
    ```ts
    if (a || b)
    ```
  - After:
    ```ts
    when.ctx({ a, b })`#a OR #b`(() => {})
    ```

- `NOT`, `!`
  - Before:
    ```ts
    if (!a)
    ```
  - After:
    ```ts
    when.ctx({ a })`NOT #a`(() => {})
    ```

- Parentheses
  - Before:
    ```ts
    if ((a && b) || (!c && (d || e)))
    ```
  - After:
    ```ts
    when.ctx({ a, b, c, d, e })`(#a AND #b) OR (NOT #c AND (#d OR #e))`(() => {})
    ```

- Short-circuit evaluation
  - Before:
    ```ts
    if (a && expensiveCheck())
    ```
  - After:
    ```ts
    when`${a} AND ${() => expensiveCheck()}`(() => {})
    ```

- Double negation `!!`
  - Before:
    ```ts
    if (!!a && !!b)
    ```
  - After:
    ```ts
    when.ctx({ a, b })`#a AND #b`(() => {})
    ```

- `null`/`undefined` as `false`
  - Before:
    ```ts
    if (a != undefiend && b != null)
    ```
  - After:
    ```ts
    when.ctx({ a, b })`#a AND #b`(() => {})
    ```

### Development

```bash
bun run example     # run examples
bun run build       # build all formats

bun run test        # run all tests
bun run lint        # check lint
bun run lint:fix    # fix lint & format
bun run typecheck   # check types

bunx npm login      # login to npm
bun publish         # publish to npm
```
