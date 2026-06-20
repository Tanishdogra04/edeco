import collegesJson from './colleges.json';

// Mock Data Generator for a single college
export const getMockCollegeData = (id) => {
  let location = 'Pune, Maharashtra';
  let formattedName = 'College of Engineering, Pune';
  let shortName = 'COEP';
  let established = '1854';
  let coverImage = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80';

  if (id) {
    const lowerId = id.toLowerCase();
    if (lowerId.includes('bangalore') || lowerId.includes('bengaluru') || lowerId === 'nlsiu') location = 'Bangalore, Karnataka';
    else if (lowerId.includes('mumbai') || lowerId === 'iitb') location = 'Mumbai, Maharashtra';
    else if (lowerId.includes('delhi') || lowerId === 'aiims') location = 'New Delhi, Delhi';
    else if (lowerId.includes('hyderabad')) location = 'Hyderabad, Telangana';
    else if (lowerId.includes('chennai')) location = 'Chennai, Tamil Nadu';
    else if (lowerId === 'iima') location = 'Ahmedabad, Gujarat';
    else if (lowerId === 'bits') location = 'Pilani, Rajasthan';
    else if (lowerId.includes('pune') || lowerId === 'siu') location = 'Pune, Maharashtra';

    formattedName = id.split('-').map(w => w.toUpperCase() === 'IIT' || w.toUpperCase() === 'IIM' || w.toUpperCase() === 'NIT' ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    shortName = id.split('-')[0].toUpperCase();
    established = (1940 + (id.length % 50)).toString();
  }

  let dynamicCourses = [
    { name: 'B.Tech Computer Science', fees: '₹1,25,000 / yr', duration: '4 Years', eligibility: '10+2 with 75% + JEE Main' },
    { name: 'B.Tech Mechanical', fees: '₹1,15,000 / yr', duration: '4 Years', eligibility: '10+2 with 75% + State CET' },
    { name: 'MBA Finance', fees: '₹2,50,000 / yr', duration: '2 Years', eligibility: 'Graduation + CAT/MAT' },
    { name: 'M.Tech Data Science', fees: '₹1,80,000 / yr', duration: '2 Years', eligibility: 'B.Tech + GATE' }
  ];
  let dynamicAbout = `Established in ${established}, ${formattedName} is a premier institute that has consistently ranked among the top colleges in its domain. With a rich legacy, the institute offers a unique blend of traditional values and modern education. The campus spans across 36 acres in the heart of the city, providing a vibrant and conducive environment for holistic learning.`;
  
  if (id) {
    const lowerId = id.toLowerCase();
    if (lowerId.includes('nlsiu') || lowerId.includes('nlu') || lowerId.includes('nalsar') || lowerId.includes('law')) {
      dynamicCourses = [
        { name: 'BA LL.B (Hons)', fees: '₹3,00,000 / yr', duration: '5 Years', eligibility: '10+2 with 45% + CLAT' },
        { name: 'BBA LL.B', fees: '₹2,80,000 / yr', duration: '5 Years', eligibility: '10+2 with 45% + CLAT' },
        { name: 'LL.M Corporate Law', fees: '₹1,50,000 / yr', duration: '1 Year', eligibility: 'LL.B + CLAT PG' }
      ];
      dynamicAbout = `${formattedName} is a premier National Law University dedicated to the study of law and justice. It is renowned for its rigorous academic curriculum, moot court competitions, and distinguished alumni serving in the highest courts and top corporate law firms.`;
      coverImage = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=80';
    } else if (lowerId.includes('nid') || lowerId.includes('nift') || lowerId.includes('idc') || lowerId.includes('design')) {
      dynamicCourses = [
        { name: 'B.Des Industrial Design', fees: '₹3,50,000 / yr', duration: '4 Years', eligibility: '10+2 + NID DAT/NIFT' },
        { name: 'B.Des Fashion Design', fees: '₹3,20,000 / yr', duration: '4 Years', eligibility: '10+2 + NIFT Exam' },
        { name: 'M.Des UI/UX', fees: '₹4,00,000 / yr', duration: '2 Years', eligibility: 'B.Des/B.Arch + CEED' }
      ];
      dynamicAbout = `${formattedName} is an apex institute for design education, research, and training. It fosters creative thinking and innovation, producing world-class designers who shape the future of visual and industrial design.`;
      coverImage = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1920&q=80';
    } else if (lowerId.includes('iim') || lowerId.includes('mba') || lowerId.includes('business')) {
      dynamicCourses = [
        { name: 'PGPM (MBA)', fees: '₹25,00,000 / total', duration: '2 Years', eligibility: 'Graduation + CAT 99%ile' },
        { name: 'Executive MBA', fees: '₹30,00,000 / total', duration: '1 Year', eligibility: 'Graduation + 5 Yrs Exp + GMAT' },
        { name: 'Ph.D in Management', fees: '₹1,00,000 / yr', duration: '4 Years', eligibility: 'Masters Degree + CAT/GMAT' }
      ];
      dynamicAbout = `${formattedName} is recognized globally for its excellence in management education and research. It is known for producing world-class business leaders, entrepreneurs, and thinkers.`;
      coverImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80';
    } else if (lowerId.includes('aiims') || lowerId.includes('cmc') || lowerId.includes('afmc') || lowerId.includes('medical')) {
      dynamicCourses = [
        { name: 'MBBS', fees: '₹1,50,000 / yr', duration: '5.5 Years', eligibility: '10+2 PCB + NEET UG' },
        { name: 'BDS', fees: '₹1,00,000 / yr', duration: '5 Years', eligibility: '10+2 PCB + NEET UG' },
        { name: 'MD General Medicine', fees: '₹2,00,000 / yr', duration: '3 Years', eligibility: 'MBBS + NEET PG' }
      ];
      dynamicAbout = `${formattedName} is an institution of national importance providing cutting-edge medical education and healthcare. With a massive multi-specialty hospital on campus, it offers unparalleled clinical exposure to its students.`;
      coverImage = 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1920&q=80';
    }
  }
  const images = (id && (id.toLowerCase().includes('aiims') || id.toLowerCase().includes('medical')))
    ? ["/images/medical.png", "/images/medical_college_new.jpg"]
    : [coverImage];

  return {
    id: id || 'coep-pune',
    name: formattedName,
    shortName: shortName,
    location: location,
    established: established,
    ownership: 'Public/Government',
    approvals: ['AICTE', 'UGC', 'NBA', 'NAAC A+'],
    logo: `https://ui-avatars.com/api/?name=${shortName}&background=0f172a&color=f97316&size=200`,
    coverImage: coverImage,
    images: images,
    stats: {
      avgFees: '₹1.5 Lakhs/yr',
      placementRate: '98%',
      avgPackage: '₹16.5 LPA',
      highestPackage: '₹84.0 LPA',
      facultyRating: '4.8/5',
      infrastructure: '4.9/5',
      recruiters: '350+'
    },
    about: dynamicAbout,
    whyChoose: [
      { title: 'Academic Excellence', desc: 'Rigorous curriculum updated with industry trends and global standards.' },
      { title: 'Top-tier Placements', desc: '100% placement assistance with FAANG and Big 4 companies visiting annually.' },
      { title: 'World-Class Faculty', desc: 'Learn from professors holding PhDs from top global institutions.' },
      { title: 'Global Exposure', desc: 'Student exchange programs with over 50+ international partner universities.' },
      { title: 'State-of-the-art Campus', desc: 'Fully Wi-Fi enabled campus with digital libraries and smart classrooms.' }
    ],
    courses: dynamicCourses,
    recruiters: [
      { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
      { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
      { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
      { name: 'TCS', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' },
      { name: 'Infosys', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' }
    ],
    facilities: [
      { name: 'Smart Classrooms', iconName: 'Building2' },
      { name: 'Digital Library', iconName: 'FileText' },
      { name: 'High-Tech Labs', iconName: 'CheckCircle' },
      { name: 'Sports Complex', iconName: 'Award' },
      { name: 'Campus Wi-Fi', iconName: 'Globe' },
      { name: 'AC Hostels', iconName: 'Users' }
    ],
    reviews: [
      { name: 'Aarav Sharma', course: 'B.Tech CSE, 2023', rating: 5, text: 'Absolutely brilliant faculty and the coding culture is phenomenal. Secured a placement at Google on Day 1!' },
      { name: 'Priya Patel', course: 'MBA Finance, 2022', rating: 4, text: 'The campus infrastructure is top-notch. The alumni network really helps during summer internships.' },
      { name: 'Rohan Gupta', course: 'B.Tech Mechanical, 2024', rating: 5, text: 'State of the art labs and great support for entrepreneurship. Highly recommend for practical learners.' },
      { name: 'Neha Singh', course: 'BA LLB, 2023', rating: 4, text: 'Rigorous academics but very rewarding. Moot court competitions are taken very seriously here.' }
    ],
    faqs: [
      { q: `Is ${formattedName} good for placements?`, a: 'Yes, it has consistently achieved over 95% placements with top MNCs visiting the campus every year.' },
      { q: 'What is the admission process?', a: 'Admissions are strictly based on national level entrance exams followed by rigorous counseling sessions and interviews.' },
      { q: 'Are there any scholarships available?', a: 'Yes, government scholarships and merit-based institutional scholarships up to 100% tuition waiver are available for deserving students.' },
      { q: 'Is hostel facility available?', a: 'Yes, separate fully-furnished AC and Non-AC hostels for boys and girls are available with Wi-Fi connectivity.' }
    ]
  };
};

// Mock Data for CityDetail lists
export const getMockColleges = (city, category) => [
  {
    id: `iit-${city.toLowerCase()}`,
    name: `Indian Institute of Technology (IIT) ${city}`,
    location: `${city}, India`,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=IIT+${city}&background=1e293b&color=fff`,
    description: `Premier ${category.toLowerCase()} institute in ${city} with global recognition and top-tier placement records.`,
    nirf: 1,
    avgPackage: "₹25.5 LPA",
    placement: "100%",
    fees: "₹2.5 L/yr",
    badges: ["Government", "Autonomous", "Approved"],
    type: "Public"
  },
  {
    id: `${city.toLowerCase()}-college-of-${category.toLowerCase()}`,
    name: `${city} College of ${category}`,
    location: `Central District, ${city}`,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=C${category.charAt(0)}&background=334155&color=fff`,
    description: `Top private ${category.toLowerCase()} college in ${city} known for excellence in education.`,
    nirf: 89,
    avgPackage: "₹12.4 LPA",
    placement: "95%",
    fees: "₹4.5 L/yr",
    badges: ["Private", "NAAC A+", "University"],
    type: "Private"
  },
  {
    id: `${city.toLowerCase()}-${category.toLowerCase()}-university`,
    name: `${city} ${category} University`,
    location: `University Road, ${city}`,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=U&background=475569&color=fff`,
    description: `Leading private university offering multi-disciplinary programs with industry tie-ups in ${city}.`,
    nirf: 100,
    avgPackage: "₹10.8 LPA",
    placement: "92%",
    fees: "₹3.8 L/yr",
    badges: ["Private", "UGC Approved", "Autonomous"],
    type: "Private"
  },
  {
    id: `nit-${city.toLowerCase()}`,
    name: `National Institute of ${category} (NIT) ${city}`,
    location: `Campus Road, ${city}`,
    image: "https://images.unsplash.com/photo-1592289658098-b80c102b5e28?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=NIT&background=1f2937&color=fff`,
    description: `Renowned multi-disciplinary government university famous for its ${category.toLowerCase()} programs.`,
    nirf: 60,
    avgPackage: "₹15.5 LPA",
    placement: "96%",
    fees: "₹2.2 L/yr",
    badges: ["Government", "Deemed", "AICTE"],
    type: "Public"
  },
  {
    id: `${city.toLowerCase()}-institute-of-${category.toLowerCase()}`,
    name: `${city} Institute of ${category}`,
    location: `Tech Park, ${city}`,
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=IT&background=374151&color=fff`,
    description: `One of the oldest and most respected ${category.toLowerCase()} colleges in ${city}.`,
    nirf: 73,
    avgPackage: "₹9.2 LPA",
    placement: "94%",
    fees: "₹3.5 L/yr",
    badges: ["Private", "Autonomous", "NBA Accredited"],
    type: "Private"
  },
  {
    id: `symbiosis-${city.toLowerCase()}`,
    name: `Symbiosis Institute of ${category === 'MBA' ? 'Business Management' : category} ${city}`,
    location: `Electronic City, ${city}`,
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
    logo: `https://ui-avatars.com/api/?name=SI&background=4b5563&color=fff`,
    description: `Premier institute offering world-class ${category.toLowerCase()} education and corporate exposure in ${city}.`,
    nirf: 35,
    avgPackage: "₹18.5 LPA",
    placement: "98%",
    fees: "₹9.5 L/yr",
    badges: ["Private", "AACSB", "AIU"],
    type: "Private"
  }
];

export const categories = collegesJson.categories;
export const cityStats = collegesJson.cityStats;
export const recruiters = collegesJson.recruiters;
export const cityFaqs = collegesJson.cityFaqs;
export const relatedCities = collegesJson.relatedCities;
export const cityHeroImages = collegesJson.cityHeroImages;
