import * as _ from '../../src/ReaderTaskEither'
import * as RIO from '../../src/ReaderIO'
import * as RT from '../../src/ReaderTask'
import * as E from '../../src/Either'
import * as TE from '../../src/TaskEither'
import * as IOE from '../../src/IOEither'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

declare const fab: _.ReaderTaskEither<{ r1: 'r1' }, string, (n: number) => boolean>
declare const fa: _.ReaderTaskEither<{ r2: 'r2' }, Error, number>
// $ExpectType ReaderTaskEither<{ r1: "r1"; } & { r2: "r2"; }, string | Error, boolean>
_.ap(fa)(fab)

// -------------------------------------------------------------------------------------
// chain widening
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<unknown, never, number>
pipe(
  _.right('a'),
  _.chain(() => _.right(1))
)

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, never, number>
pipe(
  _.right<string, { a: string }>('a'),
  _.chain(() => _.right<number, { b: number }>(1))
)

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string | number, number>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.chain(() => _.right<number, { b: number }, number>(1))
)

// -------------------------------------------------------------------------------------
// fromRefinementOrElse
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<unknown, string | number, string>
pipe(sn, _.fromRefinementOrElse(isString, identity))

// $ExpectType ReaderTaskEither<unknown, Error, string>
pipe(
  sn,
  _.fromRefinementOrElse(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  sn,
  _.fromRefinementOrElse(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// fromPredicateOrElse
// -------------------------------------------------------------------------------------

// $ExpectType ReaderTaskEither<unknown, string | number, string | number>
pipe(sn, _.fromPredicateOrElse(predicate, identity))

// $ExpectType ReaderTaskEither<unknown, Error, string | number>
pipe(
  sn,
  _.fromPredicateOrElse(predicate, () => new Error())
)

// $ExpectType ReaderTaskEither<unknown, number, number>
pipe(n, _.fromPredicateOrElse(predicate, identity))

pipe(
  n,
  _.fromPredicateOrElse(
    (
      _n // $ExpectType number
    ) => true,
    identity
  )
)

//
// -------------------------------------------------------------------------------------
//

//
// rightReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.rightReaderIO(RIO.of<boolean, { a: string }>(true))

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.leftReaderIO(RIO.of<boolean, { a: string }>(true))

//
// getOrElse
//

// $ExpectType ReaderTask<{ a: string; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElse(() => null)
)

//
// getOrElseE
//

// $ExpectType ReaderTask<{ a: string; } & { b: number; }, string | null>
pipe(
  _.right<string, { a: string }, string>('a'),
  _.getOrElseE(() => RT.of<null, { b: number }>(null))
)

//
// chainEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.chainEitherK(() => E.right<number, number>(1))
)

//
// chainTaskEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.chainTaskEitherK(() => TE.right<number, number>(1))
)

//
// chainIOEitherK
//

// $ExpectType ReaderTaskEither<string, string | number, number>
pipe(
  _.right<string, string, string>('a'),
  _.chainIOEitherK(() => IOE.right<number, number>(1))
)

//
// do notation
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.bind('a2', () => _.right('b')),
  _.bind('a3', () => _.right<boolean, { readonly b: string }, number>(true))
)

//
// pipeable sequence S
//

// $ExpectType ReaderTaskEither<{ readonly a: number; } & { readonly b: string; }, string | number, { readonly a1: number; readonly a2: string; readonly a3: boolean; }>
pipe(
  _.right<number, { readonly a: number }, string>(1),
  _.bindTo('a1'),
  _.apS('a2', _.right('b')),
  _.apS('a3', _.right<boolean, { readonly b: string }, number>(true))
)

//
// Do
//

// $ExpectType ReaderTaskEither<unknown, string, { readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.right<number, unknown, string>(1)),
  _.bind('a2', () => _.right<string, unknown, string>('b'))
)

//
// filterOrElse
//

// $ExpectType ReaderTaskEither<{ c: boolean; }, "a1" | "a2", number>
pipe(
  _.left<'a1', { c: boolean }, number>('a1'),
  _.filterOrElse(
    (result) => result > 0,
    () => 'a2' as const
  )
)

//
// fromReaderIOK
//

// $ExpectType <E = never>(a: boolean) => ReaderTaskEither<{ a: string; }, E, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<boolean, { a: string }>(a))

//
// chainReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.right<number, { a: string }, string>(1),
  _.chainReaderIOKW(() => RIO.of<boolean, { b: number }>(true))
)

//
// chainReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<number, { a: string }, string>(1),
  _.chainReaderIOK(() => RIO.of(1))
)

pipe(
  _.right<number, { a: string }, string>(1),
  _.chainReaderIOK(() => RIO.of<boolean, { b: number }>(true)) // $ExpectError
)

//
// chainFirstReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, number>
pipe(
  _.right<number, { a: string }, string>(1),
  _.chainFirstReaderIOKW(() => RIO.of<boolean, { b: number }>(true))
)

//
// chainFirstReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<number, { a: string }, string>(1),
  _.chainFirstReaderIOK(() => RIO.of(true))
)

pipe(
  _.right<number, { a: string }, string>(1),
  _.chainFirstReaderIOK(() => RIO.of<boolean, { b: number }>(true)) // $ExpectError
)

//
// rightReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, never, boolean>
_.rightReaderIO(RIO.of<boolean, { a: string }>(true))

//
// leftReaderIO
//

// $ExpectType ReaderTaskEither<{ a: string; }, boolean, never>
_.leftReaderIO(RIO.of<boolean, { a: string }>(true))

//
// fromReaderIOK
//

// $ExpectType <E = never>(a: boolean) => ReaderTaskEither<{ a: string; }, E, boolean>
_.fromReaderIOK((a: boolean) => RIO.of<boolean, { a: string }>(a))

//
// chainReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, boolean>
pipe(
  _.right<number, { a: string }, string>(1),
  _.chainReaderIOKW(() => RIO.of<boolean, { b: number }>(true))
)

//
// chainReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<number, { a: string }, string>(1),
  _.chainReaderIOK(() => RIO.of(1))
)

pipe(
  _.right<number, { a: string }, string>(1),
  _.chainReaderIOK(() => RIO.of<boolean, { b: number }>(true)) // $ExpectError
)

//
// chainFirstReaderIOKW
//

// $ExpectType ReaderTaskEither<{ a: string; } & { b: number; }, string, number>
pipe(
  _.right<number, { a: string }, string>(1),
  _.chainFirstReaderIOKW(() => RIO.of<boolean, { b: number }>(true))
)

//
// chainFirstReaderIOK
//

// $ExpectType ReaderTaskEither<{ a: string; }, string, number>
pipe(
  _.right<number, { a: string }, string>(1),
  _.chainFirstReaderIOK(() => RIO.of(true))
)

pipe(
  _.right<number, { a: string }, string>(1),
  _.chainFirstReaderIOK(() => RIO.of<boolean, { b: number }>(true)) // $ExpectError
)
