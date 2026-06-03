const express = require('express');
const router = express.Router();
const News = require('../models/News');

// @desc    Get all news articles
// @route   GET /api/news
// @access  Public
router.get('/', async (req, res) => {
  try {
    const news = await News.find({});
    res.json({
      success: true,
      count: news.length,
      news
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @desc    Get news article details by ID
// @route   GET /api/news/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const article = await News.findOne({ id: req.params.id.toLowerCase() });

    if (!article) {
      // Find backup default or standard
      const defaultArticle = await News.findOne({});
      return res.json({
        success: true,
        article: defaultArticle
      });
    }

    // Proactively increment views count slightly on fetch
    if (article.views) {
      const val = parseFloat(article.views.replace(/[^0-9.]/g, '')) || 0;
      const isK = article.views.includes('k');
      const suffix = isK ? 'k Views' : ' Views';
      const updatedVal = (val + 0.1).toFixed(1);
      article.views = `${updatedVal}${suffix}`;
      await article.save();
    }

    res.json({
      success: true,
      article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
