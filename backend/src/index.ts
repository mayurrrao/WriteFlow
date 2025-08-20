import { Hono } from 'hono';
import { userRoutes } from './routes/user';
import { blogRoutes } from './routes/blog';
import { cors } from 'hono/cors';

const app = new Hono();

// Enable CORS for all routes
app.use('/*', cors());

// Root route
app.get('/', (c) => {
  return c.json({ 
    message: 'WriteFlow API is running!',
    version: '1.0.0',
    endpoints: {
      users: '/api/v1/user',
      blogs: '/api/v1/blog'
    }
  });
});

// Health check route
app.get('/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Mount user-related routes under /api/v1/user
app.route('/api/v1/user', userRoutes);

// Mount blog-related routes under /api/v1/blog
app.route('/api/v1/blog', blogRoutes);

export default app;