import type { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'
import { AutoForm } from './AutoForm'
import { UISchemaType } from '@/types/uiSchema'

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
})

type FormSchemaType = z.infer<typeof formSchema>

const uiSchema: UISchemaType = {
  name: {
    id: 'name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    type: 'text',
  },
  age: {
    id: 'age',
    label: 'Age',
    placeholder: 'Enter your age',
    type: 'number',
  },
  email: {
    id: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
  password: {
    id: 'password',
    label: 'Password',
    placeholder: 'Enter a secure password',
    type: 'password',
  },
  hobbies: {
    type: 'array',
    id: 'hobbies',
    label: 'Hobbies',
    blankValue: {
      street: 'test',
      city: 'testq',
      zipCode: 'tesra',
    },
    item: {
      type: 'object',
      fields: {
        street: {
          id: 'street',
          label: 'Street',
          placeholder: 'Enter your street',
          type: 'text',
        },
        city: {
          id: 'city',
          label: 'City',
          placeholder: 'Enter your city',
          type: 'text',
        },
        zipCode: {
          id: 'zipCode',
          label: 'Zip Code',
          placeholder: 'Enter your zip code',
          type: 'text',
        },
      },
    },
  },
  address: {
    id: 'address',
    label: 'Address',
    type: 'object',
    fields: {
      street: {
        id: 'street',
        label: 'Street',
        placeholder: 'Enter your street',
        type: 'text',
      },
      city: {
        id: 'city',
        label: 'City',
        placeholder: 'Enter your city',
        type: 'text',
      },
      zipCode: {
        id: 'zipCode',
        label: 'Zip Code',
        placeholder: 'Enter your zip code',
        type: 'text',
      },
    },
  },
}

export const Default: Story = {
  args: {
    formSchema,
    uiSchema,
  },
}
