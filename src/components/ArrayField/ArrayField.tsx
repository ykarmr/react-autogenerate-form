import { useFieldArray, useFormContext } from 'react-hook-form'
import { Field } from '../Field/Field'
import { UISchemaArrayField, UISchemaField } from '@/types/uiSchema'
import {
  Box,
  Button,
  IconButton,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

type Props<T> = UISchemaArrayField<T> & { id: string }

export function ArrayField<T extends Record<string, T>>({
  id,
  label,
  item,
}: Props<T>) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: id,
  })

  const createBlankValue = (
    item: UISchemaField<T>
  ):
    | Record<string, unknown>
    | Record<string, unknown>[]
    | unknown[]
    | unknown => {
    if (item.type === 'object') {
      let value: Record<string, unknown> = {}
      Object.entries(item.fields).map(
        ([id, field]: [string, UISchemaField<T>]) => {
          value = {
            ...value,
            [id]: createBlankValue(field),
          }
        }
      )
      return value
    } else if (item.type === 'array') {
      let value: Record<string, unknown>[] | unknown[] = []
      value = [...value, createBlankValue(item.item)]
      return value
    } else {
      return item.defaultValue
    }
  }

  return (
    <Box
      sx={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}
    >
      {label && (
        <Typography
          variant="h6"
          sx={{ marginBottom: '16px', color: '#333', fontWeight: 'bold' }}
        >
          {label}
        </Typography>
      )}
      {fields.map((field, index) => {
        return (
          <Card
            key={field.id}
            variant="outlined"
            sx={{
              mb: 2,
              position: 'relative',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              overflow: 'visible',
            }}
          >
            <IconButton
              color="error"
              onClick={() => remove(index)}
              aria-label="remove"
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: '#ffffff',
                ':hover': {
                  backgroundColor: '#ffebee',
                },
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}
            >
              <RemoveIcon />
            </IconButton>
            <CardContent>
              <Field {...item} id={`${id}[${index}]`} />
            </CardContent>
          </Card>
        )
      })}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => append(createBlankValue(item))}
        sx={{
          marginTop: '16px',
          backgroundColor: '#1976d2',
          ':hover': { backgroundColor: '#1565c0' },
        }}
      >
        Add {label}
      </Button>
    </Box>
  )
}
