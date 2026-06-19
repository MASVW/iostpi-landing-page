import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/SiteLayout'

export default function NotFoundPage() {
  useEffect(() => { document.title = 'Halaman Tidak Ditemukan - PIOS' }, [])

  return (
    <>
      <PageHero title="Halaman Tidak Ditemukan" />
      <section className="not-found section-pad">
        <div className="container">
          <p>Halaman yang Anda cari tidak tersedia.</p>
          <Link className="button button-primary" to="/">Kembali ke Beranda</Link>
        </div>
      </section>
    </>
  )
}
