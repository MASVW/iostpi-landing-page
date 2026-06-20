import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  Facebook,
  Instagram,
  Menu,
  X,
  Youtube,
} from 'lucide-react'
import { ASSET_ROOT, studentRelated, sambutanRelated, teacherRelated } from '../data/siteData'

const navigation = [
  { label: 'Beranda', path: '/' },
  {
    label: 'Sambutan', path: '/page/sambutan',
    children: [
      { label: 'Sambutan', path: '/page/sambutan' },
      ...sambutanRelated,
    ],
  },
  {
    label: 'Kompetisi Guru',
    path: '/page/kompetisi-guru',
    children: [
      { label: 'Kompetisi Guru', path: '/page/kompetisi-guru' },
      ...teacherRelated,
    ],
  },
  {
    label: 'Olimpiade Siswa',
    path: '/page/olimpiade-siswa',
    children: [
      { label: 'Olimpiade Siswa', path: '/page/olimpiade-siswa' },
      ...studentRelated,
    ],
  },
  { label: 'Prosedur Pendaftaran', path: '/page/prosedur-pendaftaran' },
  { label: 'Kumpulan Soal SCE', path: '/page/kumpulan-soal' },
  { label: 'Lokasi Ujian & Rundown Acara', path: '/page/lokasi-ujian' },
]

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Media sosial">
      <a href="#facebook" aria-label="Facebook"><Facebook size={15} /></a>
      <a href="#instagram" aria-label="Instagram"><Instagram size={15} /></a>
      <a href="#youtube" aria-label="YouTube"><Youtube size={15} /></a>
    </div>
  )
}

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="contact-links">
        </div>
        <SocialLinks />
      </div>
    </div>
  )
}

function Navigation() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState('')

  useEffect(() => {
    setOpen(false)
    setExpanded('')
  }, [location.pathname])

  const toggleDropdown = (label) => {
    setExpanded((current) => current === label ? '' : label)
  }

  return (
    <nav className="main-nav" aria-label="Navigasi utama">
      <div className="container nav-inner">
        <NavLink className="mobile-brand" to="/">PIOS</NavLink>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Buka menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {navigation.map((item) => (
            <div className={`nav-item ${expanded === item.label ? 'is-expanded' : ''}`} key={item.label}>
              {item.children ? (
                <button
                  className={location.pathname.startsWith(item.path) || item.children.some((child) => child.path === location.pathname) ? 'active' : ''}
                  onClick={() => toggleDropdown(item.label)}
                  aria-expanded={expanded === item.label}
                >
                  {item.label}<ChevronDown size={15} />
                </button>
              ) : (
                <NavLink to={item.path}>{item.label}</NavLink>
              )}
              {item.children && (
                <div className="dropdown">
                  {item.children.map((child) => (
                    <NavLink to={child.path} key={child.path}>{child.label}</NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}

function Header() {
  return (
    <header className="site-header">
      <TopBar />
      <div className="brand-header container">
        <NavLink to="/" aria-label="Kembali ke beranda">
          <img className="uhn-logo" src={`${ASSET_ROOT}/iostpi-logo.png`} alt="Logo PIOS" />
        </NavLink>
        <div className="brand-copy">
          <h1>SCIENCE COMPETITION EXPO</h1>
          <p className="tagline">SCE - 2026</p>
        </div>
        <NavLink to="/" aria-label="Kembali ke beranda">
          <img className="dikti-logo" src={`${ASSET_ROOT}/sumut-logo.png`} alt="Logo Dikti Saintek" />
        </NavLink>
      </div>
      <Navigation />
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="left-footer">
          <div className='left-logo'>
            <img src={`${ASSET_ROOT}/ika-fmipa.png`} alt="Universitas Sumatera Utara" />
            <img src={`${ASSET_ROOT}/iostpi.jpg`} alt="Universitas Sumatera Utara" />
          </div>
          <div className="footer-contact">
            <div className="footer-title">
              <strong>Science Competition Expo</strong>
            </div>
            <dl>
              <div>
                <dt>CP Panitia</dt>
                <dd>0813 6021 1850 (Tingkat SMA)</dd>
                <dt></dt>
                <dd>0813 6021 1845 (Tingkat SMP)</dd>
                <dt></dt>
                <dd>0853 8124 7216 (Tingkat SD)</dd>
              </div>


              <div>
                <dt>Sekretariat Pendaftaran:</dt>
                <dd>The Prime Residence Blok A No. 22-23 Jln. Setia Budi Ujung Simpang Selayang, Medan.
                  (Dekat SPBU & Pos Polisi Simpang Selayang)
                </dd>
              </div>
            </dl>
          </div>

        </div>
        <div className="footer-partners">
          <div>
            <h3>Bekerjasama Dengan, dan didukung oleh:</h3>
            <div className="partner-logos">
              <img src={`${ASSET_ROOT}/usu.png`} alt="Universitas Sumatera Utara" />
              <img src={`${ASSET_ROOT}/unimed.png`} alt="Universitas Negeri Medan" />
              <img src={`${ASSET_ROOT}/pemprovsu-logo.png`} alt="Pemerintah Provinsi Sumatera Utara" />
              <img src={`${ASSET_ROOT}/pemko-medan-logo.png`} alt="Pemko Medan" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>© SCE. Semua hak cipta dilindungi.</span>
        </div>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export function PageHero({ title }) {
  return (
    <section className="page-hero">
      <div className="container"><h2>{title}</h2></div>
    </section>
  )
}

export function RelatedMenu({ links }) {
  return (
    <aside className="page-related-menu">
      <h3>Menu Terkait</h3>
      <div className="related-links">
        {links.map((link) => <NavLink to={link.path} key={link.path}>{link.label}</NavLink>)}
      </div>
    </aside>
  )
}

export default function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main><Outlet /></main>
      <Footer />
    </>
  )
}
