import qs from 'query-string'

interface UrlQueryProps {
  params: string
  key: string
  value: string
}

interface RemoveKeyFromUrlProps {
  params: string
  keysToRemove: string[]
}

export const formUrlQuery = ({ params, key, value }: UrlQueryProps) => {
  const queryString = qs.parse(params)
  queryString[key] = value
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  )
}

export const removeKeyFromUrl = ({
  params,
  keysToRemove,
}: RemoveKeyFromUrlProps) => {
  const queryString = qs.parse(params)
  keysToRemove.forEach((keyToRemove) => {
    delete queryString[keyToRemove]
  })
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  )
}
