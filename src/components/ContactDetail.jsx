import { useContacts } from '../context/ContactContext'
import './ContactDetail.css'

function ContactDetail({ contact, onEdit }) {
  const { deleteContact } = useContacts()
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(contact.id)
    }
  }
  
  return (
    <div className="contact-detail">
      <div className="contact-detail-header">
        <div 
          className="contact-detail-avatar" 
          style={{ backgroundColor: contact.color }}
        >
          {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
        </div>
        <div className="contact-detail-title">
          <h2>{contact.firstName} {contact.lastName}</h2>
          <p className="contact-group">{contact.group || 'No group'}</p>
          {contact.isFavorite && <span className="favorite-badge">★ Favorite</span>}
        </div>
      </div>
      
      <div className="contact-detail-actions">
        <button className="edit-button" onClick={onEdit}>Edit</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
      
      <div className="contact-detail-info">
        {contact.email && (
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{contact.email}</span>
          </div>
        )}
        
        {contact.phone && (
          <div className="info-item">
            <span className="info-label">Phone</span>
            <span className="info-value">{contact.phone}</span>
          </div>
        )}
        
        {contact.address && (
          <div className="info-item">
            <span className="info-label">Address</span>
            <span className="info-value">{contact.address}</span>
          </div>
        )}
        
        {contact.birthday && (
          <div className="info-item">
            <span className="info-label">Birthday</span>
            <span className="info-value">{contact.birthday}</span>
          </div>
        )}
        
        {contact.notes && (
          <div className="info-item notes">
            <span className="info-label">Notes</span>
            <p className="info-value">{contact.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactDetail