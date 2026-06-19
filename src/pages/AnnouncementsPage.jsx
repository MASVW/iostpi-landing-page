import { useEffect } from 'react'
import AnnouncementCard from '../components/AnnouncementCard'
import { PageHero } from '../components/SiteLayout'
import { announcements } from '../data/siteData'

export default function AnnouncementsPage() {
  useEffect(() => { document.title = 'Pengumuman - PIOS' }, [])

  return (
    <>
      <PageHero title="Pengumuman" />
      <section className="announcement-list-page section-pad">
        <div className="container announcement-grid">
          {announcements.map((item) => <AnnouncementCard item={item} key={item.slug} />)}
        </div>
      </section>
    </>
  )
}
