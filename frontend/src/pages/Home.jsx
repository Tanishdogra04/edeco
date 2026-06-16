import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero2 from '../components/Hero2';
import Stats from '../components/Stats';
import TopCities from '../components/TopCities';
import ExploreFuture from '../components/ExploreFuture';
import FeaturedColleges from '../components/FeaturedColleges';
import { api } from '../utils/api';
import CompareDrawer from '../components/CompareDrawer';
import TopExams from '../components/TopExams';
import TrendingCourses from '../components/TrendingCourses';
import LatestNews from '../components/LatestNews';

import CounsellingModal from '../components/CounsellingModal';
import DetailModal from '../components/DetailModal';
import Footer from '../components/Footer';

import { useToast } from '../context/ToastContext';

export default function Home() {
  const toast = useToast();
  const [comparedColleges, setComparedColleges] = useState([]);
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [selectedDetailCollege, setSelectedDetailCollege] = useState(null);
  const [activeColleges, setActiveColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setIsLoading(true);
        const data = await api.colleges.getAll();
        if (data.success) {
          setActiveColleges(data.colleges);
        }
      } catch (err) {
        console.error('Error fetching colleges:', err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchColleges();
  }, []);

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
          toast.warning("You can compare up to 3 colleges at a time.");
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

  const handleSearchSubmit = async (term) => {
    try {
      setIsLoading(true);
      const data = await api.colleges.getAll({ search: term });
      if (data.success) {
        setActiveColleges(data.colleges);
      }
    } catch (err) {
      console.error('Search failed:', err.message);
    } finally {
      setIsLoading(false);
    }

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
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-brand-200 selection:text-brand-800">
      
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
          <Hero2 
            onSearchSubmit={handleSearchSubmit} 
            onCounsellingClick={() => setIsCounsellingOpen(true)} 
          />
        </div>

        {/* Stats Section */}
        <Stats />

        {/* Top Cities */}
        <TopCities />

        {/* Explore Future */}
        <ExploreFuture />

        {/* Featured Colleges */}
        <FeaturedColleges 
          colleges={activeColleges}
          isLoading={isLoading}
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
