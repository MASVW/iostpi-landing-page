import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import AnnouncementDetailPage from './pages/AnnouncementDetailPage'
import AnnouncementListPage from './pages/AnnouncementListPage'
import ContentPage from './pages/ContentPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

function LegacyPageRedirect() {
  const { search } = useLocation()
  const slug = new URLSearchParams(search).get('slug')

  if (slug) return <Navigate to={`/page/${slug}`} replace />
  return <Navigate to="/tidak-ditemukan" replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="pengumuman" element={<AnnouncementListPage />} />
        <Route path="pengumuman/:slug" element={<AnnouncementDetailPage />} />
        <Route path="page/pengumuman" element={<Navigate to="/pengumuman" replace />} />
        <Route path="page/:slug" element={<ContentPage />} />
        <Route path="page.php" element={<LegacyPageRedirect />} />
        <Route path="sce" element={<Navigate to="/" replace />} />
        <Route path="sce/page.php" element={<LegacyPageRedirect />} />
        <Route path="tidak-ditemukan" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
