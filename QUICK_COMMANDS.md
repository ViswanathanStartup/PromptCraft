# 🚀 Quick Start Commands

## Choose Your Path:

### 🐳 Option 1: Docker (Recommended - Everything Automated)

```powershell
# Start all services (PostgreSQL, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

**Access Points:**
- 🌐 Frontend: http://localhost:3000
- ⚙️ Backend API: http://localhost:8080
- 🗄️ Database: localhost:5432 (postgres/postgres)

---

### 💻 Option 2: Local Development

#### Terminal 1️⃣ - Database
```powershell
docker run -d `
  --name promptcraft-db `
  -e POSTGRES_DB=promptcraft `
  -e POSTGRES_USER=postgres `
  -e POSTGRES_PASSWORD=postgres `
  -p 5432:5432 `
  postgres:15-alpine
```

#### Terminal 2️⃣ - Backend
```powershell
cd backend
mvn clean install
mvn spring-boot:run
```
Backend runs on: http://localhost:8080

#### Terminal 3️⃣ - Frontend
```powershell
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

---

## 🧪 Testing Commands

### Test Backend API
```powershell
# Health check
curl http://localhost:8080/api/templates/public

# Signup
curl -X POST http://localhost:8080/api/auth/signup `
  -H "Content-Type: application/json" `
  -d '{"email":"test@test.com","password":"test123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@test.com","password":"test123"}'
```

### Test Database
```powershell
# Connect to PostgreSQL
docker exec -it promptcraft-db psql -U postgres -d promptcraft

# Inside psql:
\dt                          # List tables
SELECT * FROM users;         # View users
SELECT * FROM templates;     # View templates
\q                          # Exit
```

---

## 🛠️ Development Commands

### Backend
```powershell
# Build
cd backend
mvn clean package

# Run tests
mvn test

# Skip tests
mvn clean install -DskipTests

# Clean build
mvn clean install -U
```

### Frontend
```powershell
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🗄️ Database Commands

### Backup Database
```powershell
docker exec promptcraft-db pg_dump -U postgres promptcraft > backup.sql
```

### Restore Database
```powershell
docker exec -i promptcraft-db psql -U postgres promptcraft < backup.sql
```

### Reset Database
```powershell
docker exec -it promptcraft-db psql -U postgres -c "DROP DATABASE promptcraft;"
docker exec -it promptcraft-db psql -U postgres -c "CREATE DATABASE promptcraft;"
docker restart promptcraft-backend  # Flyway will recreate schema
```

---

## 🐛 Troubleshooting Commands

### View Logs
```powershell
# Backend logs
docker logs promptcraft-backend -f

# Database logs
docker logs promptcraft-db -f

# Frontend logs (if using Docker)
docker logs promptcraft-frontend -f

# All services
docker-compose logs -f
```

### Check Running Services
```powershell
# Docker containers
docker ps

# Ports in use
netstat -ano | findstr :8080
netstat -ano | findstr :5432
netstat -ano | findstr :5173
```

### Restart Services
```powershell
# Restart backend only
docker restart promptcraft-backend

# Restart database only
docker restart promptcraft-db

# Restart all
docker-compose restart
```

### Clean Up
```powershell
# Remove containers
docker-compose down

# Remove containers and volumes (⚠️ deletes database data)
docker-compose down -v

# Remove everything including images
docker-compose down -v --rmi all
```

---

## 📦 Deployment Commands

### Production Build

#### Backend JAR
```powershell
cd backend
mvn clean package -DskipTests
# JAR file: target/promptcraft-backend-1.0.0.jar
```

#### Frontend Build
```powershell
npm run build
# Static files: dist/
```

### Docker Production
```powershell
# Build images
docker-compose build

# Run in production mode
docker-compose -f docker-compose.yml up -d
```

---

## 🔍 Useful Inspection Commands

### Check Backend Health
```powershell
curl http://localhost:8080/api/templates/public
```

### Check Database Connection
```powershell
docker exec -it promptcraft-db psql -U postgres -d promptcraft -c "SELECT count(*) FROM templates;"
```

### View Environment Variables
```powershell
# Backend
docker exec promptcraft-backend env | findstr SPRING

# Database
docker exec promptcraft-db env | findstr POSTGRES
```

---

## 🎯 First Time Setup

Run these commands in order:

```powershell
# 1. Install Node dependencies
npm install

# 2. Start Docker services
docker-compose up -d

# 3. Wait 30 seconds for services to start

# 4. Test the API
curl http://localhost:8080/api/templates/public

# 5. Open browser
start http://localhost:3000

# 6. Create an account and start using!
```

---

## 📊 Monitoring

### Check Service Status
```powershell
docker-compose ps
```

### View Resource Usage
```powershell
docker stats
```

### Database Statistics
```powershell
docker exec -it promptcraft-db psql -U postgres -d promptcraft -c "
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
"
```

---

## 🎉 Quick Win Test

After starting everything:

```powershell
# 1. Signup a user
curl -X POST http://localhost:8080/api/auth/signup -H "Content-Type: application/json" -d '{"email":"demo@promptcraft.com","password":"demo123","firstName":"Demo","lastName":"User"}'

# 2. Get all templates
curl http://localhost:8080/api/templates/public

# Success! 🎉
```

---

## 💡 Pro Tips

1. **Use Docker for database** even in local dev - easier than installing PostgreSQL
2. **Keep terminals separate** - easier to see logs
3. **Use `.env.local`** for local config (already created)
4. **Check logs first** when troubleshooting
5. **Backup data** before major changes

---

## 📞 Need Help?

1. Check logs: `docker-compose logs -f`
2. Verify services: `docker-compose ps`
3. Test connectivity: `curl http://localhost:8080/api/templates/public`
4. Check documentation: `README_SAAS.md`

---

**Happy Coding! 🚀**
