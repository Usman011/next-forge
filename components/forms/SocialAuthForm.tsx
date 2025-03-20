'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import React from 'react'
import { toast } from 'sonner'

import ROUTES from '@/constants/routes'

import { Button } from '../ui/button'

const SocialAuthForm = () => {
  const buttonClasses =
    'body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 background-dark400_light900'

  const handleSignIn = async (provider: 'google' | 'github') => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      })
    } catch (error) {
      console.error(error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An Error occurred during sign-in'
      toast.error(errorMessage)
    }
  }

  return (
    <div className='mt-10 flex flex-wrap gap-2.5'>
      {/* <Button className={buttonClasses} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span className="text-dark200_light800">Continue with Google</span>
      </Button> */}
      <Button className={buttonClasses} onClick={() => handleSignIn('github')}>
        <Image
          src='/icons/github.svg'
          alt='Github logo'
          width={20}
          height={20}
          className='invert-colors mr-2.5 object-contain'
        />
        <span className='text-dark200_light800'>Continue with Github</span>
      </Button>
    </div>
  )
}

export default SocialAuthForm
