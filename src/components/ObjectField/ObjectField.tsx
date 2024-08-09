import { Field } from '../Field/Field'
import { UISchemaType, UISchemaField } from '@/types/uiSchema'

interface ObjectFieldProps<T> {
  id: string
  label?: string
  fields: UISchemaType<T>
}

export function ObjectField<T extends Record<string, T>>({
  id,
  label,
  fields,
}: ObjectFieldProps<T>) {
  return (
    <div>
      {label && <label>{label}</label>}

      {Object.entries(fields).map(
        ([subId, field]: [string, UISchemaField<T>]) => {
          return (
            <Field id={`${id}.${subId}`} key={`${id}.${subId}`} {...field} />
          )
        }
      )}
    </div>
  )
}
