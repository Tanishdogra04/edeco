const express = require('express');
const router = express.Router();
const College = require('../models/College');
const { protect, admin } = require('../middleware/auth');

// Helper to parse fees string to a numeric value in Lakhs
const parseFeesNumeric = (feeStr) => {
  if (!feeStr) return 0;
  // Clean string
  const clean = feeStr.replace(/[^0-9.,]/g, '');
  if (feeStr.includes('Lakh') || feeStr.includes('L/yr')) {
    return parseFloat(clean) || 0;
  }
  // If it's a small number like 1,628 / Yr, convert to Lakhs
  const val = parseFloat(clean.replace(',', '')) || 0;
  if (val > 100) {
    return val / 100000; // convert to lakhs
  }
  return val;
};

// Helper to parse packages string to a numeric value in LPA
const parseLPANumeric = (pkgStr) => {
  if (!pkgStr) return 0;
  if (pkgStr.includes('Crore')) {
    const val = parseFloat(pkgStr.replace(/[^0-9.,]/g, '')) || 0;
    return val * 100; // 1 Crore = 100 LPA
  }
  const val = parseFloat(pkgStr.replace(/[^0-9.,]/g, '')) || 0;
  return val;
};

// @desc    Get all colleges with filters, searches, and sorting
// @route   GET /api/colleges
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { stream, city, type, fee, search, sortBy } = req.query;
    let query = {};

    // 1. Filter by Stream
    if (stream) {
      query.stream = { $regex: new RegExp('^' + stream + '$', 'i') };
    }

    // 2. Filter by City
    if (city) {
      query.location = { $regex: new RegExp(city, 'i') };
    }

    // 3. Search query
    if (search) {
      query.$or = [
        { name: { $regex: new RegExp(search, 'i') } },
        { stream: { $regex: new RegExp(search, 'i') } },
        { location: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } }
      ];
    }

    // Fetch all colleges matching the base criteria
    let colleges = await College.find(query).lean();

    // 4. Filter by Type (Private vs Public/Government)
    if (type) {
      const typeList = Array.isArray(type) ? type : [type];
      colleges = colleges.filter(college => {
        return typeList.some(t => {
          const check = t.toLowerCase();
          return (
            college.ownership.toLowerCase().includes(check) ||
            college.facilities.some(f => f.name.toLowerCase().includes(check)) ||
            (college.approvals && college.approvals.some(a => a.toLowerCase().includes(check)))
          );
        });
      });
    }

    // 5. Filter by Fee Range
    if (fee) {
      const feeRanges = Array.isArray(fee) ? fee : [fee];
      colleges = colleges.filter(college => {
        const feeNum = parseFeesNumeric(college.fees);
        return feeRanges.some(range => {
          if (range === '< 1 Lakh') return feeNum < 1;
          if (range === '1 - 2 Lakhs') return feeNum >= 1 && feeNum <= 2;
          if (range === '2 - 5 Lakhs') return feeNum > 2 && feeNum <= 5;
          if (range === '> 5 Lakhs') return feeNum > 5;
          return false;
        });
      });
    }

    // 6. Sorting
    if (sortBy) {
      if (sortBy === 'Highest Package') {
        colleges.sort((a, b) => {
          const pkgA = parseLPANumeric(a.highestPackage || a.stats.highestPackage);
          const pkgB = parseLPANumeric(b.highestPackage || b.stats.highestPackage);
          return pkgB - pkgA; // Descending
        });
      } else if (sortBy === 'Top Rated') {
        colleges.sort((a, b) => {
          // NIRF rank sorting (lower is better, e.g. #1 is better than #100)
          const parseNIRF = (nirfStr) => {
            if (!nirfStr) return 9999;
            const num = parseInt(nirfStr.replace(/[^0-9]/g, ''));
            return isNaN(num) ? 9999 : num;
          };
          return parseNIRF(a.nirf) - parseNIRF(b.nirf); // Ascending (lower rank first)
        });
      } else if (sortBy === 'Fees Low to High') {
        colleges.sort((a, b) => {
          return parseFeesNumeric(a.fees) - parseFeesNumeric(b.fees); // Ascending
        });
      }
    }

    res.json({
      success: true,
      count: colleges.length,
      colleges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get a single college profile by ID
// @route   GET /api/colleges/:id
// @access  Public
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const college = await College.findOneAndUpdate(
      { id: id.toLowerCase() },
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!college) {
      return res.status(404).json({
        success: false,
        error: `College with ID ${id} not found`
      });
    }

    res.json({
      success: true,
      college
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Create a new college
// @route   POST /api/colleges
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  const {
    name,
    logo,
    stream,
    image,
    location,
    rating,
    fees,
    nirf,
    package,
    highestPackage,
    reviews,
    description,
    ownership,
    approvals,
    stats,
    about,
    whyChoose,
    courses,
    recruitersList,
    facilities,
    reviewsList,
    faqs
  } = req.body;

  try {
    if (!name || !location) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least a college name and location'
      });
    }

    // Generate unique ID from name (e.g. "Birla Institute" -> "birla-institute")
    let baseId = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    
    // Check if ID already exists, if so append unique suffix
    let uniqueId = baseId;
    let count = 1;
    while (await College.findOne({ id: uniqueId }).lean()) {
      uniqueId = `${baseId}-${count}`;
      count++;
    }

    const college = await College.create({
      id: uniqueId,
      name,
      logo: logo || name.split(' ').map(w => w.charAt(0)).join('').toUpperCase(),
      stream: stream || 'Engineering',
      image: image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
      location,
      rating: rating || '4.5',
      fees: fees || '',
      nirf: nirf || '',
      package: package || '',
      highestPackage: highestPackage || '',
      reviews: reviews || '0 Reviews',
      description: description || '',
      ownership: ownership || 'Public',
      approvals: approvals || [],
      stats: stats || {
        avgFees: fees || '₹1.5 Lakhs/yr',
        placementRate: '95%',
        avgPackage: package || '₹6.5 LPA',
        highestPackage: highestPackage || '₹12.0 LPA',
        facultyRating: '4.5/5',
        infrastructure: '4.5/5',
        recruiters: '100+'
      },
      about: about || description || '',
      whyChoose: whyChoose || [],
      courses: courses || [],
      recruitersList: recruitersList || [
        { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
        { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' }
      ],
      facilities: facilities || [],
      reviewsList: reviewsList || [],
      faqs: faqs || []
    });

    res.status(201).json({
      success: true,
      message: 'College created successfully',
      college
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// New admin analytics route
router.get('/admin/analytics', protect, admin, async (req, res) => {
  try {
    // Top 5 most visited colleges
    const mostVisited = await College.find({})
      .sort({ views: -1 })
      .limit(5)
      .select('id name views -_id')
      .lean();

    // Total counselling submissions (could be extended per college)
    const counsellingCount = await require('../models/CounsellingRequest').countDocuments();

    res.json({
      success: true,
      mostVisited,
      counsellingCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  const { id } = req.params;
  console.log(`[DELETE COLLEGE] Request received for ID: ${id}`);
  try {
    const mongoose = require('mongoose');
    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { id: id.toLowerCase() };
    }
    
    console.log('[DELETE COLLEGE] Using query:', query);
    const college = await College.findOneAndDelete(query);

    if (!college) {
      console.log(`[DELETE COLLEGE] College not found for ID: ${id}`);
      return res.status(404).json({
        success: false,
        error: `College with ID ${id} not found`
      });
    }

    console.log(`[DELETE COLLEGE] Successfully deleted college: ${college.name}`);
    res.json({
      success: true,
      message: 'College deleted successfully'
    });
  } catch (error) {
    console.error('[DELETE COLLEGE] Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
