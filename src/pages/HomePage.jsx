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
import AnnouncementCard from '../components/AnnouncementCard'
import { announcements, slides } from '../data/siteData'

const teacherActivities = [
  { title: 'LKTI Guru', description: 'Informasi lomba karya tulis ilmiah guru.', icon: NotebookTabs, path: '/page/lkti-guru' },
  { title: 'Seminar Guru', description: 'Informasi seminar guru PIOS.', icon: MicVocal, path: '/page/seminar-guru' },
  { title: 'Olimpiade Guru', description: 'Informasi olimpiade guru.', icon: Trophy, path: '/page/olimpiade-guru' },
]

const activities = [
  { title: 'Seminar Guru', description: 'Informasi seminar guru PIOS.', icon: MicVocal, path: '/page/seminar-guru' },
  { title: 'Olimpiade Guru', description: 'Informasi olimpiade guru.', icon: Trophy, path: '/page/olimpiade-guru' },
  { title: 'LKTI Guru', description: 'Informasi lomba karya tulis ilmiah guru.', icon: NotebookTabs, path: '/page/lkti-guru' },
  { title: 'Olimpiade Siswa SMA/MA/SMK', description: 'Informasi olimpiade siswa tingkat SMA/MA/SMK.', icon: GraduationCap, path: '/page/olimpiade-siswa-sma-ma-smk' },
  { title: 'Olimpiade Siswa SMP/MTs', description: 'Informasi olimpiade siswa tingkat SMP/MTs.', icon: Backpack, path: '/page/olimpiade-siswa-smp-mts' },
  { title: 'Olimpiade Siswa SD/MI', description: 'Informasi olimpiade siswa tingkat SD/MI.', icon: Sparkles, path: '/page/olimpiade-siswa-sd-mi' },
]

function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5500)
    return () => window.clearInterval(timer)
  }, [])

  const changeSlide = (direction) => {
    setActive((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <section className="hero" style={{ '--hero-image': `url(${slides[active]['filename']})` }}>
      <button className="hero-arrow hero-arrow-left" aria-label="Sebelumnya" onClick={() => changeSlide(-1)}><ChevronLeft /></button>
      <button className="hero-arrow hero-arrow-right" aria-label="Berikutnya" onClick={() => changeSlide(1)}><ChevronRight /></button>
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button key={index} className={active === index ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Slide ${index + 1}`} />
        ))}
      </div>
      <p className='hero-placeholder'>{slides[active]['judul']}</p>
    </section>
  )
}

function TeacherCards() {
  return (
    <section className="teacher-section">
      <div className="container teacher-grid">
        {teacherActivities.map(({ title, description, icon: Icon, path }) => (
          <Link to={path} className="teacher-card" key={title}>
            <span className="icon-box"><Icon /></span>
            <h3>{title}</h3>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

function PartnerNotes() {
  return (
    <section className="partner-notes section-pad">
      <div className="container partner-grid">
        <article>
          <h3>PT. Pelatos Nasional Indonesia</h3>
          <p>Seluruh Soal Olimpiade Sains Dibuat dan Ditanggungjawabi Oleh: PT. Pelatos Nasional Indonesia (Pelatihan OSN), Kota Depok - Jawa Barat</p>
          <a href="https://pelatihan-osn.com/" target="_blank" rel="noreferrer">View More</a>
        </article>
        <article>
          <h3>English 1 Jakarta</h3>
          <p>Seluruh Soal Olimpiade Bahasa Inggris Dibuat dan Ditanggungjawabi Oleh: English 1 Jakarta</p>
          <a href="https://www.britishcouncilfoundation.id/" target="_blank" rel="noreferrer">View More</a>
        </article>
      </div>
    </section>
  )
}

function ActivitySection() {
  return (
    <section className="activity-section section-pad">
      <div className="container">
        <div className="section-heading section-heading-light">
          <span>Kategori Kegiatan</span>
          <h2>Pilih Informasi Kegiatan</h2>
        </div>
        <div className="activity-grid">
          {activities.map(({ title, description, icon: Icon, path }) => (
            <Link className="activity-card" to={path} key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnnouncementSection() {
  return (
    <section className="announcements section-pad">
      <div className="container">
        <div className="announcement-heading">
          <div className="section-heading">
            <span>Informasi Resmi</span>
            <h2>Pengumuman</h2>
          </div>
          <Link className="button button-blue-outline" to="/pengumuman">Semua Pengumuman</Link>
        </div>
        <div className="announcement-grid">
          {announcements.map((item) => <AnnouncementCard item={item} key={item.slug} />)}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  useEffect(() => { document.title = 'Olimpiade SCE di USU Medan' }, [])

  return (
    <>
      <Hero />
      <PartnerNotes />
      <ActivitySection />
      <AnnouncementSection />
    </>
  )
}
