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
import { SiteContentProvider, useSiteContent } from '../content/SiteContentProvider'

export const containerClass = 'mx-auto w-[calc(100%_-_40px)] max-w-[1116px] max-[720px]:w-[calc(100%_-_24px)] max-[720px]:max-w-[560px]'
export const sectionPadClass = 'py-16 max-[720px]:py-[49px]'
export const primaryButtonClass = 'inline-flex min-h-12 items-center justify-center rounded-lg bg-[#ffc845] px-[17px] font-bold text-[#12202a] shadow-[0_6px_18px_rgba(255,200,69,0.2)] transition hover:-translate-y-0.5'

const ASSET_ROOT = '/assets'

const navButtonClass = (active = false) => [
  'flex min-h-[45px] w-full cursor-pointer items-center justify-center gap-1 rounded-[9px] border border-white/25 px-2.5 text-center text-[15px] font-extrabold leading-[1.08] text-white [text-shadow:0_1px_rgba(0,0,0,0.25)] transition hover:bg-white/[0.18]',
  'max-[900px]:text-[13px]',
  'max-[720px]:justify-between max-[720px]:border-white/[0.13]',
  active ? 'bg-white/[0.18]' : 'bg-white/[0.07]',
].join(' ')

function ApiGate({ children }) {
  const { error, isReady, loading, navigation, pages, reload } = useSiteContent()
  const hasFrontendData = navigation.length > 0 && Object.keys(pages).length > 0

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f5fbff] px-5 text-center text-[#173e5d]">
        <div className="flex max-w-md flex-col items-center rounded-2xl border border-[#ccecff] bg-white p-8 shadow-[0_18px_45px_rgba(25,93,139,0.12)]">
          <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-[#e8f7ff]">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#ccecff] border-t-[#3d9dce]" />
          </div>
          <p className="mb-2 text-sm font-black uppercase tracking-[0.12em] text-[#3d9dce]">Memuat Website</p>
          <h1 className="m-0 text-2xl font-black">Mohon tunggu sebentar...</h1>
        </div>
      </div>
    )
  }

  if (error || !isReady || !hasFrontendData) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f5fbff] px-5 text-[#173e5d]">
        <div className="max-w-2xl rounded-2xl border border-[#ccecff] bg-white p-8 shadow-[0_18px_45px_rgba(25,93,139,0.12)]">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.12em] text-[#3d9dce]">Konten Belum Tersedia</p>
          <h1 className="m-0 text-3xl font-black leading-tight">Website belum dapat memuat konten.</h1>
          <p className="mb-0 mt-4 leading-7 text-[#5e7383]">
            Silakan coba muat ulang halaman. Jika masalah masih terjadi, hubungi administrator website.
          </p>
          {(error || !hasFrontendData) && (
            <p className="mb-0 mt-4 rounded-lg bg-[#fff4e1] p-4 text-sm font-bold text-[#8a5a00]">
              Konten sedang tidak dapat ditampilkan saat ini.
            </p>
          )}
          <button
            className="mt-6 rounded-lg bg-[#3d9dce] px-5 py-3 font-extrabold text-white shadow-[0_8px_18px_rgba(61,157,206,0.22)] transition hover:-translate-y-0.5"
            onClick={reload}
            type="button"
          >
            Coba Muat Ulang
          </button>
        </div>
      </div>
    )
  }

  return children
}

function SocialLinks() {
  const socialClass = 'flex h-[33px] w-[33px] items-center justify-center rounded-lg border border-white/20 bg-white/[0.08] transition hover:bg-white/20'

  return (
    <div className="flex items-center gap-3.5 max-[720px]:gap-3" aria-label="Media sosial">
      <a className={socialClass} href="https://www.facebook.com/OlimpiadeUSU" aria-label="Facebook"><Facebook size={15} /></a>
      <a className={socialClass} href="#instagram" aria-label="Instagram"><Instagram size={15} /></a>
      <a className={socialClass} href="#youtube" aria-label="YouTube"><Youtube size={15} /></a>
    </div>
  )
}

function TopBar() {
  return (
    <div className="bg-gradient-to-r from-[#2f6794] to-[#42a0d3] text-white">
      <div className={`${containerClass} flex min-h-12 items-center justify-between gap-5 max-[720px]:min-h-[77px] max-[720px]:flex-col max-[720px]:items-start max-[720px]:justify-center max-[720px]:gap-2`}>
        <div className="flex items-center gap-5 text-sm font-bold" />
        <SocialLinks />
      </div>
    </div>
  )
}

