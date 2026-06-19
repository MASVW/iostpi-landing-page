import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PageHero, RelatedMenu } from '../components/SiteLayout'
import { contentPages } from '../data/siteData'

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
          <RelatedMenu links={page.related} />
        </div>
      </section>
    </>
  )
}
