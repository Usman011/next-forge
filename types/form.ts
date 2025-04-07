/* eslint-disable no-unused-vars */

import { MDXEditorMethods } from '@mdxeditor/editor'
import { ForwardedRef } from 'react'
import { FieldValues, Path, PathValue } from 'react-hook-form'
import { ZodType } from 'zod'

import { SelectOptions } from '@/components/common/InputField'

export enum INPUT_TYPES {
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  DATE = 'date',
  FILE = 'file',
  SELECT = 'select',
  EDITOR = 'editor',
  TAGS = 'tags',
}

export interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>
  defaultValues: T
  formType: 'SIGN_IN' | 'SIGN_UP'
  onSubmit: (data: T) => Promise<{ success: boolean; data: T }>
}

export type InputFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>
  type?: string
  rows?: number
  disabled?: boolean
  label?: string
  multiline?: boolean
  placeholder?: string
  className?: string
  selectOptions?: SelectOptions[]
  showIsRequired?: boolean
  description?: string
  editorRef?: ForwardedRef<MDXEditorMethods> | null
  maxTags?: number
  tagLength?: number
}

export interface SigninWithOAuthProps {
  provider: 'google' | 'github'
  providerAccountId: string
  user: {
    name?: string
    email?: string
    image?: string
  }
}
