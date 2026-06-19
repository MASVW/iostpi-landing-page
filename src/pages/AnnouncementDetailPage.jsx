import { useEffect, useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CalendarDays, Eye, Facebook, MessageCircle, UserRound } from 'lucide-react'
import { PageHero } from '../components/SiteLayout'
import { announcementArticles, announcements } from '../data/siteData'

function PublishSidebar({ announcement }) {
  const otherAnnouncements = announcements.filter((item) => item.slug !== announcement.slug)
  const shareUrl = `${window.location.origin}/pengumuman/${announcement.slug}`
  const message = `${announcement.title} - ${shareUrl}`

  return (
    <aside className="announcement-sidebar">
      <div className="announcement-meta-widget">
        <h3>Informasi Publish</h3>
        <div className="meta-line"><CalendarDays /><span>{announcement.published}</span></div>
        <div className="meta-line"><UserRound /><span>Administrator Website</span></div>
        <div className="meta-line"><Eye /><span>{announcement.viewers} viewers</span></div>
        <div className="announcement-share">
          <strong>Bagikan:</strong>
          <div>
            <a href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer"><Facebook /> Facebook</a>
          </div>
        </div>
      </div>
      <div className="other-announcement-widget">
        <h3>Pengumuman Lainnya</h3>
        <div className="other-announcement-list">
          {otherAnnouncements.map((item) => (
            <Link className="other-announcement-item" to={`/pengumuman/${item.slug}`} key={item.slug}>
              <span className="other-announcement-thumb"><img src={item.image} alt="" /></span>
              <span className="other-announcement-copy"><strong>{item.title}</strong><small>{item.date}</small></span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default function AnnouncementDetailPage() {
  const { slug } = useParams()
  const announcement = useMemo(() => announcements.find((item) => item.slug === slug), [slug])
  const sections = announcementArticles[slug]

  useEffect(() => {
    if (announcement) document.title = announcement.title
  }, [announcement])

  if (!announcement || !sections) return <Navigate to="/tidak-ditemukan" replace />

  return (
    <>
      <PageHero title={announcement.title} />
      <section className="announcement-detail-page section-pad">
        <div className="container detail-grid">
          <article className="announcement-article">
            <img className="announcement-featured-image" src={announcement.image} alt={announcement.title} />
            <div className="content-body detail-content">
              {sections.map((section, index) => (
                <section key={`${section.heading || 'intro'}-${index}`}>
                  {section.heading && <h2>{section.heading}</h2>}
                  {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
                </section>
              ))}
            </div>
          </article>
          <PublishSidebar announcement={announcement} />
        </div>
      </section>
    </>
  )
}
