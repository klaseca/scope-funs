type SkipNullish<T> = [T] extends [Exclude<T, {}> extends never ? never : T]
  ? Scope<Exclude<T, null | undefined>> | undefined
  : Scope<T>

export class Scope<T> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  let<U>(block: (it: T) => U): Scope<U> {
    return new Scope(block(this.value))
  }

  also(block: (it: T) => void): Scope<T> {
    block(this.value)
    return this
  }

  takeIf(predicate: (it: T) => boolean): Scope<T> | undefined {
    return predicate(this.value) ? this : undefined
  }

  takeUnless(predicate: (it: T) => boolean): Scope<T> | undefined {
    return predicate(this.value) ? undefined : this
  }

  skipNullish(): SkipNullish<T> {
    return (this.value == null ? undefined : this) as SkipNullish<T>
  }

  unwrap(): T {
    return this.value
  }
}

export const scope = <T>(value: T): Scope<T> => new Scope<T>(value)