function Navigation() {
  const location = useLocation()
  const { navigation } = useSiteContent()
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
    <nav className="relative z-30 bg-gradient-to-r from-[#2d6798] to-[#59b1dd] text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.45)]" aria-label="Navigasi utama">
      <div className={`${containerClass} flex min-h-[61px] items-center justify-center max-[720px]:min-h-[57px] max-[720px]:justify-between`}>
        <NavLink className="hidden text-[19px] font-extrabold max-[720px]:block" to="/">SCE</NavLink>
        <button className="hidden h-[42px] w-11 place-items-center rounded-[7px] border border-white/15 bg-white/[0.04] text-white max-[720px]:grid" onClick={() => setOpen(!open)} aria-label="Buka menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
        <div className={[
          'flex w-full items-center gap-[7px]',
          'max-[720px]:absolute max-[720px]:left-0 max-[720px]:right-0 max-[720px]:top-full max-[720px]:flex-col max-[720px]:items-stretch max-[720px]:bg-[#286f9e] max-[720px]:px-3 max-[720px]:pb-4 max-[720px]:pt-2.5 max-[720px]:shadow-[0_16px_30px_rgba(7,50,81,0.25)]',
          open ? 'max-[720px]:flex' : 'max-[720px]:hidden',
        ].join(' ')}>
          {navigation.map((item) => {
            const active = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`) || item.children?.some((child) => child.path === location.pathname)

            return (
              <div
                className="relative -mb-1.5 min-w-0 flex-1 pb-1.5 max-[720px]:mb-0 max-[720px]:flex-none max-[720px]:pb-0"
                key={item.label}
                onMouseEnter={() => item.children && setExpanded(item.label)}
                onMouseLeave={() => item.children && setExpanded('')}
              >
                {item.children ? (
                  <button
                    className={navButtonClass(active)}
                    onClick={() => toggleDropdown(item.label)}
                    aria-expanded={expanded === item.label}
                  >
                    {item.label}<ChevronDown size={15} />
                  </button>
                ) : (
                  <NavLink end={item.path === '/'} className={({ isActive }) => navButtonClass(isActive)} to={item.path}>{item.label}</NavLink>
                )}
                {item.children && (
                  <div className={[
                    'absolute left-0 top-full z-40 w-[min(90vw,max(100%,320px))] rounded-[9px] bg-white p-[7px] text-[#173e5d] shadow-[0_16px_35px_rgba(8,47,79,0.2)]',
                    'max-[720px]:static max-[720px]:mt-[5px] max-[720px]:w-full max-[720px]:bg-[#073b67]/35 max-[720px]:text-white max-[720px]:shadow-none',
                    expanded === item.label ? 'block' : 'hidden',
                  ].join(' ')}>
                    {item.children.map((child) => (
                      <NavLink className="block rounded-[7px] px-3 py-2.5 text-sm font-bold hover:bg-[#edf8ff] hover:text-[#2f8fc4] max-[720px]:hover:bg-white/10 max-[720px]:hover:text-white" to={child.path} key={child.path}>{child.label}</NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

function Header() {
  return (
    <header>
      <TopBar />
      <div className={`${containerClass} grid min-h-[170px] grid-cols-[190px_1fr_170px] items-center gap-6 max-[900px]:min-h-[175px] max-[900px]:grid-cols-[155px_1fr_150px] max-[900px]:gap-3.5 max-[720px]:min-h-[185px] max-[720px]:grid-cols-[112px_1fr_90px] max-[720px]:gap-2 max-[420px]:min-h-[170px] max-[420px]:grid-cols-[86px_1fr_74px]`}>
        <NavLink to="/" aria-label="Kembali ke beranda">
          <div className="flex flex-row items-center justify-center gap-3 max-[720px]:gap-[5px]">
            <img className="h-[82px] w-[82px] object-contain max-[900px]:h-[68px] max-[900px]:w-[68px] max-[720px]:h-[52px] max-[720px]:w-[52px] max-[420px]:h-[39px] max-[420px]:w-[39px]" src={`${ASSET_ROOT}/iostpi-logo.png`} alt="Logo PIOS" />
            <img className="h-[88px] w-[88px] object-contain max-[900px]:h-[72px] max-[900px]:w-[72px] max-[720px]:h-14 max-[720px]:w-14 max-[420px]:h-[42px] max-[420px]:w-[42px]" src={`${ASSET_ROOT}/logo-fokal-usu.avif`} alt="Logo FOKAL USU" />
          </div>
        </NavLink>
        <div className="text-center">
          <h1 className="mb-1 text-[clamp(25px,3vw,37px)] font-black uppercase leading-[1.12] text-[#2b638f] max-[900px]:text-[27px] max-[720px]:mt-[7px] max-[720px]:mb-[3px] max-[720px]:text-[22px] max-[720px]:leading-[1.15] max-[420px]:text-lg">SCIENCE COMPETITION EXPO</h1>
          <p className="m-0 text-[clamp(25px,3vw,37px)] font-black uppercase leading-[1.12] tracking-[0.16em] text-[#2b638f] max-[900px]:text-[27px] max-[720px]:text-[22px] max-[720px]:leading-[1.15] max-[420px]:text-lg">SCE - 2026</p>
          <p className="mt-[13px] text-[clamp(15px,1.7vw,21px)] font-black uppercase leading-tight tracking-[0.08em] text-[#2b638f] max-[900px]:text-[17px] max-[720px]:mt-[9px] max-[720px]:text-[13px] max-[420px]:text-[11px]">SE SUMATERA BAGIAN UTARA</p>
          <p className="mt-1 text-[clamp(12px,1.25vw,15px)] font-bold leading-[1.35] text-[#31536b] max-[720px]:text-[11px] max-[420px]:text-[10px]">(Aceh, Sumatera Utara, Riau, Kepulauan Riau, dan Sumatera Barat)</p>
        </div>
        <NavLink to="/" aria-label="Kembali ke beranda">
          <div className="flex flex-row items-center justify-end gap-3 max-[720px]:gap-[5px]">
            <img className="h-[76px] w-[76px] object-contain max-[900px]:h-[66px] max-[900px]:w-[66px] max-[720px]:h-[42px] max-[720px]:w-[42px] max-[420px]:h-[35px] max-[420px]:w-[35px]" src={`${ASSET_ROOT}/pemprovsu-logo.png`} alt="Logo Pemerintah Provinsi Sumatera Utara" />
            <img className="h-[76px] w-[76px] object-contain max-[900px]:h-[66px] max-[900px]:w-[66px] max-[720px]:h-[42px] max-[720px]:w-[42px] max-[420px]:h-[35px] max-[420px]:w-[35px]" src={`${ASSET_ROOT}/pemko-medan-logo.png`} alt="Logo Pemerintah Kota Medan" />
          </div>
        </NavLink>
      </div>
      <Navigation />
    </header>
  )
}

function Footer() {
  const { footer } = useSiteContent()
  const contactData = footer?.contact?.data || {}
  const partnerData = footer?.partners?.data || {}
  const contactLogos = Array.isArray(contactData.logos) ? contactData.logos.filter((logo) => logo?.image_url) : []
  const contacts = Array.isArray(contactData.contacts) ? contactData.contacts.filter((contact) => contact?.phone) : []
  const secretariatTitle = contactData.secretariat_title || 'Sekretariat Pendaftaran'
  const secretariatAddress = contactData.secretariat_address || ''
  const partnerHeading = partnerData.heading || 'Dewan Juri LKTI & Seminar Guru Bekerjasama Dengan:'
  const partnerLogos = Array.isArray(partnerData.logos) ? partnerData.logos.filter((logo) => logo?.image_url) : []

  return (
    <footer className="bg-[#163f6c] pt-[62px] text-[#e6f7ff]">
      <div className={`${containerClass} grid grid-cols-2 gap-6 max-[900px]:grid-cols-1`}>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] max-[480px]:grid-cols-1 max-[480px]:gap-4">
          <div className="mx-2.5 flex max-w-20 flex-col max-[480px]:mx-0 max-[480px]:max-w-none max-[480px]:flex-row max-[480px]:flex-wrap max-[480px]:gap-3">
            {contactLogos.map((logo) => (
              <img
                className="my-[5px] h-[82px] w-[82px] rounded-[7px] bg-white px-[5px] py-[5px] object-contain max-[480px]:my-0"
                src={logo.image_url}
                alt={logo.name || 'Logo footer'}
                key={`${logo.name}-${logo.image_url}`}
              />
            ))}
          </div>
          <div className="overflow-hidden rounded-lg border border-white/20 bg-white/[0.03]">
            <div className="flex items-center gap-4 border-b border-white/15 px-4 py-3.5 text-xl">
              <strong>Science Competition Expo</strong>
            </div>
            <dl className="m-0 text-sm font-bold leading-normal">
              <div className="grid grid-cols-[42%_58%] border-b border-white/15 px-4 py-[13px] max-[720px]:grid-cols-1 max-[720px]:gap-[5px]">
                <dt className="font-extrabold">CP Panitia</dt>
                <dd className="m-0 font-bold leading-[1.5]">
                  {contacts.length > 0 ? contacts.map((contact) => (
                    <div key={`${contact.label}-${contact.phone}`}>
                      {contact.phone}{contact.label ? ` (${contact.label})` : ''}
                    </div>
                  )) : 'Kontak belum tersedia.'}
                </dd>
              </div>
              <div className="grid grid-cols-[42%_58%] border-b border-white/15 px-4 py-[13px] max-[720px]:grid-cols-1 max-[720px]:gap-[5px]">
                <dt className="font-extrabold">{secretariatTitle}</dt>
                <dd className="m-0 whitespace-pre-line font-bold leading-[1.5]">
                  {secretariatAddress || 'Sekretariat belum tersedia.'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="grid gap-[22px] overflow-hidden rounded-lg border border-white/20 bg-white/[0.03] p-[18px]">
          <div>
            <h3 className="mb-[11px] mt-0 text-[13px] font-bold uppercase">{partnerHeading}</h3>
            <div className="flex flex-wrap items-center gap-2.5">
              {partnerLogos.length > 0 ? partnerLogos.map((logo) => (
                <img
                  className="h-[62px] w-[62px] rounded-[7px] bg-white p-[5px] object-contain"
                  src={logo.image_url}
                  alt={logo.name || 'Logo partner'}
                  key={`${logo.name}-${logo.image_url}`}
                />
              )) : (
                <p className="m-0 text-sm font-bold leading-normal text-[#e6f7ff]">Logo partner belum tersedia.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[46px] bg-[#0b345c]">
        <div className={`${containerClass} flex min-h-[58px] items-center justify-between gap-5 text-[13px] max-[720px]:flex-col max-[720px]:items-start max-[720px]:justify-center max-[720px]:gap-[5px] max-[720px]:py-3`}>
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
    <section className="bg-gradient-to-br from-[#0d5d8c] to-[#57b3e0] py-12 text-white max-[720px]:py-[34px]">
      <div className={containerClass}><h2 className="m-0 text-[32px] font-extrabold leading-tight max-[720px]:text-[27px]">{title}</h2></div>
    </section>
  )
}

export function RelatedMenu({ links }) {
  return (
    <aside className="mt-5 rounded-lg border border-[#ccecff] bg-white p-5">
      <h3 className="mb-[13px] mt-0 text-lg font-bold text-[#0d5d8c]">Menu Terkait</h3>
      <div className="flex flex-wrap gap-[9px] max-[720px]:flex-col">
        {links.map((link) => (
          <NavLink
            className={({ isActive }) => [
              'rounded-md border border-[#c9e8f7] px-[13px] py-[9px] text-sm font-bold transition hover:bg-[#3d9dce] hover:text-white max-[720px]:w-full',
              isActive ? 'bg-[#3d9dce] text-white shadow-[0_8px_18px_rgba(61,157,206,0.22)]' : 'bg-[#effaff] text-[#276c94]',
            ].join(' ')}
            to={link.path}
            key={link.path}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

export default function SiteLayout() {
  return (
    <SiteContentProvider>
      <ApiGate>
        <div className="min-h-screen min-w-80 bg-[#f5fbff] font-sans text-[#132638] antialiased [font-synthesis:none] [text-rendering:optimizeLegibility]">
          <ScrollToTop />
          <Header />
          <main><Outlet /></main>
          <Footer />
        </div>
      </ApiGate>
    </SiteContentProvider>
  )
}
