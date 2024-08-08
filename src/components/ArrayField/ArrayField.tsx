import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Field } from '../Field/Field'
import { UISchemaArrayField } from '@/types/uiSchema'

type Props<T> = Omit<UISchemaArrayField<T>, 'type'>

export const ArrayField = <T,>({ id, label, item, blankValue }: Props<T>) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
  })

  return (
    <div>
      {label && <label>{label}</label>}
      {fields.map((field, index) => (
        <div key={field.id}>
          <Field {...item} id={`${id}[${index}]`} />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append(blankValue)}>
        Add {label}
      </button>
    </div>
  )
}
