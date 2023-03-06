export type Indexed<T> = { [key: string]: T };
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
