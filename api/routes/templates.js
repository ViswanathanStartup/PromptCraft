import express from 'express';
import { body, query as validateQuery, validationResult } from 'express-validator';
import { query } from '../config/database.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// GET /api/templates/public - Get all public templates
router.get('/public', optionalAuth, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const sortBy = req.query.sortBy || 'created_at';
    const sortDir = req.query.sortDir || 'DESC';
    const offset = page * size;

    const userId = req.user?.id;

    const sqlQuery = `
      SELECT 
        t.*,
        CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END as is_favorited
      FROM templates t
      LEFT JOIN favorites f ON t.id = f.template_id AND f.user_id = $1
      WHERE t.is_public = true
      ORDER BY ${sortBy} ${sortDir}
      LIMIT $2 OFFSET $3
    `;

    const result = await query(sqlQuery, [userId, size, offset]);
    const countResult = await query('SELECT COUNT(*) FROM templates WHERE is_public = true');

    res.json({
      success: true,
      content: result.rows,
      totalElements: parseInt(countResult.rows[0].count),
      totalPages: Math.ceil(countResult.rows[0].count / size),
      number: page,
      size: size
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/templates/public/search - Search templates
router.get('/public/search', optionalAuth, async (req, res, next) => {
  try {
    const searchQuery = req.query.query || '';
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;
    const userId = req.user?.id;

    const sqlQuery = `
      SELECT 
        t.*,
        CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END as is_favorited
      FROM templates t
      LEFT JOIN favorites f ON t.id = f.template_id AND f.user_id = $1
      WHERE t.is_public = true 
        AND (t.title ILIKE $2 OR t.content ILIKE $2 OR t.description ILIKE $2)
      ORDER BY t.created_at DESC
      LIMIT $3 OFFSET $4
    `;

    const result = await query(sqlQuery, [userId, `%${searchQuery}%`, size, offset]);

    const countQuery = `
      SELECT COUNT(*) FROM templates 
      WHERE is_public = true 
        AND (title ILIKE $1 OR content ILIKE $1 OR description ILIKE $1)
    `;
    const countResult = await query(countQuery, [`%${searchQuery}%`]);

    res.json({
      success: true,
      content: result.rows,
      totalElements: parseInt(countResult.rows[0].count),
      totalPages: Math.ceil(countResult.rows[0].count / size),
      number: page,
      size: size
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/templates/public/category/:category
router.get('/public/category/:category', optionalAuth, async (req, res, next) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 20;
    const offset = page * size;
    const userId = req.user?.id;

    const sqlQuery = `
      SELECT 
        t.*,
        CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END as is_favorited
      FROM templates t
      LEFT JOIN favorites f ON t.id = f.template_id AND f.user_id = $1
      WHERE t.is_public = true AND t.category = $2
      ORDER BY t.created_at DESC
      LIMIT $3 OFFSET $4
    `;

    const result = await query(sqlQuery, [userId, category, size, offset]);
    const countResult = await query(
      'SELECT COUNT(*) FROM templates WHERE is_public = true AND category = $1',
      [category]
    );

    res.json({
      success: true,
      content: result.rows,
      totalElements: parseInt(countResult.rows[0].count),
      totalPages: Math.ceil(countResult.rows[0].count / size),
      number: page,
      size: size
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/templates/:id
router.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const sqlQuery = `
      SELECT 
        t.*,
        CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END as is_favorited
      FROM templates t
      LEFT JOIN favorites f ON t.id = f.template_id AND f.user_id = $1
      WHERE t.id = $2
    `;

    const result = await query(sqlQuery, [userId, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    // Increment usage count
    await query('UPDATE templates SET usage_count = usage_count + 1 WHERE id = $1', [id]);

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// POST /api/templates - Create template (authenticated)
router.post('/', 
  authenticateToken,
  [
    body('title').trim().isLength({ min: 1, max: 200 }),
    body('content').trim().isLength({ min: 1 }),
    body('description').optional().trim().isLength({ max: 500 }),
    body('category').isIn(['WRITING', 'CODING', 'BUSINESS', 'EDUCATION', 'CREATIVE', 'DATA', 'OTHER']),
    body('forDevs').optional().isBoolean()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      const { title, content, description, category, forDevs } = req.body;
      const userId = req.user.id;

      const result = await query(
        `INSERT INTO templates (title, content, description, category, for_devs, user_id, is_public, is_official)
         VALUES ($1, $2, $3, $4, $5, $6, false, false)
         RETURNING *`,
        [title, content, description || null, category, forDevs || false, userId]
      );

      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/templates/:id/favorite - Toggle favorite
router.post('/:id/favorite', authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if already favorited
    const existing = await query(
      'SELECT id FROM favorites WHERE user_id = $1 AND template_id = $2',
      [userId, id]
    );

    if (existing.rows.length > 0) {
      // Remove favorite
      await query('DELETE FROM favorites WHERE user_id = $1 AND template_id = $2', [userId, id]);
      await query('UPDATE templates SET favorite_count = favorite_count - 1 WHERE id = $1', [id]);
      res.json({ success: true, favorited: false });
    } else {
      // Add favorite
      await query(
        'INSERT INTO favorites (user_id, template_id) VALUES ($1, $2)',
        [userId, id]
      );
      await query('UPDATE templates SET favorite_count = favorite_count + 1 WHERE id = $1', [id]);
      res.json({ success: true, favorited: true });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
