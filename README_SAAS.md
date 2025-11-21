# PromptCraft SaaS - Complete Architecture

## 🎯 Overview

PromptCraft is now a full-featured SaaS platform for AI prompt management, offering template libraries, prompt analysis, and collaboration features with subscription-based access.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  - Vite + React 19 + TailwindCSS                        │
│  - JWT Authentication                                    │
│  - Real-time prompt analysis                            │
└─────────────────────────────────────────────────────────┘
                           ↓ REST API
┌─────────────────────────────────────────────────────────┐
│              Backend (Spring Boot 3.2)                   │
│  - Authentication Service (JWT)                          │
│  - Template Service                                      │
│  - User Service                                          │
│  - Analytics Service                                     │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              Database (PostgreSQL 15)                    │
│  - Users, Templates, Favorites, History                 │
│  - Usage Statistics, Subscriptions                      │
└─────────────────────────────────────────────────────────┘
```

## 📦 Project Structure

```
PromptCraft/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/promptcraft/
│   │   ├── model/             # JPA Entities
│   │   ├── repository/        # Data Access Layer
│   │   ├── service/           # Business Logic
│   │   ├── controller/        # REST Controllers
│   │   ├── security/          # JWT & Security Config
│   │   ├── config/            # App Configuration
│   │   └── dto/               # Data Transfer Objects
│   ├── src/main/resources/
│   │   ├── application.yml    # Main config
│   │   └── db/migration/      # Flyway migrations
│   ├── pom.xml
│   └── Dockerfile
├── src/                       # React Frontend
│   ├── components/            # UI Components
│   │   ├── AuthModal.jsx     # Login/Signup
│   │   ├── UserMenu.jsx      # User dropdown
│   │   └── ...
│   ├── services/              # API Services
│   │   ├── api.js            # Axios config
│   │   ├── authService.js    # Auth API
│   │   └── templateService.js # Template API
│   └── ...
├── docker-compose.yml         # Docker orchestration
├── Dockerfile.frontend        # Frontend container
└── nginx.conf                 # Nginx reverse proxy
```

## 🚀 Quick Start

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 15+ (or use Docker)
- Maven 3.9+

### Option 1: Docker (Recommended)

```powershell
# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# Database: localhost:5432
```

### Option 2: Local Development

#### 1. Start PostgreSQL

```powershell
# Using Docker
docker run -d `
  --name promptcraft-db `
  -e POSTGRES_DB=promptcraft `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -p 5432:5432 `
  postgres:15-alpine
```

#### 2. Start Backend

```powershell
cd backend

# Install dependencies and run
mvn clean install
mvn spring-boot:run

# Or build and run JAR
mvn clean package
java -jar target/promptcraft-backend-1.0.0.jar
```

Backend will start on `http://localhost:8080`

#### 3. Start Frontend

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will start on `http://localhost:5173`

## 🔑 Environment Variables

### Backend (.env or application.yml)

```yaml
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=promptcraft
DB_USERNAME=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your-super-secret-key-min-256-bits
JWT_EXPIRATION=86400000  # 24 hours
JWT_REFRESH_EXPIRATION=604800000  # 7 days

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Server
SERVER_PORT=8080
```

### Frontend (.env.local)

```bash
VITE_API_URL=http://localhost:8080/api
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "userId": 1,
  "email": "user@example.com",
  "role": "USER",
  "subscriptionTier": "FREE"
}
```

#### POST `/api/auth/login`
Login existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Template Endpoints

#### GET `/api/templates/public`
Get all public templates (paginated).

