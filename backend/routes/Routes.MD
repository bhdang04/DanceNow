```
## Quick API Endpoint Reference

### Auth Routes (`/api/auth`)
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user (protected)
GET    /api/auth/me            - Get current user info (protected)
PUT    /api/auth/profile       - Update user profile (protected)
```

### **Progress Routes** (`/api/progress`)
```
GET    /api/progress                    - Get all user progress (protected)
GET    /api/progress/stats              - Get progress stats (protected)
POST   /api/progress/complete/:skillId  - Mark skill complete (protected)
POST   /api/progress/incomplete/:skillId- Mark skill incomplete (protected)
PUT    /api/progress/:skillId           - Update progress/notes (protected)
DELETE /api/progress/:skillId           - Delete progress (protected)
```

### **Skills Routes** (`/api/skills`)
```
GET    /api/skills                      - Get all skills
GET    /api/skills/categories           - Get all categories
GET    /api/skills/category/:categoryId - Get skills by category
GET    /api/skills/:skillId             - Get specific skill
POST   /api/skills                      - Create skill (protected)
PUT    /api/skills/:skillId             - Update skill (protected)
DELETE /api/skills/:skillId             - Delete skill (protected)
POST   /api/skills/seed                 - Seed initial data
