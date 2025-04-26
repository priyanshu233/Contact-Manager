import { useContacts } from '../context/ContactContext'
import ContactItem from './ContactItem'
import './ContactList.css'

function ContactList({ onSelectContact, selectedContactId }) {
  const { filteredContacts } = useContacts()
  
  return (
    <div className="contact-list">
      {filteredContacts.map(contact => (
        <ContactItem 
          key={contact.id}
          contact={contact}
          isSelected={contact.id === selectedContactId}
          onClick={() => onSelectContact(contact)}
        />
      ))}
    </div>
  )
}

export default ContactList