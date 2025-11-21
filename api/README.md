# PromptCraft API

Node.js/Express backend for PromptCraft with PostgreSQL.

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Setup database:**
```bash
# Create PostgreSQL database
createdb promptcraft

# Run migrations
npm run migrate
```

4. **Start development server:**
```bash
npm run dev
```

## Environment Variables

```env
PORT=8080
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/promptcraft
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Templates
- `GET /api/templates/public` - Get all public templates
- `GET /api/templates/public/search?query=` - Search templates
- `GET /api/templates/:id` - Get template by ID
- `POST /api/templates` - Create template (auth required)
- `POST /api/templates/:id/favorite` - Toggle favorite (auth required)

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users/me/favorites` - Get user favorites
- `GET /api/users/me/history` - Get prompt history
- `POST /api/users/me/history` - Save prompt to history

## Deployment to Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Set environment variables in Vercel dashboard**

## Database Schema

- **users** - User accounts and authentication
- **templates** - Prompt templates
- **favorites** - User favorites
- **history** - Prompt analysis history
- **usage_stats** - Usage tracking
