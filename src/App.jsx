import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import AnnouncementDetailPage from './pages/AnnouncementDetailPage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import ContentPage from './pages/ContentPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

function LegacyPageRedirect({ type }) {
  const { search } = useLocation()
  const slug = new URLSearchParams(search).get('slug')

  if (type === 'page' && slug) return <Navigate to={`/page/${slug}`} replace />
  if (type === 'detail' && slug) return <Navigate to={`/pengumuman/${slug}`} replace />
  if (type === 'list') return <Navigate to="/pengumuman" replace />
  return <Navigate to="/tidak-ditemukan" replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="page/:slug" element={<ContentPage />} />
        <Route path="pengumuman" element={<AnnouncementsPage />} />
        <Route path="pengumuman/:slug" element={<AnnouncementDetailPage />} />
        <Route path="page.php" element={<LegacyPageRedirect type="page" />} />
        <Route path="pengumuman.php" element={<LegacyPageRedirect type="list" />} />
        <Route path="detail-pengumuman.php" element={<LegacyPageRedirect type="detail" />} />
        <Route path="pios" element={<Navigate to="/" replace />} />
        <Route path="pios/page.php" element={<LegacyPageRedirect type="page" />} />
        <Route path="pios/pengumuman.php" element={<LegacyPageRedirect type="list" />} />
        <Route path="pios/detail-pengumuman.php" element={<LegacyPageRedirect type="detail" />} />
        <Route path="tidak-ditemukan" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
