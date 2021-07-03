

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type RefType<T> = T | null;

declare type LabelValueOptions = {
  label: string;
  value: any;
}[];

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = '_self' | '_blank';

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = NonNullable<T>;

declare type Recordable<T = any> = Record<string, T>;
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};

declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;

declare type Undefinedable<T> = T | undefined;

declare type NonUndefinedable<T> = T extends null | undefined ? never : T;


declare type DomRef = {
  $el: ElRef;
}
