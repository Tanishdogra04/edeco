import exams from './exams.json';

export const EXAMS_DATA = exams.EXAMS_DATA;

export const getMockExamData = (id) => {
  const details = exams.examDetails;

  return details[id] || {
    ...details['cat'],
    id: id,
    name: id.toUpperCase() + " 2026",
    logo: id.substring(0, 2).toUpperCase(),
    fullTitle: id.toUpperCase() + " Admission Test",
  };
};
