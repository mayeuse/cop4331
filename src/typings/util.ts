export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;


export type KeysMatching<T extends object, TYPE> = {
  [K in keyof T]-?: T[K] extends TYPE ? K : never
}[keyof T];

export type KeysYieldingArray<T extends object> = KeysMatchingWrite<T, unknown[]>

type KeysMatchingWrite<T extends object, V> = {
  [K in keyof T]-?: [V] extends [T[K]] ? K : never
}[keyof T];

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;


export type PropertyKeys<T> =  { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];

export type Primitive = string | number | bigint | boolean | null | undefined;

export type Replaced<T, TReplace, TWith, TKeep = Primitive> = T extends TReplace | TKeep
  ? (T extends TReplace
    ? TWith | Exclude<T, TReplace>
    : T)
  : {
    [P in keyof T]: Replaced<T[P], TReplace, TWith, TKeep>
  }