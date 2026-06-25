import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { CalendarDays, Eye, Facebook, MessageCircle, UserCircle } from 'lucide-react'
import { containerClass } from '../components/SiteLayout'
import { API_BASE_URL } from '../content/SiteContentProvider'
import { formatDateShort, formatDateTimeWib } from '../utils/dateFormat'

function InfoRow({ children, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 text-[19px] font-extrabold leading-tight text-[#132638] max-[720px]:text-base">
      <Icon className="h-6 w-6 text-[#1da0da]" strokeWidth={1.9} />
      <span>{children}</span>
    </div>
  )
}

function RelatedAnnouncement({ announcement }) {
  return (
    <Link className="grid grid-cols-[96px_1fr] gap-4 border-b border-[#d9edf8] py-4 last:border-b-0" to={announcement.path || `/pengumuman/${announcement.slug}`}>
      <div className="grid h-[72px] overflow-hidden rounded-lg border border-[#ccecff] bg-white">
        {announcement.image_url && <img className="h-full w-full object-contain" src={announcement.image_url} alt={announcement.title} loading="lazy" />}
      </div>
      <div>
        <h3 className="mb-2 mt-0 text-lg font-extrabold leading-tight text-[#126b94]">{announcement.title}</h3>
        <time className="text-base font-bold text-[#6f8394]">{formatDateShort(announcement.published_at)}</time>
      </div>
    </Link>
  )
}

export default function AnnouncementDetailPage() {
  const { slug } = useParams()
  const [announcement, setAnnouncement] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const trackedSlug = useRef('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadAnnouncement() {
      setLoading(true)
      setError(null)
      setAnnouncement(null)

      try {
        const response = await fetch(`${API_BASE_URL}/api/announcements/${slug}`, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })

        if (response.status === 404) {
          setAnnouncement(null)
          return
        }

        if (!response.ok) throw new Error(`API Laravel membalas status ${response.status}`)

        const payload = await response.json()
        setAnnouncement(payload)
        document.title = payload.title
      } catch (caughtError) {
        if (caughtError.name !== 'AbortError') setError(caughtError)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadAnnouncement()

    return () => controller.abort()
  }, [slug])

  useEffect(() => {
    if (!announcement?.slug || trackedSlug.current === announcement.slug) return

    trackedSlug.current = announcement.slug

    fetch(`${API_BASE_URL}/api/announcements/${announcement.slug}/view`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
    })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (payload?.viewers !== undefined) {
          setAnnouncement((current) => current ? { ...current, viewers: payload.viewers } : current)
        }
      })
      .catch(() => {})
  }, [announcement?.slug])

  const shareLinks = useMemo(() => {
    if (!announcement) return { facebook: '#', whatsapp: '#' }

    const currentUrl = typeof window === 'undefined' ? '' : window.location.href
    const text = `${announcement.title} ${currentUrl}`.trim()

    return {
      facebook: announcement.facebook_url || `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      whatsapp: announcement.whatsapp_url || `https://wa.me/?text=${encodeURIComponent(text)}`,
    }
  }, [announcement])

  if (loading) {
    return (
      <section className="bg-[#f5fbff] py-16">
        <div className={containerClass}>
          <div className="rounded-lg border border-[#ccecff] bg-white p-6 font-bold text-[#276c94]">Memuat detail pengumuman...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#f5fbff] py-16">
        <div className={containerClass}>
          <div className="rounded-lg border border-[#ffd8a8] bg-[#fff7e8] p-6 font-bold text-[#8a5a00]">{error.message}</div>
        </div>
      </section>
    )
  }

  if (!announcement) return <Navigate to="/tidak-ditemukan" replace />

  return (
    <section className="bg-[#f5fbff] py-14 max-[720px]:py-9">
      <div className={`${containerClass} grid grid-cols-[minmax(0,1fr)_390px] gap-7 max-[1024px]:grid-cols-1`}>
        <main className="grid gap-6">
          <div className="overflow-hidden rounded-lg border border-[#ccecff] bg-white shadow-[0_12px_34px_rgba(13,93,140,0.06)]">
            {announcement.image_url && (
              <img className="h-auto max-h-[640px] w-full object-contain" src={announcement.image_url} alt={announcement.title} />
            )}
          </div>
          <article className="rounded-lg border border-[#ccecff] bg-white p-7 text-[#132638] shadow-[0_12px_34px_rgba(13,93,140,0.06)] max-[720px]:p-5">
            <h1 className="mb-5 mt-0 text-[clamp(34px,4vw,52px)] font-black leading-tight text-[#10283a]">{announcement.title}</h1>
            <div
              className={[
                'text-lg leading-[1.68]',
                '[&_a]:font-bold [&_a]:text-[#1688bd] [&_a]:underline',
                '[&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:text-3xl [&_h1]:font-black [&_h1]:leading-tight',
                '[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-[32px] [&_h2]:font-black [&_h2]:leading-tight',
                '[&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-2xl [&_h3]:font-extrabold',
                '[&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:text-xl [&_h4]:font-bold',
                '[&_h5]:mb-2 [&_h5]:mt-4 [&_h5]:font-bold',
                '[&_li]:mb-2 [&_ol]:mb-[18px] [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-[18px] [&_p]:mt-0 [&_p:last-child]:mb-0 [&_ul]:mb-[18px] [&_ul]:list-disc [&_ul]:pl-6',
              ].join(' ')}
              dangerouslySetInnerHTML={{ __html: announcement.content || '' }}
            />
          </article>
        </main>

        <aside className="grid content-start gap-6">
          <section className="rounded-lg border border-[#ccecff] bg-white p-6 shadow-[0_18px_40px_rgba(13,93,140,0.08)]">
            <h2 className="mb-5 mt-0 text-[27px] font-black leading-tight text-[#126b94]">Informasi Publish</h2>
            <div className="grid gap-5">
              <InfoRow icon={CalendarDays}>{formatDateTimeWib(announcement.published_at)}</InfoRow>
              <InfoRow icon={UserCircle}>{announcement.publisher_name}</InfoRow>
              <InfoRow icon={Eye}>{announcement.viewers} viewers</InfoRow>
            </div>
            <div className="mt-6 flex items-center gap-2.5 max-[420px]:flex-col max-[420px]:items-start">
              <strong className="shrink-0 text-lg text-[#132638]">Bagikan:</strong>
              <a className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#23a7de] px-3 py-2 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(35,167,222,0.16)] transition hover:-translate-y-px" href={shareLinks.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle size={17} /> WhatsApp
              </a>
              <a className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#1f6ff2] px-3 py-2 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(31,111,242,0.16)] transition hover:-translate-y-px" href={shareLinks.facebook} target="_blank" rel="noreferrer">
                <Facebook size={17} /> Facebook
              </a>
            </div>
          </section>

          {announcement.related?.length > 0 && (
            <section className="rounded-lg border border-[#ccecff] bg-white p-6 shadow-[0_18px_40px_rgba(13,93,140,0.08)]">
              <h2 className="mb-4 mt-0 text-[27px] font-black leading-tight text-[#126b94]">Pengumuman Lainnya</h2>
              <div>
                {announcement.related.map((item) => (
                  <RelatedAnnouncement announcement={item} key={item.slug} />
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </section>
  )
}
