type UISchemaObjectField<T> = {
  type: 'object'
  id: string
  label?: string
  fields: UISchemaType<T>
}

export type UISchemaArrayField<T> = {
  type: 'array'
  id: string
  label?: string
  blankValue: T
  item: Omit<UISchemaValueField, 'id'> | Omit<UISchemaObjectField<T>, 'id'>
}

type UISchemaValueField = {
  type: 'text' | 'number' | 'password' | 'email'
  id: string
  label?: string
  placeholder?: string
}

export type UISchemaField<T> =
  | UISchemaObjectField<T>
  | UISchemaArrayField<any>
  | UISchemaValueField

export type UISchemaType<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
    ? UISchemaArrayField<U>
    : T[K] extends object
      ? UISchemaObjectField<T[K]>
      : UISchemaValueField
}
