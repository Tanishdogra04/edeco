import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CityDetail from './pages/CityDetail';
import CollegeDetail from './pages/CollegeDetail';
import StreamDetail from './pages/StreamDetail';
import CourseDetail from './pages/CourseDetail';
import NewsDetail from './pages/NewsDetail';
import ExamDetail from './pages/ExamDetail';
import Login from './pages/Login';
import Contact from './pages/Contact';
import PremiumServices from './pages/PremiumServices';
import Resources from './pages/Resources';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities/:cityId" element={<CityDetail />} />
        <Route path="/colleges/:collegeId" element={<CollegeDetail />} />
        <Route path="/stream/:streamId" element={<StreamDetail />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/news/:newsId" element={<NewsDetail />} />
        <Route path="/exam/:examId" element={<ExamDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/premium" element={<PremiumServices />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}
