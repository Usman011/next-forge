'use client'

import AuthForm from '@/components/forms/AuthForm'
import { SignUpSchema } from '@/lib/validations'

const SignUp = () => {
  return (
    <AuthForm
      schema={SignUpSchema}
      formType='SIGN_UP'
      defaultValues={{
        username: '',
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  )
}

export default SignUp
