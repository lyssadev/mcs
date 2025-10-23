import { ThemeToggle } from './ThemeToggle'
import { SearchBar } from './SearchBar'

export function Header({ onSearch }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <h1 className="text-lg font-semibold">mcs repo</h1>
        <div className="flex items-center gap-2">
          <SearchBar onSearch={onSearch} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}