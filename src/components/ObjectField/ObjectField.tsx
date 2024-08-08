import React from 'react'
import { Field } from '../Field/Field'
import { UISchemaType, UISchemaField } from '@/types/uiSchema'
import { ArrayField } from '../ArrayField'

interface ObjectFieldProps {
  id: string
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: UISchemaType<any>
}

export const ObjectField: React.FC<ObjectFieldProps> = ({
  id,
  label,
  fields,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}

      {Object.entries(fields).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ([, field]: [string, UISchemaField<any>]) => {
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

          if (field.type === 'array') {
            return (
              <ArrayField
                id={`${id}.${field.id}`}
                key={`${id}.${field.id}`}
                label={field.label}
                item={field.item}
                blankValue={field.blankValue}
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
        }
      )}
    </div>
  )
}
