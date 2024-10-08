import type { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { AutoForm } from './AutoForm'
import { UISchemaType } from '@/types/uiSchema'
import { DefaultValues } from 'react-hook-form'

const meta = {
  component: AutoForm,
  title: 'AutoForm',
} satisfies Meta<typeof AutoForm>

export default meta

type Story = StoryObj<typeof AutoForm>

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0, 'Age must be a positive number'),
  email: z.string().email('Invalid email address'),
  hobbies: z.array(
    z.object({
      street: z.string().min(1, 'Street is required'),
      city: z.string().min(1, 'City is required'),
      zipCode: z.string().min(1, 'Zip Code is required'),
    })
  ),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    zipCode: z.string().min(1, 'Zip Code is required'),
  }),
  address1: z.array(z.string().min(1, 'Street is required')),
})

type FormSchemaType = z.infer<typeof formSchema>

const uiSchema: UISchemaType<FormSchemaType> = {
  name: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    type: 'text',
    defaultValue: 'defaultValue',
  },
  age: {
    label: 'Age',
    placeholder: 'Enter your age',
    type: 'number',
  },
  email: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
  // password: {
  //   label: 'Password',
  //   placeholder: 'Enter a secure password',
  //   type: 'password',
  // },
  hobbies: {
    type: 'array',
    label: 'Hobbies',
    item: {
      type: 'object',
      fields: {
        street: {
          label: 'Street',
          placeholder: 'Enter your street',
          type: 'text',
          defaultValue: 'test',
        },
        city: {
          label: 'City',
          placeholder: 'Enter your city',
          type: 'text',
        },
        zipCode: {
          label: 'Zip Code',
          placeholder: 'Enter your zip code',
          type: 'text',
        },
      },
    },
  },
  address: {
    label: 'Address',
    type: 'object',
    fields: {
      street: {
        label: 'Street',
        placeholder: 'Enter your street',
        type: 'text',
      },
      city: {
        label: 'City',
        placeholder: 'Enter your city',
        type: 'text',
      },
      zipCode: {
        label: 'Zip Code',
        placeholder: 'Enter your zip code',
        type: 'text',
      },
    },
  },
  address1: {
    type: 'array',
    label: 'address1',
    item: {
      type: 'text',
      label: 'address1',
    },
  },
}

const defaultValues: DefaultValues<FormSchemaType> = {
  name: 'test',
  hobbies: [{ street: '1' }],
}

export const Default: Story = {
  args: {
    defaultValues,
    formSchema,
    uiSchema,
  },
}
