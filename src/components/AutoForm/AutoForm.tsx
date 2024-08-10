import {
  useForm,
  SubmitHandler,
  FormProvider,
  DefaultValues,
} from 'react-hook-form'
import { ZodSchema } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field } from '@/components/Field'
import { UISchemaField, UISchemaType } from '@/types/uiSchema'

export interface AutoFormProps<T> {
  defaultValues?: DefaultValues<T>
  formSchema: ZodSchema<T>
  uiSchema: UISchemaType<T>
}

export function AutoForm<T extends Record<string, T>>({
  defaultValues,
  formSchema,
  uiSchema,
}: AutoFormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
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
          ([id, field]: [string, UISchemaField<T>]) => {
            return <Field key={id} id={id} {...field} />
          }
        )}
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}
