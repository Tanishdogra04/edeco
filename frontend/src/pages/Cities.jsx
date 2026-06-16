import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Building2, Search, ArrowLeft, ChevronRight, 
  Building
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Full list of 77 Indian cities categorized by Tier I, II, III, IV and Capitals
const allCities = [
  // TIER I CITIES
  { 
    id: "bangalore", name: "Bangalore (Bengaluru)", tier: "tier1", isCapital: true,
    colleges: "120+ Colleges", avgPackage: "8.2 LPA", 
    desc: "IT & Start-up Capital of India", keyStreams: "Engineering, MBA, MCA",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "delhi", name: "Delhi (New Delhi)", tier: "tier1", isCapital: true,
    colleges: "150+ Colleges", avgPackage: "7.8 LPA", 
    desc: "National Capital Region of India", keyStreams: "B.Tech, MBA, Law",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "chennai", name: "Chennai", tier: "tier1", isCapital: true,
    colleges: "95+ Colleges", avgPackage: "7.1 LPA", 
    desc: "Automobile & SaaS Hub of South India", keyStreams: "Engineering, MBA, Science",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "hyderabad", name: "Hyderabad", tier: "tier1", isCapital: true,
    colleges: "80+ Colleges", avgPackage: "7.5 LPA", 
    desc: "Tech & Pharmaceutical Hub", keyStreams: "B.Tech, Pharmacy, MBA",
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "mumbai", name: "Mumbai", tier: "tier1", isCapital: true,
    colleges: "90+ Colleges", avgPackage: "8.5 LPA", 
    desc: "Financial & Commercial Capital", keyStreams: "Finance, Design, MBA",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "pune", name: "Pune", tier: "tier1", isCapital: false,
    colleges: "110+ Colleges", avgPackage: "7.2 LPA", 
    desc: "Oxford of the East & Education Hub", keyStreams: "Engineering, MBA, Arts",
    image: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "kolkata", name: "Kolkata", tier: "tier1", isCapital: true,
    colleges: "85+ Colleges", avgPackage: "6.8 LPA", 
    desc: "Cultural & Literary Hub of India", keyStreams: "B.Sc, MBA, B.Tech",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "ahmedabad", name: "Ahmedabad", tier: "tier1", isCapital: false,
    colleges: "70+ Colleges", avgPackage: "7.0 LPA", 
    desc: "Textile & Commerce Business Hub", keyStreams: "MBA, Commerce, Design",
    image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=400&q=80"
  },

  // TIER II CITIES
  { 
    id: "amritsar", name: "Amritsar", tier: "tier2", isCapital: false,
    colleges: "30+ Colleges", avgPackage: "5.0 LPA", 
    desc: "Holy Golden Temple City", keyStreams: "Arts, Tourism, MBA",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "bhopal", name: "Bhopal", tier: "tier2", isCapital: true,
    colleges: "45+ Colleges", avgPackage: "5.6 LPA", 
    desc: "City of Lakes & Capital of MP", keyStreams: "B.Tech, MBA, Science",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "bhubaneswar", name: "Bhubaneswar", tier: "tier2", isCapital: true,
    colleges: "40+ Colleges", avgPackage: "5.8 LPA", 
    desc: "Temple City of Odisha & Education Hub", keyStreams: "Engineering, Medical, MBA",
    image: "https://images.unsplash.com/photo-1592289658098-b80c102b5e28?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "chandigarh", name: "Chandigarh", tier: "tier2", isCapital: true,
    colleges: "55+ Colleges", avgPackage: "6.5 LPA", 
    desc: "Beautiful Clean Planned City", keyStreams: "B.Tech, Law, Science",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "faridabad", name: "Faridabad", tier: "tier2", isCapital: false,
    colleges: "25+ Colleges", avgPackage: "5.2 LPA", 
    desc: "Industrial & Manufacturing Hub of Haryana", keyStreams: "B.Tech, Management",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "ghaziabad", name: "Ghaziabad", tier: "tier2", isCapital: false,
    colleges: "35+ Colleges", avgPackage: "5.4 LPA", 
    desc: "Major Gateway City of UP", keyStreams: "Engineering, MBA, MCA",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "jamshedpur", name: "Jamshedpur", tier: "tier2", isCapital: false,
    colleges: "20+ Colleges", avgPackage: "6.8 LPA", 
    desc: "Steel City of India", keyStreams: "MBA, Engineering",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "jaipur", name: "Jaipur", tier: "tier2", isCapital: true,
    colleges: "60+ Colleges", avgPackage: "6.2 LPA", 
    desc: "The Pink City & Tourism Center", keyStreams: "Design, MBA, Arts",
    image: "https://images.unsplash.com/photo-1477587458883-47135fbdb57c?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "kochi", name: "Kochi", tier: "tier2", isCapital: false,
    colleges: "40+ Colleges", avgPackage: "5.9 LPA", 
    desc: "Port City of Kerala", keyStreams: "Maritime, MBA, Tech",
    image: "https://images.unsplash.com/photo-1588668214407-6eb952709904?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "lucknow", name: "Lucknow", tier: "tier2", isCapital: true,
    colleges: "65+ Colleges", avgPackage: "5.8 LPA", 
    desc: "City of Nawabs & Capital of UP", keyStreams: "MBA, B.Tech, Arts",
    image: "https://images.unsplash.com/photo-1572431440767-f0dc2f82ba95?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "nagpur", name: "Nagpur", tier: "tier2", isCapital: false,
    colleges: "45+ Colleges", avgPackage: "5.5 LPA", 
    desc: "Orange City of India & Commercial Center", keyStreams: "B.Tech, Management",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "patna", name: "Patna", tier: "tier2", isCapital: true,
    colleges: "35+ Colleges", avgPackage: "5.2 LPA", 
    desc: "Historic Capital of Bihar", keyStreams: "Science, Engineering, Commerce",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "raipur", name: "Raipur", tier: "tier2", isCapital: true,
    colleges: "30+ Colleges", avgPackage: "5.5 LPA", 
    desc: "Fast Growing Capital Hub of Chhattisgarh", keyStreams: "B.Tech, Commerce, MBA",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "surat", name: "Surat", tier: "tier2", isCapital: false,
    colleges: "45+ Colleges", avgPackage: "5.8 LPA", 
    desc: "Diamond City of India & Textile Center", keyStreams: "Commerce, Management, Tech",
    image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "visakhapatnam", name: "Visakhapatnam", tier: "tier2", isCapital: false,
    colleges: "38+ Colleges", avgPackage: "6.0 LPA", 
    desc: "Coastal Port Hub of Andhra Pradesh", keyStreams: "Engineering, Maritime, Science",
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "agra", name: "Agra", tier: "tier2", isCapital: false,
    colleges: "28+ Colleges", avgPackage: "5.1 LPA", 
    desc: "Historical Taj City", keyStreams: "Tourism, MBA, B.Tech",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "ajmer", name: "Ajmer", tier: "tier2", isCapital: false,
    colleges: "22+ Colleges", avgPackage: "5.0 LPA", 
    desc: "Historical Education Center", keyStreams: "Arts, B.Sc, B.Ed",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "kanpur", name: "Kanpur", tier: "tier2", isCapital: false,
    colleges: "42+ Colleges", avgPackage: "6.4 LPA", 
    desc: "Industrial & Education Hub of UP", keyStreams: "B.Tech, Science, Commerce",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "mysuru", name: "Mysuru", tier: "tier2", isCapital: false,
    colleges: "35+ Colleges", avgPackage: "5.6 LPA", 
    desc: "Cultural City of Palaces", keyStreams: "MBA, Science, B.Arch",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "srinagar", name: "Srinagar", tier: "tier2", isCapital: true,
    colleges: "25+ Colleges", avgPackage: "5.5 LPA", 
    desc: "Summer Capital of Jammu & Kashmir", keyStreams: "Engineering, Tourism, Science",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80"
  },

  // TIER III CITIES
  { 
    id: "etawah", name: "Etawah", tier: "tier3", isCapital: false,
    colleges: "12+ Colleges", avgPackage: "4.2 LPA", 
    desc: "Regional Education Center in UP", keyStreams: "Arts, Science, Commerce",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "roorkee", name: "Roorkee", tier: "tier3", isCapital: false,
    colleges: "15+ Colleges", avgPackage: "12.5 LPA", 
    desc: "Renowned Engineering Town in Uttarakhand", keyStreams: "B.Tech, M.Tech, Science",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "rajahmundry", name: "Rajahmundry", tier: "tier3", isCapital: false,
    colleges: "18+ Colleges", avgPackage: "4.5 LPA", 
    desc: "Cultural Capital of Andhra Pradesh", keyStreams: "Arts, Commerce, B.Tech",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "bhatinda", name: "Bhatinda", tier: "tier3", isCapital: false,
    colleges: "15+ Colleges", avgPackage: "4.8 LPA", 
    desc: "Historical City of Punjab", keyStreams: "B.Tech, Science, MBA",
    image: "https://images.unsplash.com/photo-1592289658098-b80c102b5e28?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "hajipur", name: "Hajipur", tier: "tier3", isCapital: false,
    colleges: "10+ Colleges", avgPackage: "4.0 LPA", 
    desc: "Growing Educational Town in Bihar", keyStreams: "Arts, Commerce",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "rohtak", name: "Rohtak", tier: "tier3", isCapital: false,
    colleges: "25+ Colleges", avgPackage: "5.0 LPA", 
    desc: "Medical & Educational Hub of Haryana", keyStreams: "Medical, MBA, B.Tech",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "hosur", name: "Hosur", tier: "tier3", isCapital: false,
    colleges: "14+ Colleges", avgPackage: "4.9 LPA", 
    desc: "Industrial Border Hub of Tamil Nadu", keyStreams: "Engineering, Commerce",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "junagadh", name: "Junagadh", tier: "tier3", isCapital: false,
    colleges: "12+ Colleges", avgPackage: "4.1 LPA", 
    desc: "Historic City at the foothills of Girnar", keyStreams: "Agriculture, Arts",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "udaipur", name: "Udaipur", tier: "tier3", isCapital: false,
    colleges: "30+ Colleges", avgPackage: "5.1 LPA", 
    desc: "Scenic Lake City of Rajasthan", keyStreams: "Design, MBA, Arts",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "salem", name: "Salem", tier: "tier3", isCapital: false,
    colleges: "22+ Colleges", avgPackage: "4.8 LPA", 
    desc: "Steel & Textile Hub of Tamil Nadu", keyStreams: "B.Tech, MBA, Commerce",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "jhansi", name: "Jhansi", tier: "tier3", isCapital: false,
    colleges: "18+ Colleges", avgPackage: "4.6 LPA", 
    desc: "Historic Bundelkhand Town", keyStreams: "Arts, Science, Tech",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "madurai", name: "Madurai", tier: "tier3", isCapital: false,
    colleges: "35+ Colleges", avgPackage: "5.2 LPA", 
    desc: "Heritage Temple City of Tamil Nadu", keyStreams: "Medical, B.Tech, Arts",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "vijayawada", name: "Vijayawada", tier: "tier3", isCapital: false,
    colleges: "32+ Colleges", avgPackage: "5.4 LPA", 
    desc: "Major Commercial & Educational Center", keyStreams: "Engineering, MBA",
    image: "https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "meerut", name: "Meerut", tier: "tier3", isCapital: false,
    colleges: "26+ Colleges", avgPackage: "4.9 LPA", 
    desc: "Sports & Industrial Hub of UP", keyStreams: "B.Tech, MBA, Arts",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "mathura", name: "Mathura", tier: "tier3", isCapital: false,
    colleges: "20+ Colleges", avgPackage: "4.8 LPA", 
    desc: "Spiritual & Historical Heritage Center", keyStreams: "B.Tech, Arts, Science",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "bikaner", name: "Bikaner", tier: "tier3", isCapital: false,
    colleges: "16+ Colleges", avgPackage: "4.5 LPA", 
    desc: "Desert Cultural Hub in Rajasthan", keyStreams: "Arts, Science, Commerce",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "cuttack", name: "Cuttack", tier: "tier3", isCapital: false,
    colleges: "24+ Colleges", avgPackage: "5.0 LPA", 
    desc: "Millennium Heritage City of Odisha", keyStreams: "Law, Medical, Arts",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "nashik", name: "Nashik", tier: "tier3", isCapital: false,
    colleges: "35+ Colleges", avgPackage: "5.5 LPA", 
    desc: "Wine Capital of India & Manufacturing Hub", keyStreams: "MBA, B.Tech, Design",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80"
  },

  // TIER IV CITIES
  { 
    id: "banswara", name: "Banswara", tier: "tier4", isCapital: false,
    colleges: "8+ Colleges", avgPackage: "3.8 LPA", 
    desc: "City of Hundred Islands in Rajasthan", keyStreams: "Arts, Science",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "bhadreswar", name: "Bhadreswar", tier: "tier4", isCapital: false,
    colleges: "6+ Colleges", avgPackage: "3.6 LPA", 
    desc: "Hooghly Suburban Hub in West Bengal", keyStreams: "Arts, Commerce",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "chilakaluripet", name: "Chilakaluripet", tier: "tier4", isCapital: false,
    colleges: "5+ Colleges", avgPackage: "3.5 LPA", 
    desc: "Commercial Town in Andhra Pradesh", keyStreams: "Arts, Commerce",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "datia", name: "Datia", tier: "tier4", isCapital: false,
    colleges: "8+ Colleges", avgPackage: "3.8 LPA", 
    desc: "Historic Center in Madhya Pradesh", keyStreams: "Arts, Science",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "gangtok", name: "Gangtok", tier: "tier4", isCapital: true,
    colleges: "12+ Colleges", avgPackage: "5.2 LPA", 
    desc: "Himalayan Capital of Sikkim", keyStreams: "Hospitality, Arts, Tech",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "kalyani", name: "Kalyani", tier: "tier4", isCapital: false,
    colleges: "14+ Colleges", avgPackage: "5.8 LPA", 
    desc: "Planned Educational Town in West Bengal", keyStreams: "Engineering, Medical",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "kapurthala", name: "Kapurthala", tier: "tier4", isCapital: false,
    colleges: "10+ Colleges", avgPackage: "4.5 LPA", 
    desc: "Heritage & Manufacturing Hub of Punjab", keyStreams: "B.Tech, Arts",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "kasganj", name: "Kasganj", tier: "tier4", isCapital: false,
    colleges: "6+ Colleges", avgPackage: "3.5 LPA", 
    desc: "Ganges Basin Region in Uttar Pradesh", keyStreams: "Arts, Commerce",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "nagda", name: "Nagda", tier: "tier4", isCapital: false,
    colleges: "5+ Colleges", avgPackage: "3.7 LPA", 
    desc: "Industrial Junction in Madhya Pradesh", keyStreams: "Science, Commerce",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "sujangarh", name: "Sujangarh", tier: "tier4", isCapital: false,
    colleges: "8+ Colleges", avgPackage: "3.6 LPA", 
    desc: "Cultural Town of Churu, Rajasthan", keyStreams: "Arts, Commerce",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },

  // ADDITIONAL CAPITAL CITIES
  { 
    id: "agartala", name: "Agartala", tier: "tier3", isCapital: true,
    colleges: "15+ Colleges", avgPackage: "4.8 LPA", 
    desc: "Capital of Tripura State", keyStreams: "Arts, B.Tech, Science",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "aizawl", name: "Aizawl", tier: "tier3", isCapital: true,
    colleges: "12+ Colleges", avgPackage: "4.6 LPA", 
    desc: "Capital of Mizoram State", keyStreams: "Arts, Commerce, Science",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "amaravati", name: "Amaravati", tier: "tier2", isCapital: true,
    colleges: "25+ Colleges", avgPackage: "6.0 LPA", 
    desc: "Capital of Andhra Pradesh State", keyStreams: "B.Tech, Law, Management",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "daman", name: "Daman", tier: "tier4", isCapital: true,
    colleges: "6+ Colleges", avgPackage: "4.5 LPA", 
    desc: "Capital of DNH & DD Union Territory", keyStreams: "Arts, Commerce",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "dehradun", name: "Dehradun", tier: "tier2", isCapital: true,
    colleges: "40+ Colleges", avgPackage: "5.8 LPA", 
    desc: "Capital of Uttarakhand State", keyStreams: "Forestry, MBA, B.Tech",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "dispur", name: "Dispur", tier: "tier3", isCapital: true,
    colleges: "18+ Colleges", avgPackage: "4.8 LPA", 
    desc: "Capital of Assam State", keyStreams: "Arts, Commerce",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "gandhinagar", name: "Gandhinagar", tier: "tier2", isCapital: true,
    colleges: "40+ Colleges", avgPackage: "6.8 LPA", 
    desc: "Green Capital of Gujarat State", keyStreams: "Design, MBA, Tech",
    image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "imphal", name: "Imphal", tier: "tier3", isCapital: true,
    colleges: "15+ Colleges", avgPackage: "4.7 LPA", 
    desc: "Capital of Manipur State", keyStreams: "Arts, Medical",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "itanagar", name: "Itanagar", tier: "tier4", isCapital: true,
    colleges: "8+ Colleges", avgPackage: "4.2 LPA", 
    desc: "Capital of Arunachal Pradesh State", keyStreams: "Arts, Science",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "jammu", name: "Jammu", tier: "tier2", isCapital: true,
    colleges: "30+ Colleges", avgPackage: "5.6 LPA", 
    desc: "Winter Capital of J&K UT", keyStreams: "B.Tech, MBA",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "kargil", name: "Kargil", tier: "tier4", isCapital: true,
    colleges: "5+ Colleges", avgPackage: "4.0 LPA", 
    desc: "Joint Capital of Ladakh UT", keyStreams: "Arts, Science",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "kavaratti", name: "Kavaratti", tier: "tier4", isCapital: true,
    colleges: "4+ Colleges", avgPackage: "3.8 LPA", 
    desc: "Capital of Lakshadweep Union Territory", keyStreams: "Science, Commerce",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "kohima", name: "Kohima", tier: "tier4", isCapital: true,
    colleges: "8+ Colleges", avgPackage: "4.1 LPA", 
    desc: "Capital of Nagaland State", keyStreams: "Arts, Commerce",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "leh", name: "Leh", tier: "tier4", isCapital: true,
    colleges: "6+ Colleges", avgPackage: "4.2 LPA", 
    desc: "Capital of Ladakh UT", keyStreams: "Arts, Tourism",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "panaji", name: "Panaji", tier: "tier3", isCapital: true,
    colleges: "15+ Colleges", avgPackage: "5.4 LPA", 
    desc: "Capital of Goa State", keyStreams: "Tourism, MBA, Commerce",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "port-blair", name: "Port Blair", tier: "tier4", isCapital: true,
    colleges: "8+ Colleges", avgPackage: "4.6 LPA", 
    desc: "Capital of Andaman & Nicobar Union Territory", keyStreams: "Science, Arts",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "puducherry", name: "Puducherry", tier: "tier3", isCapital: true,
    colleges: "25+ Colleges", avgPackage: "5.5 LPA", 
    desc: "Capital of Puducherry UT", keyStreams: "Medical, Engineering",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "ranchi", name: "Ranchi", tier: "tier2", isCapital: true,
    colleges: "45+ Colleges", avgPackage: "6.0 LPA", 
    desc: "Capital of Jharkhand State", keyStreams: "B.Tech, MBA",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "shillong", name: "Shillong", tier: "tier3", isCapital: true,
    colleges: "20+ Colleges", avgPackage: "5.0 LPA", 
    desc: "Capital of Meghalaya State", keyStreams: "Arts, MBA, Science",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "shimla", name: "Shimla", tier: "tier3", isCapital: true,
    colleges: "18+ Colleges", avgPackage: "4.8 LPA", 
    desc: "Capital of Himachal Pradesh State", keyStreams: "Tourism, MBA, Arts",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
  },
  { 
    id: "thiruvananthapuram", name: "Thiruvananthapuram", tier: "tier2", isCapital: true,
    colleges: "50+ Colleges", avgPackage: "6.2 LPA", 
    desc: "Capital of Kerala State", keyStreams: "B.Tech, Medical, MBA",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80"
  }
];

