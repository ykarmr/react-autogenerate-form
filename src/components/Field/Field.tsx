import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ObjectField } from '@/components/ObjectField'
import { ArrayField } from '@/components/ArrayField'
import { UISchemaField } from '@/types/uiSchema'
import { ErrorMessage } from '@hookform/error-message'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Field: React.FC<UISchemaField<any>> = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: UISchemaField<any>
) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  if (props.type === 'object') {
    return (
      <ObjectField id={props.id} label={props.label} fields={props.fields} />
    )
  }

  if (props.type === 'array') {
    return (
      <ArrayField
        id={props.id}
        label={props.label}
        item={props.item}
        blankValue={props.blankValue}
      />
    )
  }

  return (
    <div>
      {props.label && <label>{props.label}</label>}

      <input
        {...register(props.id)}
        key={props.id}
        name={props.id}
        type={props.type}
        placeholder={props.placeholder}
      />
      <ErrorMessage
        errors={errors}
        name={props.id}
        render={({ messages }) => {
          return (
            messages &&
            Object.entries(messages).map(([type, message]) => {
              return <p key={type}>{message}</p>
            })
          )
        }}
      />
    </div>
  )
}
