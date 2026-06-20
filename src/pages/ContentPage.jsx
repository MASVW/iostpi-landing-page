import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PageHero, RelatedMenu } from '../components/SiteLayout'
import { ASSET_ROOT, contentPages } from '../data/siteData'

export function DownloadList({ files = [] }) {
  if (!files.length) return null

  return (
    <div className="file-downloads">
      <h3>File Unduhan</h3>
      <div className="file-download-links">
        {files.map((file) => {
          const href = file.url || `${ASSET_ROOT}/${file.filename}`
          return (
            <a href={href} target="_blank" rel="noreferrer" key={href}>
              {file.label || file.filename}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function ContentPage() {
  const { slug } = useParams()
  const page = contentPages[slug]

  useEffect(() => {
    if (page) document.title = page.title
  }, [page])

  if (!page) return <Navigate to="/tidak-ditemukan" replace />

  return (
    <>
      <PageHero title={page.title} />
      <section className="content-page section-pad">
        <div className="container content-container">
          {page.image && <img className="content-banner" src={page.image} alt={page.title} />}
          <div className={`content-body ${page.paragraphs.length === 1 ? 'placeholder-content' : ''}`}>
            {page.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <DownloadList files={page.files} />
          <RelatedMenu links={page.related} />
        </div>
      </section>
    </>
  )
}
