type UISchemaObjectField = {
  type: 'object'
  id: string
  label: string
  fields: UISchemaType
}

type UISchemaValueField = {
  type: 'text' | 'number' | 'password' | 'email'
  id: string
  label: string
  placeholder?: string
}

export type UISchemaField = UISchemaObjectField | UISchemaValueField

// formSchemaに基づいてuiSchemaの型を導出
export type UISchemaType = Record<string, UISchemaField>
