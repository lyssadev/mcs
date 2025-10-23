import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const root = window.document.documentElement
    
    if (savedTheme) {
      setTheme(savedTheme)
      root.classList.remove('dark', 'light')
      root.classList.add(savedTheme)
    } else {
      const initialTheme = root.classList.contains('dark') ? 'dark' : 'light'
      setTheme(initialTheme)
      localStorage.setItem('theme', initialTheme)
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    root.classList.remove(theme)
    root.classList.add(newTheme)
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  )
}