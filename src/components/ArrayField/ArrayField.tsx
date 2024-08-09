import { useFieldArray, useFormContext } from 'react-hook-form'
import { Field } from '../Field/Field'
import { UISchemaArrayField, UISchemaField } from '@/types/uiSchema'

type Props<T> = UISchemaArrayField<T> & { id: string }

export function ArrayField<T extends Record<string, T>>({
  id,
  label,
  item,
}: Props<T>) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
  })

  const createBlankValue = (
    item: UISchemaField<T>
  ):
    | Record<string, unknown>
    | Record<string, unknown>[]
    | unknown[]
    | unknown => {
    if (item.type === 'object') {
      let value: Record<string, unknown> = {}
      Object.entries(item.fields).map(
        ([id, field]: [string, UISchemaField<T>]) => {
          value = {
            ...value,
            [id]: createBlankValue(field),
          }
        }
      )
      return value
    } else if (item.type === 'array') {
      let value: Record<string, unknown>[] | unknown[] = []
      value = [...value, createBlankValue(item.item)]
      return value
    } else {
      return item.defaultValue
    }
  }
  return (
    <div>
      {label && <label>{label}</label>}
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <Field {...item} id={`${id}[${index}]`} />
            <button
              type="button"
              onClick={() => {
                return remove(index)
              }}
            >
              Remove
            </button>
          </div>
        )
      })}
      <button
        type="button"
        onClick={() => {
          return append(createBlankValue(item))
        }}
      >
        Add {label}
      </button>
    </div>
  )
}
