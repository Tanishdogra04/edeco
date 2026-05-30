import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import TopCities from '../components/TopCities';
import ExploreFuture from '../components/ExploreFuture';
import FeaturedColleges, { collegesData } from '../components/FeaturedColleges';
import CompareDrawer from '../components/CompareDrawer';
import TopExams from '../components/TopExams';
import TrendingCourses from '../components/TrendingCourses';
import LatestNews from '../components/LatestNews';
import CounsellingCTA from '../components/CounsellingCTA';
import CounsellingModal from '../components/CounsellingModal';
import DetailModal from '../components/DetailModal';
import Footer from '../components/Footer';

export default function Home() {
  const [comparedColleges, setComparedColleges] = useState([]);
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [selectedDetailCollege, setSelectedDetailCollege] = useState(null);
  const [activeColleges, setActiveColleges] = useState(collegesData);

  useEffect(() => {
    if (localStorage.getItem('scrollToColleges') === 'true') {
      localStorage.removeItem('scrollToColleges');
      const el = document.getElementById('colleges');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  const handleToggleCompare = (college) => {
    setComparedColleges((prev) => {
      const exists = prev.some((c) => c.id === college.id);
      if (exists) {
        return prev.filter((c) => c.id !== college.id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 colleges at a time.");
          return prev;
        }
        return [...prev, college];
      }
    });
  };

  const handleRemoveCompare = (college) => {
    setComparedColleges((prev) => prev.filter((c) => c.id !== college.id));
  };

  const handleClearAllCompare = () => {
    setComparedColleges([]);
  };

  const handleSearchSubmit = (term) => {
    if (!term) {
      setActiveColleges(collegesData);
      return;
    }

    const filtered = collegesData.filter((c) => 
      c.name.toLowerCase().includes(term.toLowerCase()) ||
      c.stream.toLowerCase().includes(term.toLowerCase()) ||
      c.location.toLowerCase().includes(term.toLowerCase())
    );

    setActiveColleges(filtered);

    // Smooth scroll down to colleges section
    const collegeSec = document.getElementById('colleges');
    if (collegeSec) {
      collegeSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-brand-100 selection:text-brand-700">
      
      {/* Sticky Top Navigation */}
      <Navbar 
        onCounsellingClick={() => setIsCounsellingOpen(true)}
        onCompareClick={() => handleScrollToSection('colleges')}
        compareCount={comparedColleges.length}
      />

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <div id="hero">
          <Hero 
            onSearchSubmit={handleSearchSubmit} 
            onCounsellingClick={() => setIsCounsellingOpen(true)} 
          />
        </div>

        {/* Stats Section */}
        <Stats />

        {/* Top Cities */}
        <TopCities />

        {/* Explore Future */}
        <ExploreFuture onCompareClick={() => handleScrollToSection('colleges')} />

        {/* Featured Colleges */}
        <FeaturedColleges 
          onToggleCompare={handleToggleCompare}
          comparedColleges={comparedColleges}
          onViewDetails={(college) => setSelectedDetailCollege(college)}
          onCounsellingClick={() => setIsCounsellingOpen(true)}
        />

        {/* Top Exams */}
        <TopExams onCounsellingClick={() => setIsCounsellingOpen(true)} />

        {/* Trending Courses */}
        <div id="courses">
          <TrendingCourses onExploreColleges={() => handleScrollToSection('colleges')} />
        </div>

        {/* Latest News & Updates */}
        <LatestNews />

        {/* Counselling CTA Banner */}
        <CounsellingCTA onCounsellingClick={() => setIsCounsellingOpen(true)} />

      </main>

      {/* Footer Directory */}
      <Footer />

      {/* Floating Bottom Comparison Drawer Widget */}
      <CompareDrawer 
        comparedColleges={comparedColleges}
        onRemove={handleRemoveCompare}
        onClearAll={handleClearAllCompare}
      />

      {/* Reusable Counselling Form Popup Modal */}
      <CounsellingModal 
        isOpen={isCounsellingOpen}
        onClose={() => setIsCounsellingOpen(false)}
      />

      {/* College Profile Detail Modal */}
      <DetailModal 
        college={selectedDetailCollege}
        isOpen={!!selectedDetailCollege}
        onClose={() => setSelectedDetailCollege(null)}
        onCounsellingClick={() => setIsCounsellingOpen(true)}
      />

    </div>
  );
}
