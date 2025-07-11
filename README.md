# ⚽ Champions League Simulation - Frontend

A React-based frontend application for the Champions League simulation system. This application provides an interactive interface for managing football league matches, viewing standings, analyzing championship predictions, and comprehensive team management functionality.

## 🎯 Project Overview

This React frontend connects to a Laravel backend API to provide a complete football league simulation experience. Users can manage teams, simulate matches, edit results, view real-time standings, and get AI-powered predictions for championship outcomes.

## ✨ Features

### Core Simulation Features
- **🎮 Interactive Match Control**: Play matches week by week or simulate entire seasons
- **⚽ Live Match Editing**: Click-to-edit match results with real-time validation
- **📊 Dynamic League Table**: Real-time standings with sorting and statistics
- **🔮 Championship Predictions**: AI-powered probability calculations
- **📅 Week Navigation**: Browse matches and results by week
- **🔄 Reset Functionality**: Start fresh seasons with one click

### Team Management Features
- **➕ Add Teams**: Create new teams with custom strength ratings
- **📁 JSON Import**: Bulk import teams from JSON format
- **🏗️ Fixture Generation**: Automated single/double round-robin tournament creation
- **👁️ Fixture Preview**: Preview tournament structure before generation
- **🗑️ Team Management**: Delete individual teams or clear all data
- **⚙️ Strength Ratings**: Customizable team strength for realistic simulations

### Advanced Features
- **📱 Responsive Design**: Mobile-friendly interface that works on all devices
- **⚡ Real-time Updates**: Instant UI updates after each action
- **🔍 Team Search**: Enhanced team selection with visual cards
- **🏆 Tournament Formats**: Support for single and double round-robin tournaments
- **📈 Statistics Tracking**: Comprehensive match and team statistics

## 🛠️ Technology Stack

- **React 18** - Modern functional components with hooks
- **Axios** - HTTP client for API communication
- **CSS3** - Custom responsive styling with grid layouts
- **JavaScript ES6+** - Modern JavaScript features
- **Docker** - Containerization for deployment
- **Nginx** - Production web server

## 📋 Prerequisites

- **Node.js 18+**
- **npm** or **yarn**
- **Docker** (for containerized deployment)
- **Backend API** running on `http://localhost:8000`

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/JafarJabbar/ucl-react
cd champions-league-frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run manually
docker build -t champions-league-frontend .
docker run -p 3000:80 champions-league-frontend
```

## 🐳 Docker Deployment

### Development Mode
```bash
# Using docker-compose for development
docker-compose up --build
```

### Production Mode
```bash
# Build production image
docker build -t champions-league-frontend .

# Run production container
docker run -d -p 80:80 \
  -e REACT_APP_API_URL=https://your-api-domain.com/api/v1 \
  champions-league-frontend
```

### Environment Variables
Create a `.env` file in the project root:
```env
REACT_APP_API_URL=http://localhost:8000/api/v1
REACT_APP_ENVIRONMENT=development
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ControlPanel.jsx     # Main simulation controls
│   ├── LeagueTable.jsx      # Standings display
│   ├── MatchResults.jsx     # Match display and editing
│   ├── WeekNavigation.jsx   # Week browsing
│   ├── EditableMatch.jsx    # Individual match editor
│   ├── Predictions.jsx      # Championship predictions
│   ├── TeamManagement.jsx   # Team CRUD operations
│   └── TeamSearchCard.jsx   # Team selection component
├── services/             # API and external services
│   └── api.js               # API client configuration
├── App.js               # Main application component
├── index.js             # Application entry point
└── index.css            # Global styles

public/
├── index.html           # HTML template
└── favicon.ico          # Application icon

