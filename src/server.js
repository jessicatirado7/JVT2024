import express from 'express';
import compression from 'compression';
import path from 'path';
import expressStaticGzip from 'express-static-gzip';

const app = express();

// ✅ 1. Enable CORS for specific origins
app.use((req, res, next) => {
  const allowedOrigins = ['https://jvtdesignstudios.com',  'http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Security-Policy", "frame-ancestors 'self' https://www.google.com;"); 

  next();
});

// ✅ 2. Handle OPTIONS preflight requests (important for CORS)
app.options('/api/data', (req, res) => {
  const allowedOrigins = ['https://jvtdesignstudios.com',  'http://localhost:3000'];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send();
});

// ✅ 3. Compression middleware (gzip/brotli for performance)
app.use(compression({ level: 6 }));

// ✅ 4. Serve static files with express-static-gzip (better for compressed assets)
const DIST_DIR = path.join(process.cwd(), 'dist');

app.use(expressStaticGzip(DIST_DIR, {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
}));

// Serve CSS separately if needed
app.use(express.static(path.join(process.cwd(), 'css')));

// ✅ 5. Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from EC2 backend!" });
});

// ✅ 6. Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});