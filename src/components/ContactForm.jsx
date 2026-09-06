import { useState } from 'react'
import { profile, projectTypes } from '../data/site'

const initialValues = {
  name: '',
  email: '',
  projectType: '',
  message: '',
}

function validate(values) {
  const errors = {}

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.projectType) {
    errors.projectType = 'Please choose a project type.'
  }

  if (!values.message.trim() || values.message.trim().length < 12) {
    errors.message = 'Please describe the project in a bit more detail.'
  }

  return errors
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')

  const onChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      setStatus('')
      return
    }

    const subject = encodeURIComponent(
      `Project inquiry: ${values.projectType} — ${values.name}`,
    )
    const body = encodeURIComponent(
      [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Project type: ${values.projectType}`,
        '',
        values.message,
      ].join('\n'),
    )

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus(
      'Your email client should open with the message ready to send. If it does not, email me directly.',
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={onChange}
          error={errors.name}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={onChange}
          error={errors.email}
        />
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium">Project type</span>
        <select
          name="projectType"
          value={values.projectType}
          onChange={onChange}
          className="h-12 rounded-lg border border-line bg-bg px-3 text-sm text-fg"
        >
          <option value="">Select a project type</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType ? (
          <span className="text-xs text-muted">{errors.projectType}</span>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium">Message</span>
        <textarea
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          placeholder="Tell me about the website or application you want to build."
          className="resize-y rounded-lg border border-line bg-bg px-3 py-3 text-sm text-fg placeholder:text-muted"
        />
        {errors.message ? (
          <span className="text-xs text-muted">{errors.message}</span>
        ) : null}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted" role="status">
          {status ||
            'This form opens your email client. No third-party email service is configured yet.'}
        </p>
        <button type="submit" className="btn-primary">
          Send message
        </button>
      </div>
    </form>
  )
}

function Field({ label, error, ...props }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        {...props}
        className="h-12 rounded-lg border border-line bg-bg px-3 text-sm text-fg placeholder:text-muted"
      />
      {error ? <span className="text-xs text-muted">{error}</span> : null}
    </label>
  )
}
