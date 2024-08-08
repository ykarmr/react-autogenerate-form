type UISchemaObjectField = {
  type: 'object'
  id: string
  label?: string
  fields: UISchemaType
}

export type UISchemaArrayField = {
  type: 'array'
  id: string
  label?: string
  blankValue: string | object
  item: Omit<UISchemaValueField, 'id'> | Omit<UISchemaObjectField, 'id'>
}

type UISchemaValueField = {
  type: 'text' | 'number' | 'password' | 'email'
  id: string
  label?: string
  placeholder?: string
}

export type UISchemaField =
  | UISchemaObjectField
  | UISchemaArrayField
  | UISchemaValueField

// formSchemaに基づいてuiSchemaの型を導出
export type UISchemaType = Record<string, UISchemaField>
