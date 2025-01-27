/**
 * @since 3.0.0
 */
import type { LazyArg } from "@fp-ts/core/Function"
import * as eq from "@fp-ts/core/typeclasses/Eq"
import type * as monoid from "@fp-ts/core/typeclasses/Monoid"
import type * as semigroup from "@fp-ts/core/typeclasses/Semigroup"

/**
 * @category model
 * @since 3.0.0
 */
export type Ordering = -1 | 0 | 1

/**
 * @since 3.0.0
 */
export const reverse = (o: Ordering): Ordering => (o === -1 ? 1 : o === 1 ? -1 : 0)

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match = <A, B, C = B>(
  onLessThan: LazyArg<A>,
  onEqual: LazyArg<B>,
  onGreaterThan: LazyArg<C>
) => (o: Ordering): A | B | C => o === -1 ? onLessThan() : o === 0 ? onEqual() : onGreaterThan()

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<Ordering> = eq.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const Semigroup: semigroup.Semigroup<Ordering> = {
  combine: (that) => (self) => self !== 0 ? self : that
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monoid: monoid.Monoid<Ordering> = {
  combine: Semigroup.combine,
  empty: 0
}

/**
 * @since 3.0.0
 */
export const sign = (n: number): Ordering => (n <= -1 ? -1 : n >= 1 ? 1 : 0)
