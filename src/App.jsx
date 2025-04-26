import { useState } from 'react'
import ContactList from './components/ContactList'
import ContactDetail from './components/ContactDetail'
import ContactForm from './components/ContactForm'
import SearchBar from './components/SearchBar'
import EmptyState from './components/EmptyState'
import { useContacts } from './context/ContactContext'
import './App.css'

function App() {
  const { contacts, searchContacts } = useContacts()
  const [selectedContact, setSelectedContact] = useState(null)
  const [isAddingContact, setIsAddingContact] = useState(false)
  const [isEditingContact, setIsEditingContact] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSearch = (term) => {
    setSearchTerm(term)
    searchContacts(term)
  }
  
  const handleSelectContact = (contact) => {
    setSelectedContact(contact)
    setIsAddingContact(false)
    setIsEditingContact(false)
  }
  
  const handleAddContact = () => {
    setSelectedContact(null)
    setIsAddingContact(true)
    setIsEditingContact(false)
  }
  
  const handleEditContact = () => {
    setIsAddingContact(false)
    setIsEditingContact(true)
  }
  
  const handleCancel = () => {
    if (isAddingContact) {
      setIsAddingContact(false)
    } else if (isEditingContact) {
      setIsEditingContact(false)
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Contacts</h1>
          <button 
            className="add-button" 
            onClick={handleAddContact}
            aria-label="Add new contact"
          >
            +
          </button>
        </div>
        <SearchBar onSearch={handleSearch} />
        {contacts.length > 0 ? (
          <ContactList 
            onSelectContact={handleSelectContact}
            selectedContactId={selectedContact?.id}
          />
        ) : (
          <EmptyState 
            message={searchTerm ? "No contacts match your search" : "No contacts yet"} 
            action={searchTerm ? null : handleAddContact}
            actionText="Add your first contact"
          />
        )}
      </aside>
      <main className="main-content">
        {isAddingContact ? (
          <ContactForm mode="add" onCancel={handleCancel} />
        ) : isEditingContact ? (
          <ContactForm mode="edit" contact={selectedContact} onCancel={handleCancel} />
        ) : selectedContact ? (
          <ContactDetail contact={selectedContact} onEdit={handleEditContact} />
        ) : (
          <div className="no-selection">
            <p>Select a contact or add a new one</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App