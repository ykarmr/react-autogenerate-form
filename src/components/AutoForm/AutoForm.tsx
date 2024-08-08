import React from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from '@/components/Field'
import { ObjectField } from '@/components/ObjectField'
import { ArrayField } from '@/components/ArrayField'
import { UISchemaField, UISchemaType } from '@/types/uiSchema'

export interface AutoFormProps<T> {
  formSchema: ZodSchema<T>
  uiSchema: UISchemaType
}

export const AutoForm = <T extends Record<string, any>>({
  formSchema,
  uiSchema,
}: AutoFormProps<T>) => {
  const methods = useForm<T>({
    criteriaMode: 'all',
    resolver: zodResolver(formSchema),
  })

  const { handleSubmit } = methods

  const onSubmit: SubmitHandler<T> = (data) => {
    console.log('Form submitted:', data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.entries(uiSchema).map(
          ([key, field]: [string, UISchemaField]) => {
            if (field.type === 'object') {
              return (
                <ObjectField
                  id={`${field.id}`}
                  key={`${field.id}`}
                  label={field.label}
                  fields={field.fields}
                />
              )
            }

            if (field.type === 'array') {
              return (
                <ArrayField
                  id={`${field.id}`}
                  key={`${field.id}`}
                  label={field.label}
                  item={field.item}
                  blankValue={field.blankValue}
                />
              )
            }

            return (
              <Field
                key={field.id}
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
              />
            )
          }
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
