# Student Dashboard - Anyware Software Assessment

A modern full-stack web application for displaying student quizzes and announcements, built with React (frontend) and NestJS (backend). This project was developed as part of the technical assessment for Anyware Software.

## Project Overview

This project presents student quizzes and announcements data for the current semester. It features a responsive dashboard interface that's only accessible to logged-in users, with complete CRUD operations for managing educational content. The application supports both English and Arabic languages with RTL support.

## Tech Stack

### Frontend (Implemented)

- **React 19** with TypeScript
- **Vite** as build tool and development server
- **Redux Toolkit** for state management
- **Material-UI (MUI)** for component library and design system
- **React Router DOM** for navigation
- **React i18next** for internationalization (English/Arabic)
- **Vitest & React Testing Library** for comprehensive testing
- **ESLint** for code quality

### Backend (Implemented)

- **NestJS** with TypeScript
- **MongoDB** with Mongoose ODM
- **Express.js** (underlying NestJS framework)
- **Class Validator** for request validation
- **CORS** enabled for cross-origin requests

## Architecture

### Frontend Structure (Current Implementation)

```
src/
├── components/
│   ├── auth/                   # Authentication components
│   │   ├── AuthComponent.tsx   # Login component
│   │   └── requireAuth.tsx     # HOC for protected routes
│   ├── common/                 # Reusable components
│   │   ├── AppButton.tsx       # Custom button component
│   │   └── LanguageSwitcher.tsx # Language toggle
│   ├── dashboard/              # Dashboard-specific components
│   │   ├── Announcements.tsx   # Announcements display
│   │   ├── ExamsTime.tsx       # Exam information card
│   │   ├── WhatsDue.tsx        # Quiz/assignments due
│   │   └── __tests__/          # Component tests
│   └── layout/                 # Layout components
│       ├── Layout.tsx          # Main layout wrapper
│       ├── sidebar/            # Navigation sidebar
│       │   └── Sidebar.tsx
│       └── topbar/             # Top navigation bar
│           ├── NotificationBadge.tsx
│           ├── SearchBar.tsx
│           ├── Topbar.tsx
│           ├── TopbarActions.tsx
│           └── UserProfile.tsx
├── hooks/                      # Custom React hooks
│   ├── useAnnouncements.ts     # Announcements data hook
│   ├── useQuizzes.ts           # Quizzes data hook
│   └── __tests__/              # Hook tests
├── i18n/                       # Internationalization
│   └── index.ts                # i18n configuration
├── pages/                      # Page components
│   ├── Dashboard/              # Dashboard page
│   ├── Home/                   # Home page
│   └── NotFound/               # 404 page
├── services/                   # API service layer
│   ├── api.service.ts          # Base API service
│   ├── announcement.service.ts # Announcements API
│   ├── quiz.service.ts         # Quizzes API
│   ├── user.service.ts         # User API
│   └── __tests__/              # Service tests
├── store/                      # Redux store
│   ├── authSlice.ts            # Authentication state
│   ├── index.ts                # Store configuration
│   └── __tests__/              # Store tests
├── test/                       # Test utilities
│   ├── setup.ts                # Vitest setup
│   └── utils.tsx               # Testing utilities
└── types/                      # TypeScript definitions
    ├── announcement.ts         # Announcement types
    ├── common.ts               # Common types
    ├── quiz.ts                 # Quiz types
    └── user.ts                 # User types
```

### Backend Structure (Implemented)

```
src/
├── auth/                   # Authentication module
│   ├── auth.controller.ts  # Login/logout endpoints
│   ├── auth.service.ts     # Auth business logic
│   └── auth.module.ts      # Auth module configuration
├── quizzes/                # Quiz management
│   ├── quizzes.controller.ts
│   ├── quizzes.service.ts
│   ├── quizzes.module.ts
│   ├── dto/                # Data Transfer Objects
│   └── schemas/            # MongoDB schemas
├── announcements/          # Announcement management
│   ├── announcements.controller.ts
│   ├── announcements.service.ts
│   ├── announcements.module.ts
│   ├── dto/
│   └── schemas/
├── seed/                   # Database seeding
│   ├── seed.controller.ts
│   ├── seed.service.ts
│   └── seed.module.ts
├── common/                 # Shared utilities
│   └── filters/           # Exception filters
└── main.ts                # Application entry point
```

