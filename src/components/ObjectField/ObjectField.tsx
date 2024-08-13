import { Field } from '../Field/Field'
import { UISchemaType, UISchemaField } from '@/types/uiSchema'
import { Box, Typography } from '@mui/material'

interface ObjectFieldProps<T> {
  id: string
  label?: string
  fields: UISchemaType<T>
}

export function ObjectField<T extends Record<string, T>>({
  id,
  label,
  fields,
}: ObjectFieldProps<T>) {
  return (
    <Box sx={{ paddingY: '16px' }}>
      {label && <Typography variant="h6">{label}</Typography>}
      {Object.entries(fields).map(
        ([subId, field]: [string, UISchemaField<T>]) => {
          return (
            <Field id={`${id}.${subId}`} key={`${id}.${subId}`} {...field} />
          )
        }
      )}
    </Box>
  )
}