Docker files/
├── Dockerfile           # Multi-stage production build
├── docker-compose.yml   # Development orchestration
├── nginx.conf           # Production web server config
└── .dockerignore        # Docker build exclusions
```

## 🎮 Component Overview

### ControlPanel
Central control hub for league simulation:
- **Play Next Week**: Simulate upcoming matches
- **Play All Remaining**: Complete entire season
- **Show Predictions**: Display championship probabilities
- **Reset All**: Start fresh season
- **Status Display**: Match completion progress and statistics

### TeamManagement
Comprehensive team management interface:
- **Add Teams**: Create teams with name, short name, strength rating, and logo
- **JSON Import**: Bulk import with sample data and validation
- **Fixture Generation**: Create single or double round-robin tournaments
- **Fixture Preview**: Preview tournament structure before generation
- **Team Deletion**: Remove individual teams or clear all data
- **Tournament Statistics**: Display expected weeks and matches

### LeagueTable
Dynamic standings display featuring:
- Real-time position updates with colored position indicators
- Complete statistics (played, won, drawn, lost, goal difference, points)
- Automatic sorting by points, goal difference, and goals scored
- Team logos and short names display

### MatchResults & EditableMatch
Interactive match management:
- Click-to-edit functionality with input validation
- Real-time score updates with min/max constraints
- Visual status indicators (completed/pending)
- Instant standings updates after match edits
- Save/cancel functionality with loading states

### WeekNavigation
Intuitive week browsing:
- Progress indicators showing completed vs total matches
- Visual week selection with completion status
- Easy navigation between tournament weeks

### Predictions
AI-powered championship analysis:
- Current vs projected points comparison
- Championship probability percentages
- Final position predictions with crown indicators
- Season completion detection and final results display

### TeamSearchCard
Enhanced team selection interface:
- Visual team cards with logos and information
- Adjustable strength ratings with sliders
- Add/remove functionality with state management
- Team validation and duplicate prevention

## 🔗 API Integration

The frontend communicates with the Laravel backend through these endpoints:

### League Management
```javascript
// Get current standings
GET /api/v1/standings

// Get matches (all or by week)
GET /api/v1/matches/{week?}

// Simulate next week
POST /api/v1/play-week

// Simulate all remaining
POST /api/v1/play-all

// Update match result
PUT /api/v1/matches/{id}

// Get predictions
GET /api/v1/predictions

// Reset everything
POST /api/v1/reset-all
```

### Team Management
```javascript
// Get all teams
GET /api/v1/teams

// Add new team
POST /api/v1/teams

// Import teams from JSON
POST /api/v1/teams/import-json

// Delete team
DELETE /api/v1/teams/{id}

// Clear all teams
DELETE /api/v1/teams/clear-all

// Generate fixtures
POST /api/v1/fixtures/generate

// Preview fixtures
GET /api/v1/fixtures/preview

// Validate fixtures
GET /api/v1/fixtures/validate
```

### API Configuration
Update `src/services/api.js` for different environments:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// League API functions
export const leagueAPI = {
  getStandings: () => apiClient.get('/standings'),
  getMatches: (week) => apiClient.get(`/matches${week ? `/${week}` : ''}`),
  playNextWeek: () => apiClient.post('/play-week'),
  playAllRemaining: () => apiClient.post('/play-all'),
  getPredictions: () => apiClient.get('/predictions'),
  updateMatch: (id, result) => apiClient.put(`/matches/${id}`, result),
  resetAll: () => apiClient.post('/reset-all'),
};

// Team API functions  
export const teamAPI = {
  getTeams: () => apiClient.get('/teams'),
  addTeam: (teamData) => apiClient.post('/teams', teamData),
  importTeamsFromJson: (data) => apiClient.post('/teams/import-json', data),
  deleteTeam: (id) => apiClient.delete(`/teams/${id}`),
  clearAllTeams: () => apiClient.delete('/teams/clear-all'),
  generateFixtures: (data) => apiClient.post('/fixtures/generate', data),
  previewFixtures: (rounds = 2) => apiClient.get(`/fixtures/preview?rounds=${rounds}`),
  validateFixtures: () => apiClient.get('/fixtures/validate'),
};
```

## 🎨 Styling & Design

### CSS Architecture
- **Global styles** in `index.css`
- **Component-specific** inline styles for flexibility
- **Responsive grid** system with breakpoints
- **Mobile-first** approach with touch-friendly interfaces

