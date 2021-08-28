export interface RootObject<T> {
  message: string;
  status: boolean;
  data: T;
  [propName: string]: any;
}
