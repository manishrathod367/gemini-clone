// const express = require('express');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const rateLimit = require('express-rate-limit');

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
//import { authenticateToken } from './middleware/auth.js';
//import { rateLimiter } from './middleware/rateLimit.js';
import { runGemini } from './gemini.js';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_secret_key'; // Replace with env variable in production

app.use(cors());
app.use(express.json());

// In-memory user store
const users = [];

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rate Limiter (5 requests/minute per IP)
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: 'Too many requests, please try again later.',
});

// Signup Route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(409).json({ message: 'User already exists' });

  users.push({ email, password });
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected Chat Route
app.post('/chat', authenticateToken, rateLimiter, async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await runGemini(prompt); // secure Gemini call on server
    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: 'Error generating response' });
  }
});

// app.post('/chat', authenticateToken, chatLimiter, async (req, res) => {
//   const { prompt } = req.body;

//   // You can connect to Gemini API here if needed
//   const mockResponse = `This is a fake Gemini response for: ${prompt}`;
//   res.json({ response: mockResponse });
// });

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
