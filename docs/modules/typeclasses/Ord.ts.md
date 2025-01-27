---
title: typeclasses/Ord.ts
nav_order: 71
parent: Modules
---

## Ord overview

The `Ord` type class represents types which support comparisons with a _total order_.

Instances should satisfy the laws of total orderings:

1. Reflexivity: `a |> compare(a) <= 0`
2. Antisymmetry: if `a |> compare(b) <= 0` and `b |> compare(a) <= 0` then `a <-> b`
3. Transitivity: if `a |> compare(b) <= 0` and `b |> S.compare(c) <= 0` then `a |> compare(c) <= 0`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [constructors](#constructors)
  - [fromCompare](#fromcompare)
- [instances](#instances)
  - [Contravariant](#contravariant-1)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [trivial](#trivial)
- [model](#model)
  - [Ord (interface)](#ord-interface)
- [type lambdas](#type-lambdas)
  - [OrdTypeLambda (interface)](#ordtypelambda-interface)
- [utils](#utils)
  - [between](#between)
  - [clamp](#clamp)
  - [equals](#equals)
  - [geq](#geq)
  - [gt](#gt)
  - [leq](#leq)
  - [lt](#lt)
  - [max](#max)
  - [min](#min)
  - [reverse](#reverse)
  - [tuple](#tuple)

---

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (fa: Ord<A>) => Ord<B>
```

**Example**

```ts
import { contramap } from '@fp-ts/core/typeclasses/Ord'
import { sort } from '@fp-ts/core/ReadonlyArray'
import * as S from '@fp-ts/core/string'
import { pipe } from '@fp-ts/core/Function'

type User = {
  readonly name: string
  readonly age: number
}

const byName = pipe(
  S.Ord,
  contramap((user: User) => user.name)
)

const users: ReadonlyArray<User> = [
  { name: 'b', age: 1 },
  { name: 'a', age: 2 },
]

assert.deepStrictEqual(pipe(users, sort(byName)), [
  { name: 'a', age: 2 },
  { name: 'b', age: 1 },
])
```

Added in v3.0.0

# constructors

## fromCompare

**Signature**

```ts
export declare const fromCompare: <A>(compare: (that: A) => (self: A) => any) => Ord<A>
```

Added in v3.0.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: any
```

Added in v3.0.0

## getMonoid

Returns a `Monoid` such that:

- `pipe(ord1, combine(ord2))` will order first by `ord1`, and then by `ord2`
- its `empty` value is an `Ord` that always considers compared elements equal

**Signature**

```ts
export declare const getMonoid: <A>() => any
```

**Example**

```ts
import { sort } from '@fp-ts/core/ReadonlyArray'
import { contramap, reverse, getMonoid } from '@fp-ts/core/typeclasses/Ord'
import { pipe } from '@fp-ts/core/Function'
import { combineAll } from '@fp-ts/core/typeclasses/Monoid'
import * as B from '@fp-ts/core/boolean'
import * as N from '@fp-ts/core/number'
import * as S from '@fp-ts/core/string'

interface User {
  id: number
  name: string
  age: number
  rememberMe: boolean
}

const byName = pipe(
  S.Ord,
  contramap((p: User) => p.name)
)

const byAge = pipe(
  N.Ord,
  contramap((p: User) => p.age)
)

const byRememberMe = pipe(
  B.Ord,
  contramap((p: User) => p.rememberMe)
)

const M = getMonoid<User>()

const users: ReadonlyArray<User> = [
  { id: 1, name: 'Guido', age: 47, rememberMe: false },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
]

// sort by name, then by age, then by `rememberMe`
const O1 = combineAll(M)([byName, byAge, byRememberMe])
assert.deepStrictEqual(sort(O1)(users), [
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 1, name: 'Guido', age: 47, rememberMe: false },
])

// now `rememberMe = true` first, then by name, then by age
const O2 = combineAll(M)([reverse(byRememberMe), byName, byAge])
assert.deepStrictEqual(sort(O2)(users), [
  { id: 4, name: 'Giulio', age: 44, rememberMe: true },
  { id: 2, name: 'Guido', age: 46, rememberMe: true },
  { id: 3, name: 'Giulio', age: 44, rememberMe: false },
  { id: 1, name: 'Guido', age: 47, rememberMe: false },
])
```

Added in v3.0.0

## getSemigroup

Returns a `Semigroup` such that `pipe(ord1, combine(ord2))` will order first by `ord1`,
and then by `ord2`

**Signature**

```ts
export declare const getSemigroup: <A>() => any
```

Added in v3.0.0

## trivial

**Signature**

```ts
export declare const trivial: Ord<unknown>
```

Added in v3.0.0

# model

## Ord (interface)

**Signature**

```ts
export interface Ord<A> {
  readonly compare: (that: A) => (self: A) => Ordering
}
```

Added in v3.0.0

# type lambdas

## OrdTypeLambda (interface)

**Signature**

```ts
export interface OrdTypeLambda extends TypeLambda {
  readonly type: Ord<this['In1']>
}
```

Added in v3.0.0

# utils

## between

Test whether a value is between a minimum and a maximum (inclusive).

**Signature**

```ts
export declare const between: <A>(O: Ord<A>) => (low: A, hi: A) => any
```

**Example**

```ts
import { between } from '@fp-ts/core/typeclasses/Ord'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

const f = between(N.Ord)(2, 4)
assert.deepStrictEqual(pipe(1, f), false)
assert.deepStrictEqual(pipe(3, f), true)
assert.deepStrictEqual(pipe(5, f), false)
```

Added in v3.0.0

## clamp

Clamp a value between a minimum and a maximum.

**Signature**

```ts
export declare const clamp: <A>(O: Ord<A>) => (low: A, hi: A) => any
```

**Example**

```ts
import { clamp } from '@fp-ts/core/typeclasses/Ord'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

const f = clamp(N.Ord)(2, 4)
assert.deepStrictEqual(pipe(1, f), 2)
assert.deepStrictEqual(pipe(3, f), 3)
assert.deepStrictEqual(pipe(5, f), 4)
```

Added in v3.0.0

## equals

**Signature**

```ts
export declare const equals: <A>(O: Ord<A>) => any
```

Added in v3.0.0

## geq

Test whether one value is _non-strictly greater than_ another.

**Signature**

```ts
export declare const geq: <A>(O: Ord<A>) => (that: A) => (self: A) => boolean
```

**Example**

```ts
import { geq } from '@fp-ts/core/typeclasses/Ord'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(5, geq(N.Ord)(4)), true)
assert.deepStrictEqual(pipe(5, geq(N.Ord)(5)), true)
assert.deepStrictEqual(pipe(5, geq(N.Ord)(6)), false)
```

Added in v3.0.0

## gt

Test whether one value is _strictly greater than_ another.

**Signature**

```ts
export declare const gt: <A>(O: Ord<A>) => (that: A) => (self: A) => boolean
```

**Example**

```ts
import { gt } from '@fp-ts/core/typeclasses/Ord'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(5, gt(N.Ord)(4)), true)
assert.deepStrictEqual(pipe(5, gt(N.Ord)(5)), false)
assert.deepStrictEqual(pipe(5, gt(N.Ord)(6)), false)
```

Added in v3.0.0

## leq

Test whether one value is _non-strictly less than_ another.

**Signature**

```ts
export declare const leq: <A>(O: Ord<A>) => (that: A) => (self: A) => boolean
```

**Example**

```ts
import { leq } from '@fp-ts/core/typeclasses/Ord'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(5, leq(N.Ord)(4)), false)
assert.deepStrictEqual(pipe(5, leq(N.Ord)(5)), true)
assert.deepStrictEqual(pipe(5, leq(N.Ord)(6)), true)
```

Added in v3.0.0

## lt

Test whether one value is _strictly less than_ another.

**Signature**

```ts
export declare const lt: <A>(O: Ord<A>) => (that: A) => (self: A) => boolean
```

**Example**

```ts
import { lt } from '@fp-ts/core/typeclasses/Ord'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(5, lt(N.Ord)(4)), false)
assert.deepStrictEqual(pipe(5, lt(N.Ord)(5)), false)
assert.deepStrictEqual(pipe(5, lt(N.Ord)(6)), true)
```

Added in v3.0.0

## max

Take the maximum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const max: <A>(O: Ord<A>) => (that: A) => (self: A) => A
```

**Example**

```ts
import { max } from '@fp-ts/core/typeclasses/Ord'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(5, max(N.Ord)(6)), 6)
```

Added in v3.0.0

## min

Take the minimum of two values. If they are considered equal, the first argument is chosen.

**Signature**

```ts
export declare const min: <A>(O: Ord<A>) => (that: A) => (self: A) => A
```

**Example**

```ts
import { min } from '@fp-ts/core/typeclasses/Ord'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(5, min(N.Ord)(6)), 5)
```

Added in v3.0.0

## reverse

**Signature**

```ts
export declare const reverse: <A>(O: Ord<A>) => Ord<A>
```

**Example**

```ts
import { reverse } from '@fp-ts/core/typeclasses/Ord'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

assert.deepStrictEqual(pipe(5, N.Ord.compare(6)), -1)
assert.deepStrictEqual(pipe(5, reverse(N.Ord).compare(6)), 1)
```

Added in v3.0.0

## tuple

Given a tuple of `Ord`s returns an `Ord` for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(...ords: { [K in keyof A]: Ord<A[K]> }) => Ord<Readonly<A>>
```

**Example**

```ts
import { tuple } from '@fp-ts/core/typeclasses/Ord'
import * as B from '@fp-ts/core/boolean'
import * as S from '@fp-ts/core/string'
import * as N from '@fp-ts/core/number'
import { pipe } from '@fp-ts/core/Function'

const O = tuple(S.Ord, N.Ord, B.Ord)
assert.strictEqual(pipe(['a', 1, true], O.compare(['b', 2, true])), -1)
assert.strictEqual(pipe(['a', 1, true], O.compare(['a', 2, true])), -1)
assert.strictEqual(pipe(['a', 1, true], O.compare(['a', 1, false])), 1)
```

Added in v3.0.0