### Design Features
- Clean, modern interface with card-based layouts
- Intuitive color coding for different states
- Smooth transitions and hover effects
- Accessible design patterns with proper contrast
- Touch-friendly mobile interface with appropriate spacing

### Color Scheme
```css
Primary: #007bff (Blue) - Main actions and links
Success: #28a745 (Green) - Positive actions and completed states  
Warning: #ffc107 (Yellow) - Preview and caution actions
Danger: #dc3545 (Red) - Delete and reset actions
Secondary: #6c757d (Gray) - Disabled and secondary actions
Info: #17a2b8 (Teal) - Information displays
```

### Layout Grid System
```css
.grid { display: grid; gap: 20px; }
.grid-2 { grid-template-columns: 1fr 1fr; }
.grid-3 { grid-template-columns: repeat(3, 1fr); }

/* Mobile responsiveness */
@media (max-width: 768px) {
  .grid-2, .grid-3 { grid-template-columns: 1fr; }
}
```

## ⚡ Performance Optimizations

### Production Build
- **Code splitting** for smaller bundles
- **Tree shaking** to remove unused code
- **Minification** and compression
- **Static asset optimization**

### Docker Optimizations
- **Multi-stage builds** for smaller images
- **Nginx gzip compression**
- **Static file caching** with appropriate headers
- **Security headers** for production deployment

### Runtime Performance
- **Efficient re-renders** with proper key props
- **State management** optimization with minimal state
- **API call optimization** with loading states
- **Lazy loading** where applicable
- **Debounced search** for team filtering

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (not recommended)
npm run eject

# Docker commands
npm run docker:build    # Build Docker image
npm run docker:run      # Run Docker container
npm run docker:compose  # Use docker-compose
```

### Development Guidelines

#### Code Style
- Use **functional components** with hooks
- Follow **React best practices** and patterns
- Implement **proper error handling** with try-catch
- Use **descriptive variable names** and comments
- Maintain **consistent formatting** and indentation

#### State Management
- Use `useState` for component state
- Use `useEffect` for side effects and API calls
- Lift state up when shared between components
- Keep state minimal and focused on single responsibility

#### API Integration
- Handle loading states for better UX
- Implement comprehensive error handling
- Use try-catch blocks for async operations
- Provide meaningful user feedback
- Validate data before sending to API

### Component Development Patterns

#### Form Handling
```javascript
const [formData, setFormData] = useState({
  name: '',
  short_name: '',
  strength_rating: 0.5
});

const handleInputChange = (field, value) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};
```

#### API Call Pattern
```javascript
const [loading, setLoading] = useState(false);

const handleApiCall = async () => {
  setLoading(true);
  try {
    const response = await api.someEndpoint();
    // Handle success
  } catch (error) {
    console.error('Error:', error);
    alert(error.response?.data?.message || 'Error occurred');
  }
  setLoading(false);
};
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watchAll

# Generate coverage report
npm test -- --coverage
```

## 🚀 Deployment Options

### Static Site Hosting

#### Netlify Deployment
```bash
# Build the project
npm run build

# Deploy build folder to Netlify
# Or connect GitHub repository for automatic deployments
```

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### Cloud Hosting

#### AWS S3 + CloudFront
```bash
# Build the project
npm run build

# Upload build folder to S3 bucket
aws s3 sync build/ s3://your-bucket-name

