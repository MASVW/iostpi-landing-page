import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PageHero, RelatedMenu, containerClass, sectionPadClass } from '../components/SiteLayout'
import { useSiteContent } from '../content/SiteContentProvider'

const PUBLIC_ASSET_ROOT = '/assets'

export function DownloadList({ files = [] }) {
  if (!files.length) return null

  return (
    <div className="mt-[22px] rounded-lg border border-[#ccecff] bg-[#f6fcff] p-[18px]">
      <h3 className="mb-3 mt-0 text-lg font-bold text-[#0d5d8c]">File Unduhan</h3>
      <div className="flex flex-wrap gap-[9px]">
        {files.map((file) => {
          const href = file.url || `${PUBLIC_ASSET_ROOT}/${file.filename}`
          return (
            <a className="rounded-[7px] bg-gradient-to-br from-[#2878b5] to-[#43a9d4] px-3.5 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(42,128,183,0.18)] transition hover:-translate-y-px hover:shadow-[0_12px_24px_rgba(42,128,183,0.25)]" href={href} target="_blank" rel="noreferrer" key={href}>
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
  const { pages } = useSiteContent()
  const page = pages[slug]
  const imageUrl = page?.image_url || page?.image
  const html = page?.content

  useEffect(() => {
    if (page) document.title = page.title
  }, [page])

  if (!page) return <Navigate to="/tidak-ditemukan" replace />

  return (
    <>
      <PageHero title={page.title} />
      <section className={sectionPadClass}>
        <div className={`${containerClass} max-w-[936px]`}>
          {imageUrl && <img className="w-full max-h-[570px] object-cover max-[720px]:max-h-none" src={imageUrl} alt={page.title} />}
          <div
            className={[
              'rich-content',
              imageUrl ? 'pt-0' : '',
            ].join(' ')}
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <DownloadList files={page.files} />
          <RelatedMenu links={page.related} />
        </div>
      </section>
    </>
  )
}
