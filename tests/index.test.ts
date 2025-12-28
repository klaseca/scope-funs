import { describe, test, expect } from 'vitest'
import { Scope, scope } from '../src'

describe('Scope', () => {
  describe('constructor', () => {
    test('initializes with a value', () => {
      const scope = new Scope('test')
      expect(scope).toBeDefined()
    })
  })

  describe('let method', () => {
    test('applies block function to the value and returns new Scope', () => {
      const scope = new Scope(5)
      const result = scope.let((it) => it * 2)
      expect(result.unwrap()).toBe(10)
    })

    test('conditional return', () => {
      const scope = new Scope('hello')
      const result = scope.let((it) => {
        console.log(`let() called on ${it}`)

        if (it.length > 4) {
          return 'world'
        }

        return it
      })
      expect(result.unwrap()).toBe('world')
    })
  })

  describe('also method', () => {
    test('returns self', () => {
      const scope = new Scope(42)
      const result = scope.also((it) => {
        console.log(it)
      })

      expect(result).toBe(scope)
    })

    test('executes block function with the value', () => {
      const scope = new Scope([1])
      const result = scope.also((it) => {
        it.push(2)
      })

      expect(result.unwrap()).toEqual([1, 2])
    })
  })

  describe('takeIf method', () => {
    test('returns self when predicate is true', () => {
      const scope = new Scope(42)
      const result = scope.takeIf((it) => it > 0)
      expect(result).toBe(scope)
    })

    test('returns undefined when predicate is false', () => {
      const scope = new Scope(42)
      const result = scope.takeIf((it) => it < 0)
      expect(result).toBeUndefined()
    })
  })

  describe('takeUnless method', () => {
    test('returns self when predicate is false', () => {
      const scope = new Scope(42)
      const result = scope.takeUnless((it) => it < 0)
      expect(result).toBe(scope)
    })

    test('returns undefined when predicate is true', () => {
      const scope = new Scope(42)
      const result = scope.takeUnless((it) => it > 0)
      expect(result).toBeUndefined()
    })
  })

  describe('skipNullish method', () => {
    test('returns self for non-nullish values', () => {
      const scope = new Scope('test')
      const result = scope.skipNullish()
      expect(result).toBe(scope)
    })

    test('returns undefined for null values', () => {
      const scope = new Scope(null)
      const result = scope.skipNullish()
      expect(result).toBeUndefined()
    })

    test('returns undefined for undefined values', () => {
      const scope = new Scope(undefined)
      const result = scope.skipNullish()
      expect(result).toBeUndefined()
    })

    test('chains with nullish', () => {
      const result = new Scope<string | undefined>(undefined)
        .skipNullish()
        ?.let((it) => it.length)
        .let((it) => it + 1)
        .unwrap()
      expect(result).toBeUndefined()
    })

    test('chains without nullish', () => {
      const result = new Scope<string>('hello')
        .skipNullish()
        .let((it) => it.length)
        .let((it) => it + 1)
        .unwrap()
      expect(result).toBe(6)
    })
  })

  describe('unwrap method', () => {
    test('returns the underlying value', () => {
      const scope = new Scope(42)
      expect(scope.unwrap()).toBe(42)
    })
  })
})

describe('scope function', () => {
  test('creates a new Scope instance', () => {
    const result = scope(true)
    expect(result).toBeInstanceOf(Scope)
  })
})
