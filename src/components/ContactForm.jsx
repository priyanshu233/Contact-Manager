import { useState, useEffect } from 'react'
import { useContacts } from '../context/ContactContext'
import './ContactForm.css'

const GROUPS = ['Family', 'Friends', 'Work', 'School', 'Other']

// Generate a random color for contact avatars
const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 50%)`
}

function ContactForm({ mode = 'add', contact = null, onCancel }) {
  const { addContact, updateContact } = useContacts()
  
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    notes: '',
    group: '',
    isFavorite: false,
    color: getRandomColor()
  })
  
  useEffect(() => {
    if (mode === 'edit' && contact) {
      setFormValues({
        ...contact
      })
    }
  }, [mode, contact])
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formValues.firstName || !formValues.lastName) {
      alert('First name and last name are required')
      return
    }
    
    if (mode === 'add') {
      addContact(formValues)
    } else {
      updateContact(contact.id, formValues)
    }
    
    onCancel()
  }
  
  return (
    <div className="contact-form-container">
      <h2 className="form-title">{mode === 'add' ? 'Add New Contact' : 'Edit Contact'}</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formValues.address}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formValues.birthday}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="group">Group</label>
            <select
              id="group"
              name="group"
              value={formValues.group}
              onChange={handleChange}
            >
              <option value="">No Group</option>
              {GROUPS.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formValues.notes}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-checkbox">
          <input
            type="checkbox"
            id="isFavorite"
            name="isFavorite"
            checked={formValues.isFavorite}
            onChange={handleChange}
          />
          <label htmlFor="isFavorite">Mark as favorite</label>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            {mode === 'add' ? 'Add Contact' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm