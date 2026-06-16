const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

// Load models
const College = require('../models/College');
const City = require('../models/City');
const Exam = require('../models/Exam');
const Event = require('../models/Event');
const News = require('../models/News');
const User = require('../models/User');

// Helper to generate details for colleges based on getMockCollegeData in frontend
const getCollegeDetails = (id, base) => {
  let location = base.location;
  let established = '1948';
  let coverImage = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80';
  let dynamicAbout = '';
  let dynamicCourses = [];

  const lowerId = id.toLowerCase();

  if (lowerId.includes('nlsiu') || lowerId.includes('law')) {
    established = '1987';
    dynamicCourses = [
      { name: 'BA LL.B (Hons)', fees: '₹3.0 Lakhs / yr', duration: '5 Years', eligibility: '10+2 with 45% + CLAT' },
      { name: 'BBA LL.B', fees: '₹2.8 Lakhs / yr', duration: '5 Years', eligibility: '10+2 with 45% + CLAT' },
      { name: 'LL.M Corporate Law', fees: '₹1.5 Lakhs / yr', duration: '1 Year', eligibility: 'LL.B + CLAT PG' }
    ];
    dynamicAbout = `${base.name} is a premier National Law University dedicated to the study of law and justice. It is renowned for its rigorous academic curriculum, moot court competitions, and distinguished alumni serving in the highest courts and top corporate law firms.`;
    coverImage = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=80';
  } else if (lowerId.includes('iim') || lowerId.includes('mba') || lowerId.includes('siu') || lowerId === 'iima') {
    established = lowerId === 'iima' ? '1961' : '1978';
    dynamicCourses = [
      { name: 'PGPM (MBA)', fees: '₹25.0 Lakhs / total', duration: '2 Years', eligibility: 'Graduation + CAT 99%ile' },
      { name: 'Executive MBA', fees: '₹30.0 Lakhs / total', duration: '1 Year', eligibility: 'Graduation + 5 Yrs Exp + GMAT' },
      { name: 'Ph.D in Management', fees: '₹1.0 Lakhs / yr', duration: '4 Years', eligibility: 'Masters Degree + CAT/GMAT' }
    ];
    dynamicAbout = `${base.name} is recognized globally for its excellence in management education and research. It is known for producing world-class business leaders, entrepreneurs, and thinkers.`;
    coverImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80';
  } else if (lowerId.includes('aiims') || lowerId.includes('medical')) {
    established = '1956';
    dynamicCourses = [
      { name: 'MBBS', fees: '₹1,628 / yr', duration: '5.5 Years', eligibility: '10+2 PCB + NEET UG' },
      { name: 'BDS', fees: '₹1,00,000 / yr', duration: '5 Years', eligibility: '10+2 PCB + NEET UG' },
      { name: 'MD General Medicine', fees: '₹2,00,000 / yr', duration: '3 Years', eligibility: 'MBBS + NEET PG' }
    ];
    dynamicAbout = `${base.name} is an institution of national importance providing cutting-edge medical education and healthcare. With a massive multi-specialty hospital on campus, it offers unparalleled clinical exposure to its students.`;
    coverImage = 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1920&q=80';
  } else {
    // Engineering
    established = lowerId === 'iitb' ? '1958' : '1964';
    dynamicCourses = [
      { name: 'B.Tech Computer Science', fees: '₹2.2 Lakhs / yr', duration: '4 Years', eligibility: '10+2 with 75% + JEE Main & Advanced' },
      { name: 'B.Tech Mechanical', fees: '₹2.0 Lakhs / yr', duration: '4 Years', eligibility: '10+2 with 75% + JEE Main' },
      { name: 'MBA Finance', fees: '₹2.5 Lakhs / yr', duration: '2 Years', eligibility: 'Graduation + CAT/MAT' },
      { name: 'M.Tech Data Science', fees: '₹1.8 Lakhs / yr', duration: '2 Years', eligibility: 'B.Tech + GATE' }
    ];
    dynamicAbout = `Established in ${established}, ${base.name} is a premier institute that has consistently ranked among the top colleges in its domain. With a rich legacy, the institute offers a unique blend of traditional values and modern education. The campus spans across a vibrant area in the heart of the city, providing a conducive environment for holistic learning.`;
    coverImage = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80';
  }
  const images = (lowerId.includes('aiims') || lowerId.includes('medical'))
    ? ["/images/medical.png", "/images/medical_college_new.jpg"]
    : [coverImage];

  return {
    ...base,
    established,
    ownership: lowerId.startsWith('iit') || lowerId.startsWith('iim') || lowerId.startsWith('aiims') || lowerId.startsWith('nls') ? 'Public/Government' : 'Private',
    approvals: ['AICTE', 'UGC', 'NBA', 'NAAC A+'],
    coverImage,
    images,
    stats: {
      avgFees: base.fees || '₹2.0 Lakhs/yr',
      placementRate: '98%',
      avgPackage: base.package || '₹16.5 LPA',
      highestPackage: base.highestPackage || '₹45.0 LPA',
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
    recruitersList: [
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
    reviewsList: [
      { name: 'Aarav Sharma', course: 'CSE graduate, 2023', rating: 5, text: 'Absolutely brilliant faculty and the coding culture is phenomenal. Secured a placement at Google on Day 1!' },
      { name: 'Priya Patel', course: 'MBA student, 2022', rating: 4, text: 'The campus infrastructure is top-notch. The alumni network really helps during summer internships.' },
      { name: 'Rohan Gupta', course: 'Mechanical engineering, 2024', rating: 5, text: 'State of the art labs and great support for entrepreneurship. Highly recommend for practical learners.' },
      { name: 'Neha Singh', course: 'Law student, 2023', rating: 4, text: 'Rigorous academics but very rewarding. Moot court competitions are taken very seriously here.' }
    ],
    faqs: [
      { q: `Is it good for placements?`, a: 'Yes, it has consistently achieved over 95% placements with top MNCs visiting the campus every year.' },
      { q: 'What is the admission process?', a: 'Admissions are strictly based on national level entrance exams followed by rigorous counseling sessions and interviews.' },
      { q: 'Are there any scholarships available?', a: 'Yes, government scholarships and merit-based institutional scholarships up to 100% tuition waiver are available for deserving students.' },
      { q: 'Is hostel facility available?', a: 'Yes, separate fully-furnished AC and Non-AC hostels for boys and girls are available with Wi-Fi connectivity.' }
    ]
  };
};

const featuredCollegesBase = [
  {
    id: "iitb",
    name: "Indian Institute of Technology (IIT) Bombay",
    logo: "IITB",
    stream: "Engineering",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80",
    location: "Mumbai, Maharashtra",
    rating: "4.9",
    fees: "₹2.2 Lakhs / Yr",
    nirf: "#3 Engineering",
    package: "₹21.8 LPA Avg",
    highestPackage: "₹1.6 Crore",
    reviews: "1,450 Reviews",
    description: "Premier engineering institute in Mumbai with global recognition and top-tier placement records."
  },
  {
    id: "iima",
    name: "Indian Institute of Management (IIM) Ahmedabad",
    logo: "IIMA",
    stream: "Management",
    image: "/images/mba.png",
    location: "Ahmedabad, Gujarat",
    rating: "4.9",
    fees: "₹11.5 Lakhs / Yr",
    nirf: "#1 Management",
    package: "₹32.5 LPA Avg",
    highestPackage: "₹1.1 Crore",
    reviews: "980 Reviews",
    description: "Globally recognized premier business school offering executive and postgraduate management studies."
  },
  {
    id: "bits",
    name: "Birla Institute of Technology & Science (BITS)",
    logo: "BITS",
    stream: "Engineering",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    location: "Pilani, Rajasthan",
    rating: "4.7",
    fees: "₹4.5 Lakhs / Yr",
    nirf: "#20 Engineering",
    package: "₹19.2 LPA Avg",
    highestPackage: "₹72.0 LPA",
    reviews: "1,120 Reviews",
    description: "Top autonomous private technical university known for BITSAT and exceptional graduation placement stats."
  },
  {
    id: "aiims",
    name: "All India Institute of Medical Sciences (AIIMS)",
    logo: "AIIMS",
    stream: "Medical",
    image: "/images/medical.png",
    location: "New Delhi, Delhi",
    rating: "4.8",
    fees: "₹1,628 / Yr",
    nirf: "#1 Medical",
    package: "₹18.0 LPA Avg",
    highestPackage: "₹45.0 LPA",
    reviews: "670 Reviews",
    description: "Apex medical education and research institute offering MBBS and research programs in New Delhi."
  },
  {
    id: "cmc-vellore",
    name: "Christian Medical College (CMC) Vellore",
    logo: "CMC",
    stream: "Medical",
    image: "/images/medical_college_new.jpg",
    location: "Vellore, Tamil Nadu",
    rating: "4.8",
    fees: "₹1.5 Lakhs / Yr",
    nirf: "#3 Medical",
    package: "₹10.5 LPA Avg",
    highestPackage: "₹25.0 LPA",
    reviews: "520 Reviews",
    description: "Renowned private medical college and hospital providing education and medical services since 1900."
  },
  {
    id: "siu",
    name: "Symbiosis Institute of Business Management",
    logo: "SIBM",
    stream: "Management",
    image: "/images/mba.png",
    location: "Pune, Maharashtra",
    rating: "4.5",
    fees: "₹11.2 Lakhs / Yr",
    nirf: "#17 Management",
    package: "₹23.0 LPA Avg",
    highestPackage: "₹49.0 LPA",
    reviews: "830 Reviews",
    description: "Highly ranked private B-School under Symbiosis International University specializing in corporate studies."
  },
  {
    id: "nlsiu",
    name: "National Law School of India University",
    logo: "NLSIU",
    stream: "Law",
    image: "/images/law.png",
    location: "Bengaluru, Karnataka",
    rating: "4.7",
    fees: "₹2.8 Lakhs / Yr",
    nirf: "#1 Law",
    package: "₹16.0 LPA Avg",
    highestPackage: "₹38.0 LPA",
    reviews: "450 Reviews",
    description: "The apex university for law education in India, renowned for producing top judges and legal counsels."
  }
];

// Helper to seed more colleges for City Detail pages (e.g. Pune, Delhi, Mumbai, Bangalore)
const generateCityColleges = (city, category) => {
  const isMedical = category.toLowerCase() === 'medical';
  const isMBA = category.toLowerCase() === 'mba' || category.toLowerCase() === 'management';
  const isLaw = category.toLowerCase() === 'law';
  return [
    {
      id: `iit-${city.toLowerCase()}`,
      name: `Indian Institute of Technology (IIT) ${city}`,
      logo: `IIT${city.charAt(0)}`,
      stream: category,
      image: isMedical 
        ? "/images/medical.png"
        : isMBA 
          ? "/images/mba.png"
          : isLaw 
            ? "/images/law.png"
            : "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      location: `${city}, India`,
      rating: "4.8",
      fees: "₹2.5 Lakhs / Yr",
      nirf: "#1 " + category,
      package: "₹25.5 LPA Avg",
      highestPackage: "₹1.2 Crore",
      reviews: "340 Reviews",
      description: `Premier ${category.toLowerCase()} institute in ${city} with global recognition and top-tier placement records.`
    },
    {
      id: `${city.toLowerCase()}-college-of-${category.toLowerCase()}`,
      name: `${city} College of ${category}`,
      logo: `C${city.substring(0, 2).toUpperCase()}`,
      stream: category,
      image: isMedical 
        ? "/images/medical.png"
        : isMBA 
          ? "/images/mba.png"
          : isLaw 
            ? "/images/law.png"
            : "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      location: `Central District, ${city}`,
      rating: "4.4",
      fees: "₹4.5 Lakhs / Yr",
      nirf: "#89 " + category,
      package: "₹12.4 LPA Avg",
      highestPackage: "₹45.0 LPA",
      reviews: "150 Reviews",
      description: `Top private ${category.toLowerCase()} college in ${city} known for excellence in education.`
    },
    {
      id: `${city.toLowerCase()}-${category.toLowerCase()}-university`,
      name: `${city} ${category} University`,
      logo: `U${city.charAt(0)}`,
      stream: category,
      image: isMedical 
        ? "/images/medical.png"
        : isMBA 
          ? "/images/mba.png"
          : isLaw 
            ? "/images/law.png"
            : (city.toLowerCase() === 'pune' && category.toLowerCase() === 'engineering')
              ? "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=800&q=80"
              : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
      location: `University Road, ${city}`,
      rating: "4.3",
      fees: "₹3.8 Lakhs / Yr",
      nirf: "#100 " + category,
      package: "₹10.8 LPA Avg",
      highestPackage: "₹38.0 LPA",
      reviews: "210 Reviews",
      description: `Leading private university offering multi-disciplinary programs with industry tie-ups in ${city}.`
    },
    {
      id: `nit-${city.toLowerCase()}`,
      name: `National Institute of ${category} (NIT) ${city}`,
      logo: `NIT${city.charAt(0)}`,
      stream: category,
      image: isMedical 
        ? "/images/medical.png"
        : isMBA 
          ? "/images/mba.png"
          : isLaw 
            ? "/images/law.png"
            : "/images/nit.jpg",
      location: `Campus Road, ${city}`,
      rating: "4.6",
      fees: "₹2.2 Lakhs / Yr",
      nirf: "#60 " + category,
      package: "₹15.5 LPA Avg",
      highestPackage: "₹56.0 LPA",
      reviews: "410 Reviews",
      description: `Renowned government university famous for its engineering and technical programs.`
    }
  ];
};

const citiesData = [
  { id: "pune", name: "Pune", image: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=800&q=80", count: "110+ Colleges" },
  { id: "delhi", name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80", count: "150+ Colleges" },
  { id: "mumbai", name: "Mumbai", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80", count: "90+ Colleges" },
  { id: "bangalore", name: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80", count: "130+ Colleges" },
  { id: "hyderabad", name: "Hyderabad", image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=800&q=80", count: "80+ Colleges" }
];

const newsArticles = [
  {
    id: "jee-main-cutoff",
    title: "JEE Main Session 1 Cutoff Analysis & Tier-1 College Trends",
    subtitle: "An in-depth review of score-versus-percentile shifts this season and what it means for admissions into top NITs/IIITs.",
    category: "Admission News",
    date: "May 24, 2026",
    readTime: "6 Min Read",
    views: "12.4k Views",
    author: {
      name: "Aditya Sharma",
      role: "Senior Academic Analyst",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    },
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1920&q=80",
    content: [
      { type: "h2", text: "Overview of Session 1 Results", id: "overview" },
      { type: "p", text: "The Joint Entrance Examination (JEE) Main Session 1 has concluded, and the results have sparked widespread discussions among aspirants and educators alike. This year, we've witnessed an unprecedented shift in the score-versus-percentile metrics, indicating a highly competitive landscape for engineering admissions." },
      { type: "p", text: "With over 1.2 million candidates appearing for the exam, the normalization process has resulted in significant variations across different shifts. Students are advised to carefully analyze their raw scores against the published answer keys before estimating their percentiles." },
      {
        type: "highlight", title: "Important Highlights", id: "highlights", items: [
          "A significant spike in the number of candidates scoring above the 99th percentile.",
          "The cutoff for top-tier NITs and IIITs is expected to rise by 2-3 percentile points.",
          "Core branches like Computer Science (CSE) and Artificial Intelligence remain the most sought-after."
        ]
      },
      { type: "h2", text: "Tier-1 College Cutoff Trends", id: "trends" },
      { type: "p", text: "Analyzing the trends from the past three years, it is evident that the demand for circuit branches has reached an all-time high. Institutions like NIT Trichy, Surathkal, and Warangal are expected to close their CSE admissions at a staggering 99.8+ percentile for the open category." },
      { type: "quote", text: "Students falling slightly below their target percentile shouldn't lose hope. Strong tier-2 institutions and state-level engineering colleges offer excellent placements and robust curriculums. The focus should now shift entirely to optimizing performance in Session 2.", author: "Dr. Arvind Kumar, Ex-Director, NTA" }
    ]
  },
  {
    id: "ugc-guidelines",
    title: "UGC Guidelines Issued for Foreign University Campuses in India",
    subtitle: "Everything you need to know about double degrees, credit transfer policy, and the top international universities establishing hubs.",
    category: "Policy Update",
    date: "May 20, 2026",
    readTime: "5 Min Read",
    views: "8.2k Views",
    author: {
      name: "Editorial Team",
      role: "Education Policy Desk",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
    content: [
      { type: "h2", text: "The New Regulatory Framework", id: "overview" },
      { type: "p", text: "In a landmark move to internationalize higher education, the University Grants Commission (UGC) has released comprehensive guidelines allowing foreign universities to set up their campuses in India. This opens up global opportunities for Indian students without the massive financial burden of studying abroad." },
      {
        type: "highlight", title: "What This Means for Students", id: "highlights", items: [
          "Double Degrees: Pursue programs offering degrees recognized in both India and the host country.",
          "Credit Transfers: Seamless transfer of credits between the Indian campus and the parent campus abroad.",
          "Cost Efficiency: Experience Ivy League education at a fraction of the cost of studying internationally."
        ]
      }
    ]
  },
  {
    id: "gen-ai-mba",
    title: "How Gen-AI is Reshaping MBA Curriculums: Top Skills in Demand",
    subtitle: "Top business institutions are integrating prompt engineering and LLM analytics into management majors. Here is our report.",
    category: "Career Guide",
    date: "May 15, 2026",
    readTime: "7 Min Read",
    views: "15.6k Views",
    author: {
      name: "Dr. R. K. Sen",
      role: "Tech & Strategy Expert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1920&q=80",
    content: [
      { type: "h2", text: "The AI Revolution in Business", id: "overview" },
      { type: "p", text: "Generative AI is no longer just a buzzword; it's actively reshaping the corporate landscape, and business schools are racing to adapt. Leading IIMs and global business institutions are now incorporating AI-driven modules into their core MBA curriculums to prepare future leaders." }
    ]
  }
];

const examsData = [
  {
    id: 'cat',
    name: "CAT 2026",
    fullTitle: "Common Admission Test",
    category: "Management",
    level: "National Level",
    mode: "Computer Based Test (CBT)",
    applicants: "3.3 Lakh+",
    duration: "120 Minutes",
    conductingBody: "IIMs",
    frequency: "Once a Year",
    logo: "CA",
    overview: "CAT is India's most prestigious management entrance exam conducted by the IIMs. It evaluates a candidate's quantitative, verbal, and logical reasoning skills for admission into top-tier MBA programs across the country.",
    highlights: [
      { label: "Exam Mode", value: "Online (CBT)" },
      { label: "Exam Duration", value: "2 Hours (40 min/section)" },
      { label: "Total Questions", value: "66 Questions" },
      { label: "Negative Marking", value: "-1 for MCQs" },
      { label: "Participating Colleges", value: "1000+ B-Schools" },
      { label: "Difficulty Level", value: "High to Very High" }
    ],
    process: [
      { title: "Registration", desc: "Fill the online application form and upload documents." },
      { title: "Fee Payment", desc: "Pay the registration fee of ₹2400 (₹1200 for SC/ST)." },
      { title: "Admit Card", desc: "Download admit card from the official CAT website." },
      { title: "Examination", desc: "Appear for the CBT at the designated center." }
    ],
    syllabus: [
      { subject: "Verbal Ability & Reading Comprehension (VARC)", topics: ["Reading Comprehension", "Para Jumbles", "Para Summary", "Odd Sentence Out"] },
      { subject: "Data Interpretation & Logical Reasoning (DILR)", topics: ["Seating Arrangement", "Blood Relations", "Tables and Pie Charts", "Syllogism"] },
      { subject: "Quantitative Aptitude (QA)", topics: ["Arithmetic", "Algebra", "Geometry", "Number System"] }
    ],
    dates: [
      { event: "Notification Release", date: "July 30, 2026", status: "completed" },
      { event: "Registration Begins", date: "August 02, 2026", status: "active" },
      { event: "Registration Closes", date: "September 20, 2026", status: "upcoming" },
      { event: "CAT 2026 Exam", date: "November 29, 2026", status: "upcoming" }
    ],
    tips: [
      { title: "Mock Tests are Key", desc: "Take at least 30-40 full-length mock tests before the actual exam to build stamina and identify weak areas." },
      { title: "Focus on Accuracy", desc: "With a +3/-1 marking scheme, accuracy is more important than the number of attempts." }
    ],
    cutoffs: [
      { college: "IIM Ahmedabad", cat: "General", percentile: "99.5+" },
      { college: "IIM Bangalore", cat: "General", percentile: "99.0+" }
    ],
    papers: [
      { year: "2023", size: "2.4 MB" },
      { year: "2022", size: "2.1 MB" }
    ],
    faqs: [
      { q: "What is the eligibility criteria for CAT?", a: "A bachelor's degree with at least 50% marks or equivalent CGPA." },
      { q: "Can final year students apply?", a: "Yes, candidates appearing for the final year of their bachelor's degree can also apply." }
    ]
  },
  {
    id: 'jee',
    name: "JEE Main 2026",
    fullTitle: "Joint Entrance Examination",
    category: "Engineering",
    level: "National Level",
    mode: "Computer Based Test (CBT)",
    applicants: "12.4 Lakh+",
    duration: "180 Minutes",
    conductingBody: "NTA",
    frequency: "Twice a Year",
    logo: "JE",
    overview: "JEE Main is the premier national-level engineering exam for NITs, IIITs, and CFTIs, and serves as the qualifying exam for JEE Advanced.",
    highlights: [
      { label: "Exam Mode", value: "Online (CBT)" },
      { label: "Exam Duration", value: "3 Hours" },
      { label: "Negative Marking", value: "-1 for wrong answers" }
    ],
    process: [
      { title: "Registration", desc: "Register online on NTA JEE website." },
      { title: "Appearing for Exam", desc: "Appear for JEE Session 1 in January or Session 2 in April." }
    ],
    syllabus: [
      { subject: "Physics", topics: ["Kinematics", "Thermodynamics", "Electrostatics", "Modern Physics"] },
      { subject: "Chemistry", topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"] },
      { subject: "Mathematics", topics: ["Calculus", "Algebra", "Vectors & 3D Geometry", "Trigonometry"] }
    ],
    dates: [
      { event: "Registration Session 1", date: "Nov-Dec 2025", status: "completed" },
      { event: "Session 1 Exam", date: "January 24 - Feb 1, 2026", status: "completed" },
      { event: "Registration Session 2", date: "March 2026", status: "active" }
    ],
    tips: [
      { title: "NCERT is Essential", desc: "NCERT covers 80%+ of Chemistry and direct conceptual points in Physics." }
    ],
    cutoffs: [
      { college: "IIT Bombay", cat: "General", percentile: "99.8+" },
      { college: "NIT Trichy", cat: "General", percentile: "99.2+" }
    ],
    papers: [
      { year: "2023", size: "3.2 MB" }
    ],
    faqs: [
      { q: "Is NCERT enough for JEE Main?", a: "Yes, particularly for Chemistry, NCERT is highly recommended." }
    ]
  }
];

const eventsData = [
  {
    id: "nat-fair-2026",
    title: "Edeco National Admissions Fair 2026",
    format: "Offline Seminar",
    type: "Admissions Fair",
    destination: "Global",
    studyLevel: "Undergraduate & PG",
    location: "New Delhi HQ",
    date: "June 25, 2026",
    time: "10:00 AM - 5:00 PM IST",
    desc: "Meet admissions directors from 100+ top universities in India, USA, UK, and Canada. Get on-spot profile assessment, loan inquiries, and scholarship queries resolved.",
    speaker: {
      name: "Dr. Rachel Green",
      role: "Dean of Admissions",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
    },
    slots: "12 seats left"
  },
  {
    id: "ai-tech-webinar",
    title: "AI & Machine Learning: Future of Tech Careers",
    format: "Online Webinar",
    type: "Webinar",
    destination: "India",
    studyLevel: "Postgraduate",
    location: "Online Zoom Session",
    date: "June 15, 2026",
    time: "4:00 PM - 5:30 PM IST",
    desc: "Discover key specializations in Artificial Intelligence and Machine Learning. Get a comprehensive roadmap for building a high-growth career in engineering.",
    speaker: {
      name: "Prof. Alan Turing",
      role: "AI Research Lead",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop"
    },
    slots: "Last 5 slots"
  },
  {
    id: "mba-panel-insights",
    title: "MBA Panel: Insights from Top Business Schools",
    format: "Online Webinar",
    type: "Panel Discussion",
    destination: "India",
    studyLevel: "Postgraduate",
    location: "Online Zoom Session",
    date: "June 18, 2026",
    time: "6:00 PM - 7:30 PM IST",
    desc: "Learn what admissions committees look for in business leaders. Panel discussion with alumni from FMS, IIMs, and international business academies.",
    speaker: {
      name: "Sarah Jenkins",
      role: "Management Consultant",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
    },
    slots: "18 slots left"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/edeco');
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await College.deleteMany({});
    await City.deleteMany({});
    await Exam.deleteMany({});
    await Event.deleteMany({});
    await News.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing database collections.');

    // Seed default admin user
    await User.create({
      name: 'System Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin&background=1e293b&color=fff'
    });
    console.log('Admin user seeded!');

    // Seed Cities
    await City.insertMany(citiesData);
    console.log('Cities seeded!');

    // Seed Exams
    await Exam.insertMany(examsData);
    console.log('Exams seeded!');

    // Seed Events
    await Event.insertMany(eventsData);
    console.log('Events seeded!');

    // Seed News
    await News.insertMany(newsArticles);
    console.log('News articles seeded!');

    // Seed Core Colleges
    const coreColleges = featuredCollegesBase.map((c) => getCollegeDetails(c.id, c));
    await College.insertMany(coreColleges);

    // Seed City-Specific Colleges to ensure CityDetail page works perfectly
    const categories = ['Engineering', 'MBA', 'Medical', 'Law'];
    const cityColleges = [];

    for (const city of ['Pune', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad']) {
      for (const category of categories) {
        const generated = generateCityColleges(city, category);
        const detailed = generated.map(c => getCollegeDetails(c.id, c));
        cityColleges.push(...detailed);
      }
    }

    // Insert city colleges (avoiding duplicates if any)
    for (const col of cityColleges) {
      const exists = await College.findOne({ id: col.id });
      if (!exists) {
        await College.create(col);
      }
    }

    console.log('All Colleges seeded (core & city-specific)!');
    console.log('Database Seeding Completed Successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
