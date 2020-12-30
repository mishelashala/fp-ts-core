/**
 * @since 3.0.0
 */
import { Ring } from './Ring'
import { Eq } from './Eq'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Field<A> extends Ring<A> {
  readonly degree: (a: A) => number
  readonly div: (second: A) => (first: A) => A
  readonly mod: (second: A) => (first: A) => A
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const fieldNumber: Field<number> = {
  add: (second) => (first) => first + second,
  zero: 0,
  mul: (second) => (first) => first * second,
  one: 1,
  sub: (second) => (first) => first - second,
  degree: () => 1,
  div: (second) => (first) => first / second,
  mod: (second) => (first) => first % second
}

/**
 * The *greatest common divisor* of two values.
 *
 * @since 3.0.0
 */
export const gcd = <A>(E: Eq<A>, F: Field<A>): ((second: A) => (first: A) => A) => {
  const predicate = E.equals(F.zero)
  const f = (second: A) => (first: A): A => (predicate(second) ? first : f(F.mod(second)(first))(second))
  return f
}

/**
 * The *least common multiple* of two values.
 *
 * @since 3.0.0
 */
export const lcm = <A>(E: Eq<A>, F: Field<A>): ((second: A) => (first: A) => A) => {
  const zero = F.zero
  const predicate = E.equals(zero)
  const gcdSF = gcd(E, F)
  return (second) => (first) =>
    predicate(first) || predicate(second) ? zero : F.div(gcdSF(second)(first))(F.mul(second)(first))
}
