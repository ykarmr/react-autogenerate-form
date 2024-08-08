import { useFieldArray, useFormContext } from 'react-hook-form'
import { Field } from '../Field/Field'
import { UISchemaArrayField } from '@/types/uiSchema'

type Props<T> = Omit<UISchemaArrayField<T>, 'type'>

export function ArrayField<T>({ id, label, item, blankValue }: Props<T>) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
  })

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
          return append(blankValue)
        }}
      >
        Add {label}
      </button>
    </div>
  )
}
