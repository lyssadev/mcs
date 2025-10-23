import { useState } from 'react'
import { Search, X } from 'lucide-react'

export function SearchBar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSearchValue('')
    onSearch('')
  }

  const handleChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }

  return (
    <div className="flex items-center">
      {!isOpen ? (
        <button
          onClick={handleOpen}
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Search releases"
        >
          <Search className="h-5 w-5" />
        </button>
      ) : (
        <div className="flex items-center gap-2 animate-search-expand">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchValue}
              onChange={handleChange}
              placeholder="Search releases..."
              autoFocus
              className="w-48 pl-8 pr-3 py-1.5 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}