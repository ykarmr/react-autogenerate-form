import { UISchemaValueField } from '@/types/uiSchema'
import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { Box, TextField, Typography } from '@mui/material'

type Props = UISchemaValueField & {
  id: string
}

export function BaseInputField(props: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        paddingY: '4px',
      }}
    >
      {props.label && (
        <Typography variant="body1" gutterBottom sx={{ color: '#555' }}>
          {props.label}
        </Typography>
      )}
      <TextField
        {...register(props.id, {
          valueAsNumber: props.type === 'number',
        })}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        variant="outlined"
        fullWidth
        error={!!errors[props.id]}
        helperText={
          <ErrorMessage
            errors={errors}
            name={props.id}
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Typography key={type} variant="caption" color="error">
                  {message}
                </Typography>
              ))
            }
          />
        }
      />
    </Box>
  )
}
