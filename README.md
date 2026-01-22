# ifless

Conditional logic expressed using natural-language operators via JavaScript template literals.

Why?

An experimental project for fun and learning, exploring alternative syntax for conditional logic.

## Usage

`npm install ifless` and use as follows:

```ts
import { when } from 'ifless'
// or const { when } = require('ifless')

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
  userActive: user.active,
  isAdmin: admin,
})`#userActive AND NOT #admin`(() => {
  console.log('condition met')
})

// complex example
when.ctx({
  a: true,
  b: false,
  c: false,
  d: true,
})`(#a AND #b) OR (NOT #c AND #d)`(() => {
  console.log('condition met')
})
```

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

- With parentheses
  - Before:
    ```ts
    if ((a && b) || (c && !d))
    ```
  - After:
    ```ts
    when.ctx({ a, b, c, d })`(#a AND #b) OR (#c AND NOT #d)`(() => {})
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

- Arbitrary nesting
  - Before:
    ```ts
    if ((a && b) || (!c && (d || e)))
    ```
  - After:
    ```ts
    when.ctx({ a, b, c, d, e })`(#a AND #b) OR (NOT #c AND (#d OR #e))`(() => {})
    ```

### Development

```bash
bun run build       # build all formats

bun run test        # run all tests
bun run lint        # check lint
bun run lint:fix    # fix lint & format
bun run typecheck   # check types

bunx npm login      # login to npm
bun publish         # publish to npm
```
