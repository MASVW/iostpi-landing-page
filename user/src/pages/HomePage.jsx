import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Backpack,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  MicVocal,
  NotebookTabs,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { containerClass, sectionPadClass } from '../components/SiteLayout'
import { useSiteContent } from '../content/SiteContentProvider'

const activityIcons = {
  'Seminar Guru': MicVocal,
  'Olimpiade Guru': Trophy,
  'LKTI Guru': NotebookTabs,
  'Olimpiade Siswa SMA/MA/SMK': GraduationCap,
  'Olimpiade Siswa SMP/MTs': Backpack,
  'Olimpiade Siswa SD/MI': Sparkles,
}

const heroOverlayStyle = {
  background: 'linear-gradient(90deg, rgba(3, 31, 57, 0.72), rgba(16, 73, 113, 0.49)), rgba(20, 78, 119, 0.15)',
}

function Hero({ slides }) {
  const [active, setActive] = useState(0)
  const activeSlide = slides[active] || slides[0]

  useEffect(() => {
    slides.forEach((slide) => {
      if (!slide.filename) return

      const image = new Image()
      image.src = slide.filename
      image.decode?.().catch(() => {})
    })
  }, [slides])

  useEffect(() => {
    if (!slides.length) return undefined

    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5500)
    return () => window.clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    setActive(0)
  }, [slides])

  const changeSlide = (direction) => {
    setActive((current) => (current + direction + slides.length) % slides.length)
  }

  if (!activeSlide) return null

  return (
    <section className="isolate relative grid h-[700px] place-items-center overflow-hidden bg-[#0c456d] text-white max-[720px]:h-[380px]">
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0c456d]" aria-hidden="true">
        {slides.map((slide, index) => (
          <img
            className={[
              'absolute inset-0 h-full w-full object-cover [backface-visibility:hidden] [transition:opacity_650ms_ease,transform_2800ms_ease] will-change-[opacity,transform]',
              active === index ? 'scale-100 opacity-100' : 'scale-[1.015] opacity-0',
            ].join(' ')}
            src={slide.filename}
            alt=""
            decoding="async"
            key={slide.filename}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1]" style={heroOverlayStyle} />
      <button className="absolute left-[6%] top-1/2 z-[3] grid h-[70px] w-12 -translate-y-1/2 place-items-center border-0 bg-transparent text-white/70 max-[720px]:hidden [&_svg]:h-[38px] [&_svg]:w-[38px] [&_svg]:stroke-[1.3]" aria-label="Sebelumnya" onClick={() => changeSlide(-1)}><ChevronLeft /></button>
      <button className="absolute right-[6%] top-1/2 z-[3] grid h-[70px] w-12 -translate-y-1/2 place-items-center border-0 bg-transparent text-white/70 max-[720px]:hidden [&_svg]:h-[38px] [&_svg]:w-[38px] [&_svg]:stroke-[1.3]" aria-label="Berikutnya" onClick={() => changeSlide(1)}><ChevronRight /></button>
      <div className="absolute bottom-[30px] z-[3] flex gap-[5px] max-[720px]:bottom-[25px]">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-[11px] w-[11px] cursor-pointer border-0 p-0 ${active === index ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => setActive(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
      <p className="absolute bottom-14 z-[3] m-0 block max-w-[min(860px,calc(100%_-_48px))] text-center text-base leading-[1.45] [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">{activeSlide.judul}</p>
    </section>
  )
}

function PartnerNotes({ items }) {
  const articleClass = 'flex min-h-52 flex-col items-start rounded-lg border border-[#bee2f2] bg-gradient-to-br from-[#e8f7ff] to-[#d9effc] p-6 max-[720px]:min-h-0'
  const linkClass = 'mt-auto flex max-w-[120px] justify-center rounded-md bg-[#3a9bd0] px-3.5 py-[9px] text-center text-white shadow-[0_4px_12px_rgba(58,155,208,0.2)]'

  return (
    <section className="pb-16 pt-[94px] max-[720px]:py-[49px] max-[720px]:pt-[23px]">
      <div className={`${containerClass} grid grid-cols-2 gap-[18px] max-[720px]:grid-cols-1`}>
        {items.map((item) => (
          <article className={articleClass} key={item.title}>
            <h3 className="mb-[9px] mt-0 text-[19px] font-bold">{item.title}</h3>
            <p className="mb-[15px] mt-0 leading-[1.55]">{item.description}</p>
            {item.url && <a className={linkClass} href={item.url} target="_blank" rel="noreferrer">View More</a>}
          </article>
        ))}
      </div>
    </section>
  )
}

function ActivitySection({ activities }) {
  return (
    <section className={`${sectionPadClass} bg-gradient-to-br from-[#286997] to-[#49a8da] text-white`}>
      <div className={containerClass}>
        <div>
          <span className="block text-xs font-black uppercase tracking-[0.04em] text-[#55b2df]">Kategori Kegiatan</span>
          <h2 className="mb-7 mt-[5px] text-[clamp(31px,3.6vw,42px)] font-black leading-[1.1] text-white">Pilih Informasi Kegiatan</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[720px]:grid-cols-1 max-[720px]:gap-[15px]">
          {activities.map(({ title, description, path }) => {
            const Icon = activityIcons[title] || Sparkles

            return (
              <Link className="min-h-[170px] rounded-[7px] bg-white p-[23px] text-[#112b3d] shadow-[0_9px_20px_rgba(7,54,88,0.09)] transition hover:-translate-y-1 max-[720px]:min-h-[180px]" to={path} key={title}>
                <Icon className="h-[31px] w-[31px] text-[#47a3cf]" strokeWidth={1.7} />
                <h3 className="mb-1.5 mt-[17px] text-base font-bold">{title}</h3>
                <p className="m-0 text-sm leading-[1.6] text-[#5e7383]">{description}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const { activities, partnerNotes, slides } = useSiteContent()

  useEffect(() => { document.title = 'Olimpiade SCE di USU Medan' }, [])

  return (
    <>
      <Hero slides={slides} />
      <PartnerNotes items={partnerNotes} />
      <ActivitySection activities={activities} />
    </>
  )
}
