import Image from 'next/image'
import React from 'react'

import SocialAuthForm from '@/components/forms/SocialAuthForm'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex min-h-screen w-full items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat px-4 py-10 dark:bg-auth-dark'>
      <section className=' light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-xl border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8'>
        <div className='flex items-center justify-between gap-2'>
          <div className='space-y-2.5'>
            <h1 className='h2-bold text-dark100_light900'>Join DevFlow</h1>
            <p className='text-dark500_light400 text-xs'>
              To get your questions answered
            </p>
          </div>
          <Image
            src='/images/site-logo.svg'
            alt='DevFlow Logo'
            width={32}
            height={32}
            className='object-contain'
          />
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  )
}

export default AuthLayout
