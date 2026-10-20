import { useState, type FormEvent } from 'react'
import { login, useGetStateInstanceMutation } from '@/entities/session'
import { getApiUrlByInstanceId, getErrorMessage, type GreenApiCredentials } from '@/shared/api'
import { DEFAULT_API_URL } from '@/shared/config'
import { useAppDispatch } from '@/shared/lib/hooks'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { getInstanceStateError } from '../model/get-instance-state-error'
import { validateCredentials, type CredentialsErrors } from '../model/validate-credentials'

const initialCredentials: GreenApiCredentials = {
  apiUrl: DEFAULT_API_URL,
  idInstance: '',
  apiTokenInstance: '',
}

export function LoginForm() {
  const dispatch = useAppDispatch()
  const [credentials, setCredentials] = useState(initialCredentials)
  const [errors, setErrors] = useState<CredentialsErrors>({})
  const [formError, setFormError] = useState('')
  const [isApiUrlEdited, setIsApiUrlEdited] = useState(false)
  const [getStateInstance, { isLoading }] = useGetStateInstanceMutation()

  const changeField = (field: keyof GreenApiCredentials, value: string) => {
    setCredentials((current) => ({ ...current, [field]: value.trim() }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFormError('')
  }

  const changeIdInstance = (value: string) => {
    changeField('idInstance', value)
    if (!isApiUrlEdited) changeField('apiUrl', getApiUrlByInstanceId(value.trim()))
  }

  const changeApiUrl = (value: string) => {
    setIsApiUrlEdited(true)
    changeField('apiUrl', value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validateCredentials(credentials)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      const { stateInstance } = await getStateInstance(credentials).unwrap()
      const stateError = getInstanceStateError(stateInstance)

      if (stateError) setFormError(stateError)
      else dispatch(login(credentials))
    } catch (error) {
      setFormError(getErrorMessage(error))
    }
  }

  return (
    <form className="flex flex-col gap-4" aria-label="Вход в GREEN-API" onSubmit={handleSubmit} noValidate>
      <Field
        id="idInstance"
        label="idInstance"
        value={credentials.idInstance}
        error={errors.idInstance}
        inputMode="numeric"
        placeholder="1101000001"
        onChange={changeIdInstance}
      />
      <Field
        id="apiTokenInstance"
        label="apiTokenInstance"
        type="password"
        value={credentials.apiTokenInstance}
        error={errors.apiTokenInstance}
        placeholder="d75b3a66374942c5b3c019c698abc2067e151558acbd412345"
        onChange={(value) => changeField('apiTokenInstance', value)}
      />
      <Field
        id="apiUrl"
        label="apiUrl"
        value={credentials.apiUrl}
        error={errors.apiUrl}
        placeholder={DEFAULT_API_URL}
        onChange={changeApiUrl}
      />
      {formError && (
        <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {formError}
        </p>
      )}
      <Button type="submit" size="lg" className="mt-2 h-11 rounded-xl text-base" disabled={isLoading}>
        {isLoading ? 'Проверяем инстанс…' : 'Войти'}
      </Button>
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  value: string
  error?: string
  type?: string
  placeholder?: string
  inputMode?: 'numeric'
  onChange: (value: string) => void
}

function Field({ id, label, value, error, type = 'text', placeholder, inputMode, onChange }: FieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="h-11 rounded-xl"
        onChange={(event) => onChange(event.target.value)}
      />
      {error && (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