**Query Params:**
- `page` (default: 0)
- `size` (default: 20)
- `sortBy` (default: createdAt)
- `sortDir` (default: DESC)

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "title": "Ethereum Developer",
      "content": "Imagine you are...",
      "category": "DEVELOPMENT",
      "forDevs": true,
      "isPublic": true,
      "isOfficial": true,
      "usageCount": 150,
      "favoriteCount": 45,
      "isFavorited": false,
      "createdAt": "2024-01-01T00:00:00"
    }
  ],
  "totalPages": 5,
  "totalElements": 100,
  "size": 20,
  "number": 0
}
```

#### GET `/api/templates/public/search?query={searchTerm}`
Search templates.

#### GET `/api/templates/public/category/{category}`
Filter by category: `DEVELOPMENT`, `GENERAL`, `BUSINESS`, `CREATIVE`, `EDUCATION`, `LANGUAGE`, `ENTERTAINMENT`, `PRODUCTIVITY`, `OTHER`

#### GET `/api/templates/public/forDevs/{true|false}`
Filter by developer-focused templates.

#### POST `/api/templates` (Authenticated)
Create a new template.

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request:**
```json
{
  "title": "My Custom Template",
  "content": "Template content here...",
  "description": "Optional description",
  "category": "DEVELOPMENT",
  "forDevs": true,
  "isPublic": false
}
```

#### PUT `/api/templates/{id}` (Authenticated)
Update your template.

#### DELETE `/api/templates/{id}` (Authenticated)
Delete your template.

#### POST `/api/templates/{id}/use`
Increment usage count (analytics).

## 🔐 Security

- JWT-based authentication
- BCrypt password hashing
- CORS configuration
- Role-based access control (USER, ADMIN, ENTERPRISE)
- Secure password requirements (min 6 characters)

## 💎 Subscription Tiers

### Free Tier
- 10 templates per day
- 100 templates per month
- Basic templates access
- Basic analysis

### Pro Tier ($9.99/month)
- Unlimited templates
- Advanced AI analysis
- Custom templates
- Priority support
- No ads

### Enterprise Tier ($49.99/month)
- Everything in Pro
- API access
- White-label option
- Dedicated support
- Team collaboration
- Advanced analytics

## 📊 Database Schema

### Users Table
- id (BIGSERIAL PRIMARY KEY)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- first_name, last_name
- role (USER, ADMIN, ENTERPRISE)
- subscription_tier (FREE, PRO, ENTERPRISE)
- active, email_verified (BOOLEAN)
- subscription dates
- created_at, updated_at

### Templates Table
- id (BIGSERIAL PRIMARY KEY)
- title, content, description
- category (ENUM)
- for_devs, is_public, is_official (BOOLEAN)
- usage_count, favorite_count (INTEGER)
- user_id (FOREIGN KEY)
- created_at, updated_at

### Favorites, History, Usage Stats
- Linked to users via foreign keys
- Track user interactions and analytics

## 🧪 Testing

### Backend Tests
```powershell
cd backend
mvn test
```

### Frontend Tests
```powershell
npm test
```

## 🚢 Deployment

### Production Build

#### Backend
```powershell
cd backend
mvn clean package -DskipTests
```

#### Frontend
```powershell
npm run build
```

### Docker Production
```powershell
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Deployment Options

1. **AWS**: EC2 + RDS PostgreSQL + S3
2. **Azure**: App Service + Azure Database for PostgreSQL
3. **Google Cloud**: Cloud Run + Cloud SQL
4. **Heroku**: Heroku Postgres + Heroku Dynos
5. **DigitalOcean**: Droplets + Managed PostgreSQL

## 🔧 Development Tips

### Hot Reload
- Frontend: Vite HMR enabled by default
- Backend: Spring Boot DevTools (add to pom.xml)

### Database Migrations
```powershell
# Flyway automatically runs migrations on startup
# Add new migrations: src/main/resources/db/migration/V{version}__Description.sql
```

### Adding New Endpoints
1. Create DTO in `/dto`
2. Add service method in `/service`
3. Create controller endpoint in `/controller`
4. Update frontend service in `/src/services`

## 📝 Next Steps

### Immediate TODOs
1. ✅ Backend infrastructure
2. ✅ Authentication system
3. ✅ Template service
4. ✅ Database migrations
5. ✅ Frontend integration
6. ⏳ User profile management
7. ⏳ Favorites & History sync
8. ⏳ Usage tracking & quotas
9. ⏳ Subscription management (Stripe)
10. ⏳ Admin dashboard
11. ⏳ Email verification
12. ⏳ API rate limiting
13. ⏳ Monitoring & logging

### Future Features
- Real-time collaboration
- Template marketplace
- AI-powered recommendations
- Mobile app (React Native)
- VS Code extension
- Chrome extension
- Webhooks & integrations
- Team workspaces
- Advanced analytics dashboard

## 🆘 Support

For issues or questions:
1. Check documentation
2. Review API logs: `docker logs promptcraft-backend`
3. Check database: `docker exec -it promptcraft-db psql -U postgres -d promptcraft`

## 📄 License

[Your License Here]

---

**Built with ❤️ for the AI community**
