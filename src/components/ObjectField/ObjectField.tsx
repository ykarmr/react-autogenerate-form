import React from 'react'
import { Field } from '../Field/Field'
import { UISchemaType, UISchemaField } from '@/types/uiSchema'

interface ObjectFieldProps {
  id: string
  label: string
  fields: UISchemaType
}

export const ObjectField: React.FC<ObjectFieldProps> = ({
  id,
  label,
  fields,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      {Object.entries(fields).map(([key, field]: [string, UISchemaField]) => {
        if (field.type === 'object') {
          return (
            <ObjectField
              id={`${id}.${field.id}`}
              key={`${id}.${field.id}`}
              label={field.label}
              fields={field.fields}
            />
          )
        }

        return (
          <Field
            id={`${id}.${field.id}`}
            key={`${id}.${field.id}`}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
          />
        )
      })}
    </div>
  )
}
