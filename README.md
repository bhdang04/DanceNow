# DanceNow
# 🎤 Hip-Hop Dance Learning Platform

> Your personalized roadmap to mastering hip-hop dance from beginner to advanced

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

This full-stack web application provides a structured, personalized learning experience for hip-hop dance students. Unlike generic tutorial sites, our platform adapts to each user's experience level, goals, and time commitment, creating a custom roadmap that guides them from their current level to mastery.

**Key Differentiators:**
- 🎨 **Personalized Learning Paths** - Dynamic roadmaps based on user goals and experience
- 📊 **Progress Tracking** - Mark skills complete and watch your journey unfold
- 🎥 **Comprehensive Curriculum** - Video tutorials, key points, common mistakes, and practice drills
- 📱 **Responsive Design** - Learn on any device, anywhere
- 🔐 **Secure Authentication** - JWT-based auth with password encryption

## ✨ Features

### 🚀 Core Functionality

- **Intelligent Onboarding**
  - 3-question mini quiz for quick personalization
  - Preview mode for unauthenticated users
  - Extended questionnaire for refined recommendations

- **Personalized Roadmaps**
  - 5 core categories: Rhythm & Musicality, Core Grooves, Isolations, Foundation Styles, Freestyle Basics
  - Skill filtering based on experience level
  - Priority categories based on user goals
  - Dynamic recommendations (skills per week, estimated completion time)

- **Comprehensive Skill Library**
  - 24+ skills across all categories
  - Video tutorials embedded in each skill
  - Key points breakdown
  - Common mistakes guidance
  - Practice drills for muscle memory
  - Difficulty ratings (Beginner, Intermediate, Advanced)

- **Progress Tracking**
  - One-click skill completion toggle
  - Real-time progress statistics
  - Milestone system (25%, 50%, 75%, 100%)
  - Visual progress indicators

- **Dual Navigation Modes**
  - Browse all skills from Home page
  - View personalized roadmap after onboarding
  - Seamless skill detail navigation from both contexts

### 🎨 User Experience

- Clean, modern UI with gradient accents
- Mobile-first responsive design
- Smooth animations and transitions
- Intuitive category expansion/collapse
- Color-coded difficulty badges
- Loading states and error handling

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern component-based UI
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Context API** - Global state management
- **Custom Hooks** - Reusable logic (useAuth, useProgress)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing

### Development Tools
- **Vite** - Fast frontend build tool
- **ESLint** - Code linting
- **Nodemon** - Auto-restart development server
- **dotenv** - Environment variable management

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/hiphop-learning-platform.git
cd hiphop-learning-platform
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**

Create `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hiphop-dance
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

5. **Seed the database (optional)**
```bash
cd backend
npm run seed
```

6. **Start the development servers**

Backend (from `backend` directory):
```bash
npm run dev
```

Frontend (from `frontend` directory):
```bash
npm run dev
```

7. **Open your browser**
```
Frontend: http://localhost:5173
Backend API: http://localhost:5000
```

## 📁 Project Structure

```
hiphop-learning-platform/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── personalizationController.js
│   │   ├── progressController.js
│   │   └── skillsController.js
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── errorHandler.js       # Global error handling
│   ├── models/
│   │   ├── User.js
│   │   ├── Personalization.js
│   │   ├── Progress.js
│   │   └── Skill.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── personalization.js
│   │   ├── progress.js
│   │   └── skills.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   └── DifficultyBadge.jsx
│   │   │   ├── onboarding/
│   │   │   │   ├── MiniOnboarding.jsx
│   │   │   │   ├── FullOnboarding.jsx
│   │   │   │   └── RoadmapPreview.jsx
│   │   │   ├── roadmap/
│   │   │   │   ├── CategoryCard.jsx
│   │   │   │   ├── RoadmapView.jsx
│   │   │   │   ├── MilestoneCard.jsx
│   │   │   │   └── ProgressIndicator.jsx
│   │   │   └── skill/
│   │   │       ├── SkillPage.jsx
│   │   │       ├── VideoPlayer.jsx
│   │   │       ├── KeyPoints.jsx
│   │   │       ├── CommonMistakes.jsx
│   │   │       └── PracticeDrills.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── SkillsContext.jsx
│   │   │   └── ProgressContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useProgress.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── RoadmapPage.jsx
│   │   │   ├── SkillDetail.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── About.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   ├── authApi.js
│   │   │   ├── personalizationApi.js
│   │   │   ├── progressApi.js
│   │   │   └── skillsApi.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Skills Endpoints

#### Get All Skills
```http
GET /api/skills
```

#### Get Single Skill
```http
GET /api/skills/:id
```

### Personalization Endpoints

#### Save Personalization
```http
POST /api/personalization
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": {
    "danceStyle": "all-around",
    "experienceLevel": "complete-beginner",
    "primaryGoal": "freestyle",
    "weeklyHours": "3-5",
    "goals": ["freestyle", "battles"],
    "practiceEnvironment": "home-large"
  }
}
```

#### Get User Personalization
```http
GET /api/personalization
Authorization: Bearer <token>
```

#### Delete Personalization
```http
DELETE /api/personalization
Authorization: Bearer <token>
```

### Progress Endpoints

#### Get User Progress
```http
GET /api/progress
Authorization: Bearer <token>
```

#### Toggle Skill Completion
```http
POST /api/progress/toggle
Authorization: Bearer <token>
Content-Type: application/json

{
  "skillId": "skill_id_here"
}
```

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/hiphop-dance` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_min_32_chars` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend

No environment variables required for basic setup. API base URL is configured in `utils/api.js`.

## 🧪 Testing

```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

## 🎨 Color Palette

```css
/* Primary Colors */
--purple-600: #9333ea;
--pink-600: #ec4899;

/* Difficulty Badges */
--beginner: #10b981 (green);
--intermediate: #f59e0b (yellow);
--advanced: #ef4444 (red);

/* Backgrounds */
--gray-50: #f9fafb;
--gray-900: #111827;
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use ESLint configuration provided
- Follow existing code style and naming conventions
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features

## 🐛 Known Issues

- Video player may not work with certain YouTube URL formats
- Mobile keyboard may overlap input fields on some devices
- Progress sync may delay on slow connections

## 🗺 Roadmap

- [ ] User profile customization
- [ ] Community features (comments, forums)
- [ ] Video upload for practice review
- [ ] Live classes integration
- [ ] Achievement/badge system
- [ ] Social sharing
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] AI-powered form feedback

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Inspired by the hip-hop dance community
- Video tutorials sourced from [source credits]
- Icons by Lucide
- UI inspiration from modern SaaS platforms

## 📞 Support

For support, email support@hiphoplearning.com or open an issue in the repository.

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ for the hip-hop dance community**
