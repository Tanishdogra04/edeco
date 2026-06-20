import courses from './courses.json';

// Mock Data Generator for all courses
export const getMockCourseData = (id) => {
  const lowerId = id?.toLowerCase() || '';

  if (lowerId.includes('mba') || lowerId.includes('business') || lowerId.includes('bba')) return courses.mba;
  if (lowerId.includes('medical') || lowerId.includes('mbbs')) return courses.mbbs;
  if (lowerId.includes('law') || lowerId.includes('llb')) return courses.llb;

  return courses.btech; // Default to B.Tech
};
