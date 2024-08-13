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
import { Box, Button, Paper } from '@mui/material'

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
      <Paper
        elevation={3}
        sx={{ padding: '24px', marginTop: '24px', borderRadius: '8px' }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          {Object.entries(uiSchema).map(
            ([id, field]: [string, UISchemaField<T>]) => {
              return <Field key={id} id={id} {...field} />
            }
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              backgroundColor: '#1976d2',
              ':hover': { backgroundColor: '#1565c0' },
            }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </FormProvider>
  )
}
