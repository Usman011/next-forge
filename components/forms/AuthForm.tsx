'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { DefaultValues, FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import ROUTES from '@/constants/routes'
import { AuthFormProps } from '@/types/form'

import { InputField } from '../common/InputField'

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  })

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    const result = await onSubmit(values)
    if (result.success) {
      form.reset()
    }
  }

  const buttonText = formType === 'SIGN_IN' ? 'Sign In' : 'Sign Up'

  return (
    <div className='w-full max-w-md space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <h1 className='mt-5 text-2xl font-bold'>{buttonText}</h1>

          {Object.keys(defaultValues).map((key) => (
            <InputField key={key} name={key} label={key} />
          ))}

          <Button
            type='submit'
            className='primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? buttonText === 'Sign In'
                ? 'Signing In...'
                : 'Signing Up...'
              : buttonText}
          </Button>
          {formType === 'SIGN_IN' ? (
            <p>
              Don&apos;t have an account?{' '}
              <Link
                className='paragraph-semibold primary-text-gradient'
                href={ROUTES.SIGN_UP}
              >
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link
                className='paragraph-semibold primary-text-gradient'
                href={ROUTES.SIGN_IN}
              >
                Sign In
              </Link>
            </p>
          )}
        </form>
      </Form>
    </div>
  )
}

export default AuthForm