## Features Implemented

### Frontend Features

- **Modern React Architecture**: React 19 with TypeScript and Vite
- **Authentication System**: Simple login/logout with protected routes
- **Dashboard Interface**: Responsive Material-UI based dashboard
- **Internationalization**: Full English/Arabic support with RTL
- **State Management**: Redux Toolkit for application state
- **Component Library**: Material-UI components with custom theming
- **Comprehensive Testing**: 27+ tests covering components, hooks, and services
- **Code Quality**: ESLint configuration with TypeScript support

### Dashboard Components

- **Announcements**: Display and manage course announcements
- **Exams Time**: Exam schedule and preparation tips
- **What's Due**: Upcoming quizzes and assignments
- **Sidebar Navigation**: Multi-language navigation menu
- **Top Bar**: Search, notifications, and user profile

### Authentication System

- **Simple Login/Logout**: No username/password required (as per specifications)
- **Session-based Authentication**: Maintains user state
- **Protected Routes**: Dashboard only accessible to logged-in users
- **RequireAuth HOC**: Redirects unauthorized users to login page

### Quiz Management (CRUD)

- Create new quizzes with questions and multiple choice options
- Read all quizzes and individual quiz details
- Update existing quiz information
- Delete quizzes from the system
- Sorting by posting date (newest first)

### Announcement Management (CRUD)

- Create new announcements with title and content
- Read all announcements and individual announcement details
- Update existing announcement information
- Delete announcements from the system
- Categorization by announcement type

### Database & API

- MongoDB Integration with Mongoose ODM
- Data Validation using class-validator decorators
- Error Handling with custom exception filters
- CORS Configuration for frontend integration
- Global API Prefix (`/api`) for all endpoints
- Sample Data Seeding for testing and demonstration

## API Endpoints

### Authentication

```http
GET    /api/auth/status     # Check authentication status
POST   /api/auth/login      # Simple login (no credentials)
POST   /api/auth/logout     # Logout user
```

### Quizzes

```http
GET    /api/quizzes         # Get all quizzes
GET    /api/quizzes/:id     # Get specific quiz
POST   /api/quizzes         # Create new quiz
PUT    /api/quizzes/:id     # Update existing quiz
DELETE /api/quizzes/:id     # Delete quiz
```

### Announcements

```http
GET    /api/announcements         # Get all announcements
GET    /api/announcements/:id     # Get specific announcement
POST   /api/announcements         # Create new announcement
PUT    /api/announcements/:id     # Update existing announcement
DELETE /api/announcements/:id     # Delete announcement
```

### Utilities

```http
POST   /api/seed            # Create sample data for testing
```

## Data Models

### Quiz Schema

```typescript
interface Quiz {
  id: string;
  title: string; // Quiz title
  description: string; // Quiz description
  questions: {
    // Array of questions
    question: string; // Question text
    options: string[]; // Multiple choice options
    correctAnswer: number; // Index of correct option
  }[];
  dueDate: Date; // Submission deadline
  duration: number; // Time limit in minutes
  postedAt: Date; // Creation timestamp
  topic: string; // Subject/course topic
}
```

### Announcement Schema

```typescript
interface Announcement {
  id: string;
  title: string; // Announcement title
  content: string; // Announcement content
  type: string; // Category (general, urgent, info)
  postedAt: Date; // Creation timestamp
}
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Frontend Setup (Current)

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

4. **Run tests:**

   ```bash
   npm run test        # Run tests once
   npm run test:watch  # Run tests in watch mode
   npm run test:ui     # Run tests with UI
   npm run test:coverage # Run tests with coverage
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

### Backend Setup (Implemented)

1. **Navigate to server directory:**

   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration:**

   ```bash
   # Create .env file
   MONGODB_URI=mongodb://localhost:27017/aw_database
   PORT=3000
   ```

3. **Start the server:**

   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000`

4. **Seed sample data:**
   ```bash
   # Using Postman or curl
   POST http://localhost:3000/api/seed
   ```

## Testing

### Test Coverage

- **Dashboard Components**: 27 comprehensive tests
- **Custom Hooks**: Tests for data fetching and state management
- **Services**: API service layer testing
- **Redux Store**: Authentication state testing

### Test Files Overview

```
__tests__/
├── components/dashboard/
│   ├── Announcements.test.tsx (5 tests)
│   ├── ExamsTime.test.tsx (7 tests)
│   └── WhatsDue.test.tsx (8 tests)
├── pages/Dashboard/
│   └── Dashboard.test.tsx (7 tests)
├── hooks/
│   ├── useAnnouncements.test.ts
│   └── useQuizzes.test.ts
├── services/
│   ├── api.service.test.ts
│   ├── announcement.service.test.ts
│   └── quiz.service.test.ts
└── store/
    └── authSlice.test.ts
```

### Running Tests

```bash
npm run test           # Run all tests
npm run test:ui        # Interactive test UI
npm run test:coverage  # Generate coverage report
npm run test:watch     # Watch mode for development
```

## Internationalization

The application supports both English and Arabic with:

- **RTL Support**: Automatic text direction switching
- **Dynamic Language Switching**: Real-time language toggle
- **Comprehensive Translations**: All UI elements translated
- **Performance Optimized**: Lazy loading of language resources

### Supported Languages

- **English (en)**: Default language
- **Arabic (ar)**: Full RTL support with Arabic translations

## Key Implementation Decisions

### Frontend Architecture

- **Vite over Create React App**: Better performance and modern tooling
- **Material-UI**: Consistent design system with Arabic RTL support
- **Redux Toolkit**: Simplified state management with modern patterns
- **Component-based Architecture**: Reusable and maintainable components
- **Custom Hooks**: Separation of business logic from UI components

### Authentication Strategy

- **Simplified Authentication**: Session-based auth without credentials as specified
- **HOC Pattern**: Reusable authentication wrapper for protected routes
- **Redux State**: Centralized authentication state management

### Testing Strategy

- **Vitest**: Fast and modern testing framework
- **React Testing Library**: User-centric testing approach
- **Comprehensive Coverage**: Components, hooks, services, and store
- **Mock Strategy**: Strategic mocking for external dependencies

### Code Quality

- **TypeScript**: Full type safety across the application
- **ESLint**: Modern linting configuration
- **Modular Architecture**: Clear separation of concerns
- **Custom Types**: Well-defined interfaces for all data structures

## Configuration Details

### Vite Configuration

- **React Plugin**: Fast refresh and optimal bundling
- **TypeScript Support**: Full type checking and compilation
- **Development Server**: Hot module replacement
- **Build Optimization**: Tree shaking and code splitting

### Material-UI Theming

- **Custom Theme**: Consistent color palette and typography
- **RTL Support**: Automatic direction switching for Arabic
- **Responsive Design**: Mobile-first approach

### Testing Configuration

- **Vitest**: Modern testing framework configuration
- **JSdom**: Browser environment simulation
- **Testing Library**: User-centric testing utilities

## Sample Data

The application includes mock data for demonstration:

- **3 Sample Quizzes**: JavaScript, React, and Database topics
- **3 Sample Announcements**: Semester welcome, exam schedule, assignment reminders
- **Realistic Timestamps**: Proper date handling and formatting

## Future Enhancements

### Advanced Features

- [ ] Real-time updates with WebSockets
- [ ] File upload capabilities for quiz attachments
- [ ] Advanced authentication with JWT refresh tokens
- [ ] User role management (Student/Teacher/Admin)
- [ ] Quiz attempt tracking and scoring system
- [ ] Analytics dashboard with performance metrics

### Frontend Enhancements

- [ ] Progressive Web App (PWA) features
- [ ] Offline capability with service workers
- [ ] Push notifications for announcements
- [ ] Advanced quiz taking interface with timer
- [ ] Chart.js integration for analytics visualization
- [ ] Drag and drop functionality for quiz creation

### DevOps & Deployment

- [ ] Docker containerization for both frontend and backend
- [ ] CI/CD pipeline setup with automated testing
- [ ] Production deployment guides (AWS/Azure/Vercel)
- [ ] Performance monitoring and logging
- [ ] Error tracking integration (Sentry)
- [ ] Load balancing and scaling strategies

## Development Notes

### Project Highlights

- **Full-Stack Application**: Complete React frontend with NestJS backend
- **Modern Tech Stack**: Latest React 19 with cutting-edge tooling
- **Complete CRUD Operations**: All database operations implemented
- **Comprehensive Testing**: 27+ tests ensuring code reliability
- **Internationalization**: Full bilingual support with RTL
- **Type Safety**: Complete TypeScript implementation across frontend and backend
- **Component Architecture**: Scalable and maintainable structure
- **Performance Optimized**: Vite build system and lazy loading
- **Database Integration**: MongoDB with proper data modeling

### Development Process

- **Time Investment**: Approximately 20-25 hours for full-stack implementation
- **Test-Driven Development**: Tests written alongside components
- **API-First Design**: Backend API designed before frontend integration
- **Iterative Design**: Progressive enhancement approach
- **Code Quality**: Consistent coding standards and best practices

### Technical Challenges Solved

- **RTL Support**: Complex Arabic language and direction handling
- **State Management**: Efficient Redux Toolkit implementation
- **API Integration**: Seamless frontend-backend communication
- **Testing Strategy**: Comprehensive test coverage with mocking
- **Component Design**: Reusable and flexible component architecture
- **Database Design**: Efficient MongoDB schema and data modeling
- **Authentication Flow**: Secure session-based authentication system

## Project Statistics

- **Frontend Components**: 15+ React components
- **Backend Modules**: 4 NestJS modules (Auth, Quizzes, Announcements, Seed)
- **API Endpoints**: 15+ RESTful endpoints
- **Custom Hooks**: 2 data fetching hooks
- **Services**: 4 API service modules
- **Test Files**: 10+ test files
- **Test Cases**: 27+ individual tests
- **TypeScript Interfaces**: 15+ type definitions
- **Languages Supported**: 2 (English, Arabic)
- **Database Collections**: 3 MongoDB collections

## Assessment Completion Status

### Completed Requirements

- [x] Full-stack application (React + NestJS)
- [x] React frontend with TypeScript
- [x] NestJS backend with MongoDB
- [x] Complete CRUD API endpoints
- [x] Material-UI component library
- [x] Redux state management
- [x] Authentication system (frontend & backend)
- [x] Dashboard with multiple components
- [x] Database integration with data persistence
- [x] Internationalization (English/Arabic)
- [x] Comprehensive testing suite
- [x] Modern development tooling
- [x] Responsive design
- [x] Code quality measures
- [x] API documentation
- [x] Sample data seeding

### Key Achievements

- **Full-Stack Implementation**: Complete frontend and backend integration
- **Production-Ready**: Comprehensive error handling and validation
- **Scalable Architecture**: Modular design for easy feature additions
- **Developer Experience**: Clear documentation and testing setup
- **International Support**: Multi-language application with RTL support

---

**Developed for Anyware Software Technical Assessment**  
_Demonstrating complete full-stack development capabilities with React, NestJS, TypeScript, and comprehensive testing practices._
