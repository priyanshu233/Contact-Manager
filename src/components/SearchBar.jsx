import { useState, useEffect } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)
    
    return () => clearTimeout(delaySearch)
  }, [searchTerm, onSearch])
  
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }
  
  return (
    <div className="search-bar">
      <input 
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={handleChange}
      />
      {searchTerm && (
        <button 
          className="clear-button" 
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default SearchBar