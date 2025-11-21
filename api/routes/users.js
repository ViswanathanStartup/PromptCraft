import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/users/me - Get current user profile
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, email, first_name, last_name, role, subscription_tier, 
              email_verified, subscription_start_date, subscription_end_date, created_at
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me/favorites - Get user's favorites
router.get('/me/favorites', authenticateToken, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT t.*, f.created_at as favorited_at
       FROM favorites f
       JOIN templates t ON f.template_id = t.id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [req.user.id]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me/history - Get user's prompt history
router.get('/me/history', authenticateToken, async (req, res, next) => {
  try {
    const result = await query(
      `SELECT * FROM history
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [req.user.id]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/me/history - Save prompt to history
router.post('/me/history', authenticateToken, async (req, res, next) => {
  try {
    const { prompt, analysis } = req.body;

    const result = await query(
      `INSERT INTO history (user_id, prompt_text, analysis_result)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [req.user.id, prompt, JSON.stringify(analysis)]
    );

    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

export default router;
