import { useState } from 'react'
import { Download, Calendar, Tag, ExternalLink } from 'lucide-react'
import { BottomSheet } from './BottomSheet'
import { AssetsList } from './AssetsList'

export function ReleaseCard({ release }) {
  const [isAssetsOpen, setIsAssetsOpen] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <>
      <div className="rounded-lg border border-border bg-card p-4 hover:bg-accent/50 transition-colors">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base mb-1 truncate">
              {release.name || release.tag_name}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {release.tag_name}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(release.published_at)}
              </span>
            </div>
          </div>
          {release.prerelease && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-500 shrink-0">
              Pre-release
            </span>
          )}
        </div>

        {release.body && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {release.body}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <a
            href={release.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            View Release
          </a>
          {release.assets && release.assets.length > 0 && (
            <button
              onClick={() => setIsAssetsOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Download className="w-3 h-3" />
              {release.assets.length} {release.assets.length === 1 ? 'asset' : 'assets'}
            </button>
          )}
        </div>
      </div>

      <BottomSheet
        isOpen={isAssetsOpen}
        onClose={() => setIsAssetsOpen(false)}
        title={`Assets - ${release.name || release.tag_name}`}
      >
        <AssetsList assets={release.assets} />
      </BottomSheet>
    </>
  )
}