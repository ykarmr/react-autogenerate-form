import { UISchemaValueField } from '@/types/uiSchema'
import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

type Props = UISchemaValueField & {
  id: string
}

export function BaseInputField(props: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <div>
      {props.label && <label>{props.label}</label>}

      <input
        {...register(props.id, {
          valueAsNumber: props.type === 'number',
        })}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
      />
      <ErrorMessage
        errors={errors}
        name={props.id}
        render={({ messages }) => {
          return (
            messages &&
            Object.entries(messages).map(([type, message]) => {
              return <p key={type}>{message}</p>
            })
          )
        }}
      />
    </div>
  )
}
