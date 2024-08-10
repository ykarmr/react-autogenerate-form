import { ObjectField } from '@/components/ObjectField'
import { ArrayField } from '@/components/ArrayField'
import { UISchemaField } from '@/types/uiSchema'
import { BaseInputField } from '@/components/BaseInputField'

type Props<T> = UISchemaField<T> & { id: string }
export function Field<T extends Record<string, T>>(props: Props<T>) {
  if (props.type === 'object') {
    return <ObjectField {...props} />
  }

  if (props.type === 'array') {
    return <ArrayField {...props} />
  }

  return <BaseInputField {...props} />
}
