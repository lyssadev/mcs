import { Download, FileArchive } from 'lucide-react'

export function AssetsList({ assets }) {
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDownloadCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k'
    }
    return count.toString()
  }

  if (!assets || assets.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No assets available for this release
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {assets.map((asset) => (
        <a
          key={asset.id}
          href={asset.browser_download_url}
          download
          className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors group"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
            <FileArchive className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
              {asset.name}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              <span>{formatSize(asset.size)}</span>
              <span className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                {formatDownloadCount(asset.download_count)}
              </span>
            </div>
          </div>

          <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
        </a>
      ))}
    </div>
  )
}
