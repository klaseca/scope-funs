import { describe, expectTypeOf, test } from 'vitest'
import { Scope, scope } from '../src'

describe('Scope type', () => {
  test('creates', () => {
    const scopeValue = new Scope(42)
    expectTypeOf(scopeValue).toEqualTypeOf<Scope<number>>()
  })

  test('let method', () => {
    const scopeValue = new Scope(42)
    const result = scopeValue.let((x) => x * 2)
    expectTypeOf(result).toEqualTypeOf<Scope<number>>()
  })

  test('also method', () => {
    const scopeValue = new Scope(42)
    const result = scopeValue.also((x) => {
      console.log(x)
    })
    expectTypeOf(result).toEqualTypeOf<Scope<number>>()
  })

  describe('takeIf method', () => {
    test('with true predicate', () => {
      const scopeValue = new Scope(42)
      const result = scopeValue.takeIf((x) => x > 0)
      expectTypeOf(result).toEqualTypeOf<Scope<number> | undefined>()
    })

    test('with false predicate', () => {
      const scopeValue = new Scope(42)
      const result = scopeValue.takeIf((x) => x < 0)
      expectTypeOf(result).toEqualTypeOf<Scope<number> | undefined>()
    })
  })

  describe('takeUnless methods', () => {
    test('with true predicate', () => {
      const scopeValue = new Scope(42)
      const result = scopeValue.takeUnless((x) => x > 0)
      expectTypeOf(result).toEqualTypeOf<Scope<number> | undefined>()
    })

    test('with false predicate', () => {
      const scopeValue = new Scope(42)
      const result = scopeValue.takeUnless((x) => x < 0)
      expectTypeOf(result).toEqualTypeOf<Scope<number> | undefined>()
    })
  })

  describe('skipNullish method', () => {
    test('with nullish value', () => {
      const scopeValue = new Scope<null | undefined>(null)
      const result = scopeValue.skipNullish()
      expectTypeOf(result).toEqualTypeOf<Scope<never> | undefined>()
    })

    test('with nullish and non nullish value', () => {
      const scopeValue = new Scope<boolean | null>(true)
      const result = scopeValue.skipNullish()
      expectTypeOf(result).toEqualTypeOf<Scope<boolean> | undefined>()
    })

    test('with non nullish value', () => {
      const scopeValue = new Scope({ foo: 'bar' })
      const result = scopeValue.skipNullish()
      expectTypeOf(result).toEqualTypeOf<Scope<{ foo: string }>>()
    })

    test('with any value', () => {
      const scopeValue = new Scope<any>(1)
      const result = scopeValue.skipNullish()
      expectTypeOf(result).toEqualTypeOf<Scope<any> | undefined>()
    })
  })

  describe('unwrap method', () => {
    test('unwraps values correctly', () => {
      const scopeValue = new Scope('hello')
      expectTypeOf(scopeValue.unwrap()).toEqualTypeOf<string>()
    })
  })

  test('scope function', () => {
    const scopeValue = scope(['hello'])
    expectTypeOf(scopeValue).toEqualTypeOf<Scope<string[]>>()
  })
})
