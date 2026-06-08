import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cities from './pages/Cities';
import CityDetail from './pages/CityDetail';
import CollegeDetail from './pages/CollegeDetail';
import StreamDetail from './pages/StreamDetail';
import CourseDetail from './pages/CourseDetail';
import NewsDetail from './pages/NewsDetail';
import ExamDetail from './pages/ExamDetail';
import Login from './pages/Login';
import Contact from './pages/Contact';
import FindUs from './pages/FindUs';
import Events from './pages/Events';
import PremiumServices from './pages/PremiumServices';
import Resources from './pages/Resources';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/cities/:cityId" element={<CityDetail />} />
        <Route path="/colleges/:collegeId" element={<CollegeDetail />} />
        <Route path="/stream/:streamId" element={<StreamDetail />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/news/:newsId" element={<NewsDetail />} />
        <Route path="/exam/:examId" element={<ExamDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-us" element={<FindUs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/premium" element={<PremiumServices />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
