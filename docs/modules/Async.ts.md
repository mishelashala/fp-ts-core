---
title: Async.ts
nav_order: 3
parent: Modules
---

## Async overview

`Async<A>` represents an asynchronous computation that yields a value of type `A` and **never fails**.

```ts
interface Async<A> {
  (): Promise<A>
}
```

If you want to represent an asynchronous computation that may fail, please see `TaskEither`.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [sleep](#sleep)
  - [succeed](#succeed)
- [conversions](#conversions)
  - [fromIO](#fromio)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindRightPar](#bindrightpar)
  - [bindTo](#bindto)
  - [let](#let)
- [instances](#instances)
  - [Applicative](#applicative)
  - [ApplicativePar](#applicativepar)
  - [Apply](#apply)
  - [ApplyPar](#applypar)
  - [CategoryKind](#categorykind)
  - [ComposableKind](#composablekind)
  - [Flattenable](#flattenable)
  - [FromIO](#fromio)
  - [FromIdentity](#fromidentity)
  - [FromTask](#fromtask)
  - [Functor](#functor)
  - [Monad](#monad)
  - [getRaceMonoid](#getracemonoid)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift2Par](#lift2par)
  - [lift3](#lift3)
  - [lift3Par](#lift3par)
  - [liftSync](#liftsync)
- [logging](#logging)
  - [log](#log)
  - [logError](#logerror)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [map](#map)
  - [unit](#unit)
- [model](#model)
  - [Async (interface)](#async-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapSync](#flatmapsync)
  - [zipLeft](#zipleft)
  - [zipLeftPar](#zipleftpar)
  - [zipRight](#zipright)
  - [zipRightPar](#ziprightpar)
- [traversing](#traversing)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArrayPar](#sequencereadonlyarraypar)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayPar](#traversereadonlyarraypar)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexPar](#traversereadonlyarraywithindexpar)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArrayPar](#traversereadonlynonemptyarraypar)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexPar](#traversereadonlynonemptyarraywithindexpar)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipFlattenPar](#zipflattenpar)
  - [zipWith](#zipwith)
  - [zipWithPar](#zipwithpar)
- [type lambdas](#type-lambdas)
  - [TaskTypeLambda (interface)](#tasktypelambda-interface)
- [utils](#utils)
  - [ap](#ap)
  - [apPar](#appar)
  - [composeKind](#composekind)
  - [delay](#delay)
  - [flatten](#flatten)
  - [idKind](#idkind)
  - [never](#never)
  - [tap](#tap)

---

# constructors

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: (duration: number) => Async<void>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => Async<A>
```

Added in v3.0.0

# conversions

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: Sync<A>) => Async<A>
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: Async<{}>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Async<B>
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Async<B>
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindRightPar

A variant of `bind` that ignores the scope in parallel.

**Signature**

```ts
export declare const bindRightPar: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: Async<B>
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: Async<A>) => Async<{ readonly [K in N]: A }>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: Async<A>) => Async<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<TaskTypeLambda>
```

Added in v3.0.0

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: applicative.Applicative<TaskTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<TaskTypeLambda>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: apply.Apply<TaskTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: categoryKind.CategoryKind<TaskTypeLambda>
```

Added in v3.0.0

## ComposableKind

**Signature**

```ts
export declare const ComposableKind: composableKind.ComposableKind<TaskTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<TaskTypeLambda>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<TaskTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<TaskTypeLambda>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: fromTask_.FromTask<TaskTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<TaskTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<TaskTypeLambda>
```

Added in v3.0.0

## getRaceMonoid

Monoid returning the first completed task.

Note: uses `Promise.race` internally.

**Signature**

```ts
export declare const getRaceMonoid: <A>() => Monoid<Async<A>>
```

**Example**

```ts
import * as T from 'fp-ts/Async'
import { pipe } from 'fp-ts/Function'

async function test() {
  const S = T.getRaceMonoid<string>()
  const fa = T.delay(20)(T.succeed('a'))
  const fb = T.delay(10)(T.succeed('b'))
  assert.deepStrictEqual(await pipe(fa, S.combine(fb))(), 'b')
}

test()
```

Added in v3.0.0

# lifting

## lift2

Lifts a binary function into `Async`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: Async<A>, fb: Async<B>) => Async<C>
```

Added in v3.0.0

## lift2Par

Lifts a binary function into `Async` in parallel.

**Signature**

```ts
export declare const lift2Par: <A, B, C>(f: (a: A, b: B) => C) => (fa: Async<A>, fb: Async<B>) => Async<C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into `Async`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Async<A>, fb: Async<B>, fc: Async<C>) => Async<D>
```

Added in v3.0.0

## lift3Par

Lifts a ternary function into `Async` in parallel.

**Signature**

```ts
export declare const lift3Par: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: Async<A>, fb: Async<B>, fc: Async<C>) => Async<D>
```

Added in v3.0.0

## liftSync

**Signature**

```ts
export declare const liftSync: <A extends readonly unknown[], B>(f: (...a: A) => Sync<B>) => (...a: A) => Async<B>
```

Added in v3.0.0

# logging

## log

**Signature**

```ts
export declare const log: (...x: ReadonlyArray<unknown>) => Async<void>
```

Added in v3.0.0

## logError

**Signature**

```ts
export declare const logError: (...x: ReadonlyArray<unknown>) => Async<void>
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => (self: Async<unknown>) => Async<B>
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: Async<(a: A) => B>) => Async<B>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: Async<A>) => Async<B>
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: (self: Async<unknown>) => Async<void>
```

Added in v3.0.0

# model

## Async (interface)

**Signature**

```ts
export interface Async<A> {
  (): Promise<A>
}
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => Async<B>) => (self: Async<A>) => Async<B>
```

Added in v3.0.0

## flatMapSync

**Signature**

```ts
export declare const flatMapSync: <A, B>(f: (a: A) => Sync<B>) => (self: Async<A>) => Async<B>
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: (that: Async<unknown>) => <A>(self: Async<A>) => Async<A>
```

Added in v3.0.0

## zipLeftPar

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const zipLeftPar: (that: Async<unknown>) => <A>(self: Async<A>) => Async<A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: Async<A>) => (self: Async<unknown>) => Async<A>
```

Added in v3.0.0

## zipRightPar

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const zipRightPar: <A>(that: Async<A>) => (self: Async<unknown>) => Async<A>
```

Added in v3.0.0

# traversing

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(arr: readonly Async<A>[]) => Async<readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArrayPar

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArrayPar: <A>(arr: readonly Async<A>[]) => Async<readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(f: (a: A) => Async<B>) => (as: readonly A[]) => Async<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayPar

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayPar: <A, B>(
  f: (a: A) => Async<B>
) => (as: readonly A[]) => Async<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Async<B>
) => (as: readonly A[]) => Async<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexPar

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexPar: <A, B>(
  f: (index: number, a: A) => Async<B>
) => (as: readonly A[]) => Async<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, B>(
  f: (a: A) => Async<B>
) => (as: readonly [A, ...A[]]) => Async<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayPar

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayPar: <A, B>(
  f: (a: A) => Async<B>
) => (as: readonly [A, ...A[]]) => Async<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => Async<B>
) => (as: readonly [A, ...A[]]) => Async<readonly [B, ...B[]]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexPar

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexPar: <A, B>(
  f: (index: number, a: A) => Async<B>
) => (as: readonly [A, ...A[]]) => Async<readonly [B, ...B[]]>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: Async<readonly []>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: Async<A>) => Async<readonly [A]>
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(
  fb: Async<B>
) => <A extends readonly unknown[]>(self: Async<A>) => Async<readonly [...A, B]>
```

Added in v3.0.0

## zipFlattenPar

Zips this effect with the specified effect in parallel.

**Signature**

```ts
export declare const zipFlattenPar: <B>(
  fb: Async<B>
) => <A extends readonly unknown[]>(self: Async<A>) => Async<readonly [...A, B]>
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <B, A, C>(that: Async<B>, f: (a: A, b: B) => C) => (self: Async<A>) => Async<C>
```

Added in v3.0.0

## zipWithPar

Zips this effect with the specified effect using the specified combiner function in parallel.

**Signature**

```ts
export declare const zipWithPar: <B, A, C>(that: Async<B>, f: (a: A, b: B) => C) => (self: Async<A>) => Async<C>
```

Added in v3.0.0

# type lambdas

## TaskTypeLambda (interface)

**Signature**

```ts
export interface TaskTypeLambda extends TypeLambda {
  readonly type: Async<this['Out1']>
}
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: Async<A>) => <B>(self: Async<(a: A) => B>) => Async<B>
```

Added in v3.0.0

## apPar

**Signature**

```ts
export declare const apPar: <A>(fa: Async<A>) => <B>(fab: Async<(a: A) => B>) => Async<B>
```

Added in v3.0.0

## composeKind

**Signature**

```ts
export declare const composeKind: <B, C>(bfc: (b: B) => Async<C>) => <A>(afb: (a: A) => Async<B>) => (a: A) => Async<C>
```

Added in v3.0.0

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: (duration: number) => <A>(self: Async<A>) => Async<A>
```

**Example**

```ts
import { pipe } from 'fp-ts/Function'
import * as T from 'fp-ts/Async'

async function test() {
  const log: Array<string> = []

  const append = (message: string): T.Async<void> =>
    T.fromIO(() => {
      log.push(message)
    })

  await pipe(
    T.Do,
    T.bindRightPar('a', append('a')),
    T.bindRightPar('b', pipe(append('b'), T.delay(20))),
    T.bindRightPar('c', pipe(append('c'), T.delay(10)))
  )()
  assert.deepStrictEqual(log, ['a', 'c', 'b'])
}

test()
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: Async<Async<A>>) => Async<A>
```

Added in v3.0.0

## idKind

**Signature**

```ts
export declare const idKind: <A>() => (a: A) => Async<A>
```

Added in v3.0.0

## never

An `Async` that never completes.

**Signature**

```ts
export declare const never: Async<never>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <A>(f: (a: A) => Async<unknown>) => (self: Async<A>) => Async<A>
```

Added in v3.0.0