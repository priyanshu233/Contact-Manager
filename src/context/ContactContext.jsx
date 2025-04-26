import { createContext, useContext, useReducer, useEffect } from 'react'

// Define the initial state
const initialState = {
  contacts: [],
  filteredContacts: []
}

// Generate a unique ID for new contacts
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

// Action types
const ADD_CONTACT = 'ADD_CONTACT'
const UPDATE_CONTACT = 'UPDATE_CONTACT'
const DELETE_CONTACT = 'DELETE_CONTACT'
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
const SEARCH_CONTACTS = 'SEARCH_CONTACTS'

// Reducer function
const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      const newContact = {
        ...action.payload,
        id: generateId()
      }
      const updatedContacts = [...state.contacts, newContact]
      return {
        ...state,
        contacts: updatedContacts,
        filteredContacts: updatedContacts
      }
      
    case UPDATE_CONTACT:
      const updatedContactsList = state.contacts.map(contact => 
        contact.id === action.payload.id ? { ...contact, ...action.payload.data } : contact
      )
      return {
        ...state,
        contacts: updatedContactsList,
        filteredContacts: updatedContactsList
      }
      
    case DELETE_CONTACT:
      const filteredContacts = state.contacts.filter(contact => contact.id !== action.payload)
      return {
        ...state,
        contacts: filteredContacts,
        filteredContacts: filteredContacts
      }
      
    case TOGGLE_FAVORITE:
      const toggledContacts = state.contacts.map(contact => 
        contact.id === action.payload
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
      return {
        ...state,
        contacts: toggledContacts,
        filteredContacts: toggledContacts
      }
      
    case SEARCH_CONTACTS:
      const searchTerm = action.payload.toLowerCase()
      if (!searchTerm) {
        return {
          ...state,
          filteredContacts: state.contacts
        }
      }
      
      const searchResults = state.contacts.filter(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase()
        return (
          fullName.includes(searchTerm) ||
          (contact.email && contact.email.toLowerCase().includes(searchTerm)) ||
          (contact.phone && contact.phone.includes(searchTerm)) ||
          (contact.group && contact.group.toLowerCase().includes(searchTerm))
        )
      })
      return {
        ...state,
        filteredContacts: searchResults
      }
      
    default:
      return state
  }
}

// Create context
const ContactContext = createContext()

// Provider component
export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState)
  
  // Load contacts from localStorage on initial load
  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts')
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts)
      parsedContacts.forEach(contact => {
        dispatch({
          type: ADD_CONTACT,
          payload: contact
        })
      })
    }
  }, [])
  
  // Save contacts to localStorage whenever they change
  useEffect(() => {
    if (state.contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(state.contacts))
    }
  }, [state.contacts])
  
  // Actions
  const addContact = (contact) => {
    dispatch({
      type: ADD_CONTACT,
      payload: contact
    })
  }
  
  const updateContact = (id, data) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: { id, data }
    })
  }
  
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
  }
  
  const toggleFavorite = (id) => {
    dispatch({
      type: TOGGLE_FAVORITE,
      payload: id
    })
  }
  
  const searchContacts = (term) => {
    dispatch({
      type: SEARCH_CONTACTS,
      payload: term
    })
  }
  
  const value = {
    contacts: state.contacts,
    filteredContacts: state.filteredContacts,
    addContact,
    updateContact,
    deleteContact,
    toggleFavorite,
    searchContacts
  }
  
  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  )
}

// Custom hook for using the context
export const useContacts = () => {
  const context = useContext(ContactContext)
  if (!context) {
    throw new Error('useContacts must be used within a ContactProvider')
  }
  return context
}