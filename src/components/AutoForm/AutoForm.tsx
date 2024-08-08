import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from '@/components/Field'
import { ObjectField } from '@/components/ObjectField'
import { ArrayField } from '@/components/ArrayField'
import { UISchemaField, UISchemaType } from '@/types/uiSchema'

export interface AutoFormProps<T> {
  formSchema: ZodSchema<T>
  uiSchema: UISchemaType<T>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutoForm<T extends Record<string, any>>({
  formSchema,
  uiSchema,
}: AutoFormProps<T>) {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ([, field]: [string, UISchemaField<any>]) => {
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
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}
