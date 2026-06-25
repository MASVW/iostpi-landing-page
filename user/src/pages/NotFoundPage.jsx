import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHero, containerClass, primaryButtonClass, sectionPadClass } from '../components/SiteLayout'

export default function NotFoundPage() {
  useEffect(() => { document.title = 'Halaman Tidak Ditemukan - PIOS' }, [])

  return (
    <>
      <PageHero title="Halaman Tidak Ditemukan" />
      <section className={`${sectionPadClass} text-center`}>
        <div className={containerClass}>
          <p className="mb-5 mt-0 text-lg">Halaman yang Anda cari tidak tersedia.</p>
          <Link className={primaryButtonClass} to="/">Kembali ke Beranda</Link>
        </div>
      </section>
    </>
  )
}