const processedCities = allCities.map((city, index) => {
  const keepIconic = [
    "bangalore", "delhi", "mumbai", "pune", "hyderabad", "chennai", "kolkata", "ahmedabad", "jaipur", "chandigarh"
  ];
  if (keepIconic.includes(city.id)) {
    return city;
  }
  const guaranteedImages = [
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1592289658098-b80c102b5e28?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80"
  ];
  return {
    ...city,
    image: guaranteedImages[index % guaranteedImages.length]
  };
});

export default function Cities() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'all', name: 'All Destinations' },
    { id: 'tier1', name: 'Tier 1' },
    { id: 'tier2', name: 'Tier 2' },
    { id: 'tier3', name: 'Tier 3' },
    { id: 'tier4', name: 'Tier 4' },
    { id: 'capitals', name: 'Capitals' }
  ];

  // Filter cities by tab selection & search query
  const filteredCities = processedCities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      city.desc.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      city.keyStreams.toLowerCase().includes(searchQuery.toLowerCase().trim());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'capitals') return city.isCapital && matchesSearch;
    return city.tier === activeTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-[#0f71cd]/20">
      <Navbar lightTextBeforeScroll={true} />

      {/* Hero Banner Header */}
      <section className="relative pt-24 pb-16 bg-[#0F141E] text-white overflow-hidden text-left">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(15,113,205,0.12),transparent_50%)]"></div>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgba(106,255,217,0.08),transparent_50%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              {/* Breadcrumbs */}
              <div className="flex items-center text-xs text-slate-400 gap-2 mb-4 font-bold uppercase tracking-wider">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={12} className="text-slate-600" />
                <span className="text-[#0f71cd] font-bold">Study Destinations</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                Indian Study Destinations
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium max-w-xl leading-relaxed">
                Explore educational hubs across India. Search by city name and find campus directories, placement packages, and recruitment statistics.
              </p>
            </div>
            
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 bg-white/10 rounded-xl hover:bg-white/15 transition-all w-fit border border-white/10 shrink-0 shadow-sm font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              <ArrowLeft size={14} /> Back to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Toolbar: Tabs & Search Input */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        <div className="bg-white border border-slate-200 rounded-none p-5 shadow-xs flex flex-col lg:flex-row gap-5 items-center justify-between">
          
          {/* Tabs Filter */}
          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4.5 py-2 text-xs font-extrabold rounded-none border transition-all cursor-pointer font-tt-talent ${
                  activeTab === tab.id
                    ? 'bg-[#0f71cd] text-white border-[#0f71cd] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100/50 hover:text-slate-900'
                }`}
                style={{ fontFamily: '"TT Talent", sans-serif' }}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-72 flex items-center bg-slate-50 border border-slate-200 focus-within:border-[#0f71cd] rounded-none px-3 py-2 group transition-all shadow-3xs">
            <Search size={15} className="text-slate-400 group-focus-within:text-[#0f71cd] transition-colors shrink-0 mr-2" />
            <input 
              type="text" 
              placeholder="Search by name, stream..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 font-semibold outline-none"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[9px] font-bold text-slate-400 hover:text-slate-600 px-1 py-0.5 rounded-none hover:bg-slate-200/50 transition-all cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Grid listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-left">
        {filteredCities.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-none p-16 text-center shadow-xs">
            <MapPin size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 font-tt-talent" style={{ fontFamily: '"TT Talent", sans-serif' }}>No destinations match your search</h3>
            <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto font-medium">
              Try typing a different city name, or clear the search query to browse all regions.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
              className="mt-5 px-5 py-2.5 bg-[#0f71cd] hover:bg-[#0c62b2] text-white font-bold text-xs rounded-none shadow-sm transition-all cursor-pointer font-tt-talent"
              style={{ fontFamily: '"TT Talent", sans-serif' }}
            >
              Reset Search & Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredCities.map((city) => (
                <motion.div
                  key={city.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(`/cities/${city.id}`)}
                  className="bg-white border border-slate-200 rounded-none p-3 flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer group text-left"
                >
                  <div>
                    {/* City Image */}
                    <div className="w-full h-36 rounded-none overflow-hidden relative mb-3 bg-slate-50 shrink-0">
                      <img 
                        src={city.image} 
                        alt={city.name} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-550 ease-out"
                      />
                      <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-none bg-[#0f71cd]/95 text-white text-[8px] font-extrabold uppercase tracking-widest border border-white/10 shadow-sm">
                        {city.tier === 'tier1' ? 'Tier 1' : city.tier === 'tier2' ? 'Tier 2' : city.tier === 'tier3' ? 'Tier 3' : 'Tier 4'}
                      </span>
                      {city.isCapital && (
                        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-none bg-[#0f71cd] text-white text-[8px] font-black uppercase tracking-widest border border-white/10 shadow-sm">
                          Capital
                        </span>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="px-1.5 space-y-2">
                      <h3 className="font-tt-talent font-bold text-base text-[#0F141E] tracking-tight group-hover:text-[#0f71cd] transition-colors leading-none" style={{ fontFamily: '"TT Talent", sans-serif' }}>
                        {city.name}
                      </h3>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed line-clamp-2">
                        {city.desc}
                      </p>

                      {/* Stat Metrics Row */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-2 py-0.5 rounded-none bg-slate-50 border border-slate-200/60 text-[9px] font-bold text-slate-500 flex items-center gap-1 shadow-3xs">
                          <Building size={11} className="text-[#0f71cd]" />
                          {city.colleges}
                        </span>
                        <span className="px-2 py-0.5 rounded-none bg-indigo-50/40 border border-indigo-100/50 text-[9px] font-bold text-indigo-700 flex items-center gap-1 shadow-3xs">
                          <span className="font-extrabold text-[7px] uppercase">Avg CTC:</span>
                          ₹{city.avgPackage}
                        </span>
                      </div>

                      {/* Popular Fields */}
                      <div className="pt-2 text-left">
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">Core Streams</span>
                        <span className="text-slate-600 text-xs font-medium truncate block mt-0.5">{city.keyStreams}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="pt-3 px-1.5 mt-3 border-t border-slate-100 flex items-center justify-between text-slate-400 group-hover:text-[#0f71cd] transition-all duration-200">
                    <span className="text-[9px] font-black uppercase tracking-wider">Explore Colleges</span>
                    <ChevronRight size={12} className="text-slate-400 group-hover:text-[#0f71cd] group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
