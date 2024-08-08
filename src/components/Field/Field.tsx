import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ObjectField } from '@/components/ObjectField'
import { UISchemaField } from '@/types/uiSchema'

export const Field: React.FC<UISchemaField> = (props: UISchemaField) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  if (props.type === 'object') {
    return (
      <ObjectField id={props.id} label={props.label} fields={props.fields} />
    )
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-700">{props.label}</label>
      <input
        {...register(props.id)}
        key={props.id}
        name={props.id}
        type={props.type}
        placeholder={props.placeholder}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
      />
      {errors[props.id] && (
        <span className="text-red-500 text-sm">
          {errors[props.id]?.message as string}
        </span>
      )}
    </div>
  )
}