# Configure CloudFront distribution for SPA routing
```

#### Google Cloud Storage
```bash
# Build and upload
npm run build
gsutil -m cp -r build/* gs://your-bucket-name
```

### Container Deployment

#### Google Cloud Run
```bash
# Build and push to Google Container Registry
docker build -t gcr.io/PROJECT_ID/champions-league-frontend .
docker push gcr.io/PROJECT_ID/champions-league-frontend

# Deploy to Cloud Run
gcloud run deploy --image gcr.io/PROJECT_ID/champions-league-frontend
```

#### AWS ECS/Fargate
```bash
# Push to AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
docker build -t champions-league-frontend .
docker tag champions-league-frontend:latest ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/champions-league-frontend:latest
docker push ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/champions-league-frontend:latest
```

#### Heroku Container Registry
```bash
# Login to Heroku Container Registry
heroku container:login

# Build and push
heroku container:push web -a your-app-name

# Release
heroku container:release web -a your-app-name
```

## 🐛 Troubleshooting

### Common Issues

#### API Connection Problems
```bash
# Check if backend is running
curl http://localhost:8000/api/v1/standings

# Verify CORS settings on backend
# Check REACT_APP_API_URL environment variable
echo $REACT_APP_API_URL
```

#### Team Management Issues
```bash
# Check team data format for JSON import
# Ensure required fields: name, short_name, strength_rating
# Verify strength_rating is between 0.1 and 1.0
```

#### Fixture Generation Problems
```bash
# Ensure even number of teams for round-robin
# Check that teams exist before generating fixtures
# Verify backend API endpoints are available
```

#### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force

# Check for syntax errors in components
npm run build
```

#### Docker Issues
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t champions-league-frontend .

# Check container logs
docker logs <container_id>
```

### Debug Mode
Enable React development tools and check browser console for errors.

Set environment for debugging:
```env
REACT_APP_DEBUG=true
NODE_ENV=development
```

### Performance Issues
```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **Progressive Web App** capabilities ready

## 🎯 Usage Guide

### Getting Started
1. **Team Setup**: Use Team Management to add teams or import from JSON
2. **Fixture Generation**: Create tournament structure with desired format
3. **Simulation**: Use Control Panel to simulate matches week by week
4. **Analysis**: View standings and predictions as season progresses
5. **Management**: Edit individual match results or reset for new seasons

### Team Management Workflow
1. **Add Teams**: Create teams individually with custom ratings
2. **Bulk Import**: Use JSON format for multiple teams at once
3. **Preview Fixtures**: See tournament structure before committing
4. **Generate Tournament**: Create complete fixture list
5. **Start Season**: Begin simulation with generated matches

### JSON Import Format
```json
[
  {
    "name": "Manchester United",
    "short_name": "MUN", 
    "strength_rating": 0.85,
    "logo_url": "https://example.com/united.png"
  },
  {
    "name": "Bayern Munich",
    "short_name": "BAY",
    "strength_rating": 0.90,
    "logo_url": "https://example.com/bayern.png"
  }
]
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature-name`
3. **Commit** changes: `git commit -am 'Add feature'`
4. **Push** to branch: `git push origin feature-name`
5. **Submit** a Pull Request

### Contribution Guidelines
- Follow existing code style and patterns
- Add tests for new features and components
- Update documentation for API changes
- Test on multiple browsers and devices
- Ensure responsive design works correctly
- Follow React best practices and hooks patterns

### Code Review Checklist
- [ ] Component follows React best practices
- [ ] Proper error handling implemented
- [ ] Loading states provided for async operations
- [ ] Responsive design tested
- [ ] API integration follows established patterns
- [ ] Comments added for complex logic
- [ ] No console.log statements in production code

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- **Backend API**: Laravel-based REST API with team and match management
- **Database**: MySQL schema with teams, matches, standings, and fixtures
- **DevOps**: Docker and deployment configurations

## 📞 Support

For issues and questions:
- Open an issue on GitHub with detailed description
- Check existing documentation and troubleshooting guide
- Contact the development team
- Join our Discord community for real-time help

---

**Built with ⚽ and React for football simulation enthusiasts**

## 🎯 Quick Commands Reference

```bash
# Development
npm start                    # Start dev server
npm run build               # Production build
npm test                    # Run tests

# Docker
docker-compose up --build   # Start with Docker
docker build -t app .       # Build image
docker run -p 3000:80 app   # Run container

# Environment
export REACT_APP_API_URL=http://localhost:8000/api/v1

# Team Management 
# Use JSON import for bulk team creation
# Generate fixtures after adding teams
# Preview before generating to avoid mistakes
```