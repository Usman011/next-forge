'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MDXEditorMethods } from '@mdxeditor/editor'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { InputField } from '@/components/common/InputField'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { AskQuestionSchema } from '@/lib/validations'
import { INPUT_TYPES } from '@/types/form'

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods | null>(null)
  const form = useForm({
    resolver: zodResolver<z.infer<typeof AskQuestionSchema>>(AskQuestionSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  })

  const handleCreateQuestion = (values: z.infer<typeof AskQuestionSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-10'
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <InputField
          name='title'
          label='Question Title'
          description="Be specific and imagine you're asking a question to another person."
          showIsRequired
        />

        <InputField
          name='content'
          label='Detailed explanation of your problem'
          description="Introduce the problem and expand on what you've put in the title."
          type={INPUT_TYPES.EDITOR}
          editorRef={editorRef}
          showIsRequired
        />

        <InputField
          name='tags'
          label='Tags'
          description='Add up to 3 tags to describe what your question is about. You need to press enter to add a tag.'
          type={INPUT_TYPES.TAGS}
          showIsRequired
        />

        <div className='mt-16 flex justify-end'>
          <Button
            type='submit'
            className='primary-gradient w-fit !text-light-900'
          >
            Ask A Question
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default QuestionForm
