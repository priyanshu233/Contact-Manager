import { useState } from 'react'
import { useContacts } from '../context/ContactContext'
import './ContactItem.css'

function ContactItem({ contact, isSelected, onClick }) {
  const { toggleFavorite } = useContacts()
  const [isHovered, setIsHovered] = useState(false)
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(contact.id)
  }
  
  return (
    <div 
      className={`contact-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="contact-avatar" style={{ backgroundColor: contact.color }}>
        {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
      </div>
      <div className="contact-info">
        <h3>{contact.firstName} {contact.lastName}</h3>
        <p>{contact.phone || contact.email}</p>
      </div>
      <button 
        className={`favorite-button ${contact.isFavorite ? 'favorited' : ''} ${isHovered ? 'visible' : ''}`}
        onClick={handleFavoriteClick}
        aria-label={contact.isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {contact.isFavorite ? '★' : '☆'}
      </button>
    </div>
  )
}

export default ContactItem