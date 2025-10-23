import { useState } from 'react'
import { Header } from './components/Header'
import { ReleasesList } from './components/ReleasesList'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />

      <main className="container px-4 py-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Releases</h2>
          <p className="text-sm text-muted-foreground">
            Latest releases from lyssadev/mcs
          </p>
        </div>

        <ReleasesList searchQuery={searchQuery} />
      </main>
    </div>
  )
}

export default App