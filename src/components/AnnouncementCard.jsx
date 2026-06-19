import { Link } from 'react-router-dom'

export default function AnnouncementCard({ item }) {
  return (
    <article className="announcement-card">
      <Link className="announcement-image-link" to={`/pengumuman/${item.slug}`} aria-label={`Baca ${item.title}`}>
        <img src={item.image} alt={item.title} />
      </Link>
      <div className="announcement-copy">
        <time>{item.date}</time>
        <h3><Link to={`/pengumuman/${item.slug}`}>{item.title}</Link></h3>
      </div>
    </article>
  )
}
