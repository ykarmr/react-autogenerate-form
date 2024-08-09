export type UISchemaObjectField<T> = {
  type: 'object'
  label?: string
  fields: UISchemaType<T>
}

export type UISchemaArrayField<T> = {
  type: 'array'
  label?: string
  item: UISchemaValueField | UISchemaObjectField<T>
}

export type UISchemaValueField = {
  type: 'text' | 'number' | 'password' | 'email'
  label?: string
  placeholder?: string
  defaultValue?: string | number
}

export type UISchemaField<T> =
  | UISchemaObjectField<T>
  | UISchemaArrayField<T>
  | UISchemaValueField

export type UISchemaType<T> = {
  [K in keyof T]: T[K] extends Array<infer U>
    ? UISchemaArrayField<U>
    : T[K] extends object
      ? UISchemaObjectField<T[K]>
      : UISchemaValueField
}
