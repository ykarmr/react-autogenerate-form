import { useFormContext } from 'react-hook-form'
import { ObjectField } from '@/components/ObjectField'
import { ArrayField } from '@/components/ArrayField'
import { UISchemaField } from '@/types/uiSchema'
import { ErrorMessage } from '@hookform/error-message'

type Props<T> = UISchemaField<T> & { id: string }
export function Field<T extends Record<string, T>>(props: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  if (props.type === 'object') {
    return <ObjectField {...props} />
  }

  if (props.type === 'array') {
    return <ArrayField {...props} />
  }

  return (
    <div>
      {props.label && <label>{props.label}</label>}

      <input
        {...register(props.id)}
        key={props.id}
        name={props.id}
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
