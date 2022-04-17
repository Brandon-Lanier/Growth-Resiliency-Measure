import { useState } from 'react'
import { AdvancedForm } from '../../forms/AdvancedForm';

export default function AddAdminForm() {
  const [formValues, setFormValues] = useState([])

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setFormValues(values)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
  }

  const formSchema = [
    { name: 'firstName', label: 'First Name', componentType: 'text', required: true },
    { name: 'lastName', label: 'Last Name', componentType: 'text', required: true },
    
    { name: 'playable', label: 'Playable', componentType: 'checkbox' },
    
    {
      name: 'class',
      label: 'Class',
      componentType: 'select',
      options: [
        { label: 'Ranger', value: 'ranger' },
        { label: 'Wizard', value: 'wizard' },
        { label: 'Healer', value: 'healer' },
      ],
    },
    {
      name: 'spell',
      label: 'Spell',
      componentType: 'select',
      options: [
        { label: 'Fire', value: 'fire' },
        { label: 'Ice', value: 'ice' },
      ],
      condition: { key: 'class', value: 'wizard', operator: '=' },
    },
    {
      name: 'description',
      label: 'Description',
      componentType: 'textarea',
    },
  ]

  return (
    <>
      <h1>Advanced Form</h1>

      <div className="flex">
        <div className="form section">
          <AdvancedForm schema={formSchema} onSubmit={handleSubmit} />
        </div>
        <div className="results section">
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </div>
      </div>
    </>
  )

}