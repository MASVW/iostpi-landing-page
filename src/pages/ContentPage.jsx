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

  const isProcedure = page.title === "Prosedur Pendaftaran";

  return (
    <>
      <PageHero title={page.title} />
      <section className="content-page section-pad">
        <div className="container content-container">
          {page.image && <img className="content-banner" src={page.image} alt={page.title} />}
          {isProcedure ?
            <div className={`content-body ${page.paragraphs.length === 1 ? 'placeholder-content' : ''}`}>
              {
                page.paragraphs.map((paragraph, index) => {
                  return <>
                    {index == 1 ?
                      <a
                        href="https://drive.google.com/drive/folders/1TIsWu83PVOL3AXvms7xaqONVcBHIGsIy?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "block",
                          textAlign: "center",
                          color: "#0066cc",
                          fontSize: "20px",
                          fontWeight: "700",
                          textDecoration: "underline",
                          margin: "24px 0",
                        }}
                      >
                        Klik Disini Panduan Pendaftaran Olimpiade SCE 2026
                      </a>
                      : null}
                    <p key={index}>{paragraph}</p>
                  </>
                })
              }
            </div>
            :
            <div className={`content-body ${page.paragraphs.length === 1 ? 'placeholder-content' : ''}`}>
              {page.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          }
          <DownloadList files={page.files} />
          <RelatedMenu links={page.related} />
        </div>
      </section >
    </>
  )
}
