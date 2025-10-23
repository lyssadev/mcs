import { useState, useEffect, useMemo } from 'react'
import { ReleaseCard } from './ReleaseCard'

export function ReleasesList({ searchQuery }) {
  const [releases, setReleases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/lyssadev/mcs/releases')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch releases')
        return res.json()
      })
      .then(data => {
        const sortedReleases = data.sort((a, b) => {
          return new Date(b.published_at) - new Date(a.published_at)
        })
        setReleases(sortedReleases)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filteredReleases = useMemo(() => {
    if (!searchQuery.trim()) {
      return releases
    }
    
    const query = searchQuery.toLowerCase()
    return releases.filter(release => {
      const name = (release.name || '').toLowerCase()
      const tagName = (release.tag_name || '').toLowerCase()
      return name.includes(query) || tagName.includes(query)
    })
  }, [releases, searchQuery])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading releases...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
        <p className="text-sm text-destructive">Error: {error}</p>
      </div>
    )
  }

  if (filteredReleases.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {searchQuery ? `No releases found matching "${searchQuery}"` : 'No releases found'}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredReleases.map((release) => (
        <ReleaseCard key={release.id} release={release} />
      ))}
    </div>
  )
}