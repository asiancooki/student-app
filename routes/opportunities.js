const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const { major, type } = req.query;
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseFloat(req.query.radius);

  console.log('API called with params:', { major, type, lat, lng, radius });
  console.log('SQL query input values:', [major, type, lng, lat, radius]);

  try {
    const results = await pool.query(
      `SELECT * FROM opportunities
       WHERE $1 = ANY(major_tags)
       AND type = $2
       AND ST_DWithin(
         geography(ST_MakePoint(longitude, latitude)),
         geography(ST_MakePoint($3, $4)),
         $5
       )`,
      [major, type, lng, lat, radius]
    );
    res.json(results.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
