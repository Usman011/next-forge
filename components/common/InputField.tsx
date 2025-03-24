import dynamic from 'next/dynamic'
import { FieldValues, useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { INPUT_TYPES, InputFieldProps } from '@/types/form'

import TagCard from '../cards/TagCard'

const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
})

export const capitalizeText = (text: string) => {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export interface SelectOptions {
  label: string
  value: string | number
}

export const InputField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  defaultValue,
  type = INPUT_TYPES.TEXT,
  disabled,
  label,
  placeholder,
  selectOptions,
  className,
  multiline = false,
  showIsRequired = false,
  description,
  editorRef,
  maxTags = 3,
  tagLength = 15,
}: InputFieldProps<TFieldValues>) => {
  const { control, setValue, clearErrors, setError } = useFormContext()

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const tagInput = e.currentTarget.value.trim()

      if (
        tagInput &&
        tagInput.length < tagLength &&
        !field.value.includes(tagInput)
      ) {
        setValue(name as string, [...field.value, tagInput])
        e.currentTarget.value = ''
        clearErrors(name)
      } else if (tagInput.length > tagLength) {
        setError(name, {
          type: 'manual',
          message: `Tag must be less than ${tagLength} characters`,
        })
      } else if (field.value.includes(tagInput)) {
        setError(name, {
          type: 'manual',
          message: 'Tag already exists',
        })
      } else if (field.value.length > maxTags) {
        setError(name, {
          type: 'manual',
          message: `You can only add ${maxTags} tags`,
        })
      }
    }
  }

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag)
    setValue(name as string, newTags)

    if (newTags.length === 0) {
      setError(name, {
        type: 'manual',
        message: 'Please add at least one tag',
      })
    }
  }

  const renderFormLabel = (labelText?: string) => (
    <FormLabel className='paragraph-medium text-dark400_light700'>
      {capitalizeText(labelText || '')}
      {showIsRequired && <span className='text-red-400'>{` * `}</span>}
    </FormLabel>
  )

  const commonInputProps = {
    placeholder,
    type,
    defaultValue,
    disabled,
    className:
      'paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 resize-none rounded-1.5 border',
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        switch (type) {
          case INPUT_TYPES.CHECKBOX:
            return (
              <FormItem
                className={cn(
                  className,
                  'flex items-center w-full flex-col gap-2.5'
                )}
              >
                {renderFormLabel(label)}
                <FormControl>
                  <Input
                    {...field}
                    value={defaultValue}
                    type={type}
                    className='size-4 rounded-sm'
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className='body-regular mt-2.5 text-light-400'>
                  {description}
                </FormDescription>
              </FormItem>
            )

          case INPUT_TYPES.SELECT:
            return (
              <FormItem className={className}>
                {renderFormLabel(label)}
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={disabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={capitalizeText(placeholder || '')}
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {selectOptions?.map(({ value, label }) => (
                      <SelectItem key={value} value={value.toString()}>
                        {capitalizeText(label)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription className='body-regular mt-2.5 text-light-400'>
                  {description}
                </FormDescription>
              </FormItem>
            )

          case INPUT_TYPES.EDITOR:
            return (
              <FormItem className={cn(className, ' w-full gap-2.5')}>
                {renderFormLabel(label)}
                <FormControl>
                  <div className='w-full'>
                    {editorRef ? (
                      <Editor
                        value={field.value}
                        fieldChange={field.onChange}
                        editorRef={editorRef}
                      />
                    ) : (
                      <div className='text-red-400'>
                        Editor ref is not provided
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
                <FormDescription className='body-regular mt-2.5 text-light-400'>
                  {description}
                </FormDescription>
              </FormItem>
            )

          case INPUT_TYPES.TAGS:
            return (
              <FormItem className={cn(className, ' w-full gap-2.5')}>
                {renderFormLabel(label)}
                <FormControl>
                  <div>
                    <Input
                      {...commonInputProps}
                      onKeyDown={(e) => handleKeyDown(e, field)}
                    />
                    <div>
                      {field.value.length > 0 && (
                        <div className='flex-start mt-2.5 flex-wrap gap-2.5'>
                          {field.value.map((tag: string) => (
                            <TagCard
                              key={tag}
                              _id={tag}
                              name={tag}
                              compact
                              remove
                              isButton
                              handleRemove={() => handleTagRemove(tag, field)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className='text-red-400' />
                <FormDescription className='body-regular mt-2.5 text-light-400'>
                  {description}
                </FormDescription>
              </FormItem>
            )

          default:
            if (multiline) {
              return (
                <FormItem className={className}>
                  {renderFormLabel(label)}
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={5}
                      placeholder={placeholder}
                      defaultValue={defaultValue}
                      disabled={disabled}
                      className={commonInputProps.className}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription className='body-regular mt-2.5 text-light-400'>
                    {description}
                  </FormDescription>
                </FormItem>
              )
            }

            return (
              <FormItem className={className}>
                {renderFormLabel(label)}
                <FormControl>
                  <Input {...field} {...commonInputProps} />
                </FormControl>
                <FormMessage />
                <FormDescription className='body-regular mt-2.5 text-light-400'>
                  {description}
                </FormDescription>
              </FormItem>
            )
        }
      }}
    />
  )
}
