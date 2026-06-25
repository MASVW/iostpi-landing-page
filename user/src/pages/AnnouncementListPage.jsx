import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { containerClass } from '../components/SiteLayout'
import { API_BASE_URL } from '../content/SiteContentProvider'
import { formatDateShort } from '../utils/dateFormat'

function AnnouncementCard({ announcement }) {
  return (
    <Link className="group overflow-hidden rounded-lg border border-[#ccecff] bg-white shadow-[0_12px_34px_rgba(13,93,140,0.06)] transition hover:-translate-y-1 hover:border-[#7fc7e8] hover:shadow-[0_18px_42px_rgba(13,93,140,0.12)]" to={announcement.path || `/pengumuman/${announcement.slug}`}>
      <div className="grid aspect-[1.8] place-items-center bg-white">
        {announcement.image_url ? (
          <img className="h-full w-full object-contain" src={announcement.image_url} alt={announcement.title} loading="lazy" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[#f5fbff] text-[#3d9dce]">
            <Sparkles size={44} strokeWidth={1.4} />
          </div>
        )}
      </div>
      <div className="p-5">
        <time className="text-sm font-bold text-[#6f8394]">{formatDateShort(announcement.published_at)}</time>
        <h3 className="mb-0 mt-2 text-[21px] font-extrabold leading-tight text-[#188fc8] transition group-hover:text-[#0f628d]">
          {announcement.title}
        </h3>
      </div>
    </Link>
  )
}

export default function AnnouncementListPage() {
  const [announcements, setAnnouncements] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Pengumuman'

    const controller = new AbortController()

    async function loadAnnouncements() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL}/api/announcements`, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })

        if (!response.ok) throw new Error(`API Laravel membalas status ${response.status}`)

        const payload = await response.json()
        setAnnouncements(Array.isArray(payload.items) ? payload.items : [])
      } catch (caughtError) {
        if (caughtError.name !== 'AbortError') setError(caughtError)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadAnnouncements()

    return () => controller.abort()
  }, [])

  return (
    <section className="bg-[#f5fbff] py-20 max-[720px]:py-14">
      <div className={containerClass}>
        <div className="mb-7">
          <span className="block text-sm font-black uppercase tracking-[0.04em] text-[#3d9dce]">Informasi Resmi</span>
          <h1 className="m-0 mt-2 text-[clamp(34px,4vw,52px)] font-black leading-none text-[#10283a]">Pengumuman</h1>
        </div>

        {loading && <div className="rounded-lg border border-[#ccecff] bg-white p-6 font-bold text-[#276c94]">Memuat pengumuman...</div>}
        {error && <div className="rounded-lg border border-[#ffd8a8] bg-[#fff7e8] p-6 font-bold text-[#8a5a00]">{error.message}</div>}

        {!loading && !error && announcements.length === 0 && (
          <div className="rounded-lg border border-dashed border-[#9ed8ef] bg-white/80 p-8 text-center shadow-[0_12px_34px_rgba(13,93,140,0.06)]">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#e8f7ff] text-[#3d9dce]">
              <Sparkles size={28} strokeWidth={1.7} />
            </div>
            <h2 className="mb-2 mt-0 text-2xl font-black text-[#10283a]">Tidak ada pengumuman</h2>
            <p className="mx-auto mb-0 max-w-xl text-sm font-bold leading-6 text-[#5e7383]">
              Pengumuman resmi akan tampil di halaman ini setelah admin mempublish data pengumuman dari dashboard.
            </p>
          </div>
        )}

        {!loading && !error && announcements.length > 0 && (
          <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-2 max-[720px]:grid-cols-1">
            {announcements.map((announcement) => (
              <AnnouncementCard announcement={announcement} key={announcement.slug} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
