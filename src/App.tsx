import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AboutAssembleePage from './pages/about/AssembleePage';
import AboutFrankPage from './pages/about/FrankPage';
import AboutBranhamPage from './pages/about/BranhamPage';
import AudioSermonsPage from './pages/sermons/AudioSermonsPage';
import VideoSermonsPage from './pages/sermons/VideoSermonsPage';
import SermonViewPage from './pages/SermonViewPage';
import BooksPage from './pages/BooksPage';
import BookViewPage from './pages/BookViewPage';
import EventsPage from './pages/EventsPage';
import Contact from './pages/Contact';
import WebRadioPage from './pages/WebRadioPage';
import WebTVPage from './pages/WebTVPage';

// Admin pages
import AdminDashboard from './pages/admin/DashboardPage';
import AdminSermons from './pages/admin/SermonsPage';
import AdminBooks from './pages/admin/BooksPage';
import AdminTags from './pages/admin/TagsPage';
import AdminEvents from './pages/admin/EventsPage';
import AdminAbout from './pages/admin/AboutPage';
import AdminStreams from './pages/admin/StreamsPage';
import AdminNewsletter from './pages/admin/NewsletterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Main site routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about/assemblee" element={<AboutAssembleePage />} />
          <Route path="about/frank" element={<AboutFrankPage />} />
          <Route path="about/branham" element={<AboutBranhamPage />} />
          <Route path="sermons/audio" element={<AudioSermonsPage />} />
          <Route path="sermons/video" element={<VideoSermonsPage />} />
          <Route path="sermons/:id" element={<SermonViewPage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="books/:id" element={<BookViewPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="webradio" element={<WebRadioPage />} />
          <Route path="webtv" element={<WebTVPage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="sermons" element={<AdminSermons />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="tags" element={<AdminTags />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="streams" element={<AdminStreams />} />
          <Route path="newsletter" element={<AdminNewsletter />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;