require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

const data = require('./data');

// Load default page size from environment or fallback to 10
const DEFAULT_PAGE_SIZE = parseInt(process.env.DEFAULT_PAGE_SIZE) || 10;

// Middleware: API key authentication
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
  }
  next();
});

// Utility: Encode token (offset + HMAC) to base64
const encodeToken = (offset) => {
  const payload = `${offset}`;
  const hmac = crypto
    .createHmac('sha256', process.env.TOKEN_SECRET)
    .update(payload)
    .digest('hex');
  return Buffer.from(`${payload}.${hmac}`).toString('base64');
};

// Utility: Decode and verify token
const decodeToken = (token) => {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [payload, hmac] = decoded.split('.');
    const validHmac = crypto
      .createHmac('sha256', process.env.TOKEN_SECRET)
      .update(payload)
      .digest('hex');

    if (hmac !== validHmac) throw new Error('Invalid HMAC');
    return parseInt(payload);
  } catch (err) {
    return null; // Invalid or tampered token
  }
};

// GET /items with secure token-based pagination
app.get('/items', (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || DEFAULT_PAGE_SIZE;
  const pageToken = req.query.pageToken;

  const offset = pageToken ? decodeToken(pageToken) : 0;

  if (offset === null || isNaN(offset) || offset < 0) {
    return res.status(400).json({ error: 'Invalid or tampered page token' });
  }

  const start = offset;
  const end = start + pageSize;
  const items = data.slice(start, end);

  const nextOffset = end < data.length ? end : null;
  const prevOffset = offset - pageSize >= 0 ? offset - pageSize : null;

  const nextPageToken = nextOffset !== null ? encodeToken(nextOffset) : null;
  const previousPageToken = prevOffset !== null ? encodeToken(prevOffset) : null;

  const currentPage = Math.floor(offset / pageSize) + 1;

  res.json({
    total: data.length,
    currentOffset: offset,
    currentPage,
    pageSize,
    nextPageToken,
    previousPageToken,
    items
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
