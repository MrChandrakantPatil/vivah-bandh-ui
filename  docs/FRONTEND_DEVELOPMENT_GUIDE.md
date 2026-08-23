# Vivah Bandh --- Frontend Development Tech Stack

## 1. Overview

This document defines the recommended frontend development stack and
engineering approach for the **Vivah Bandh** matrimony web application.

The frontend will be built with a modern React-based stack focused on:

- Maintainability
- Reusability
- Performance
- Type safety
- Responsive design
- Scalable state management
- Clean API integration
- Consistent UI/UX

## 2. Frontend Tech Stack

```
  Area                   Technology                       Purpose
------------------------
  UI Framework           React.js                         Build the application UI
  Language               TypeScript                       Type safety and maintainability
  Build Tool             Vite                             Fast local development and production builds
  Styling                Tailwind CSS                     Utility-first responsive styling
  UI Components          shadcn/ui                        Reusable accessible UI components
  State Management       Redux Toolkit                    Global/client application state
  API & Server State     RTK Query                        API calls, caching and server state
  Forms                  React Hook Form                  Efficient form management
  Validation             Zod                              Schema-based validation
  Routing                React Router                     Application routing
  Icons                  Lucide React                     Consistent icon system
  Charts                 Recharts                         Dashboard and analytics charts
  Date Utilities         date-fns                         Date manipulation and formatting
  Testing                Jest + React Testing Library     Unit/component testing
  E2E Testing            Playwright                       End-to-end testing
  Code Quality           ESLint + Prettier                Linting and formatting
  Git Hooks              Husky + lint-staged              Pre-commit quality checks
```

## 3. Recommended Frontend Architecture

```text
React Application
        │
        ├── Pages / Routes
        │
        ├── Feature Components
        │
        ├── Shared UI Components
        │
        ├── Redux Toolkit
        │       │
        │       └── RTK Query
        │
        ├── Custom Hooks
        │
        ├── Services / API
        │
        ├── Utilities
        │
        └── Types
```

The frontend should follow a **feature-oriented architecture** rather
than placing every component into one large generic components
directory.

## 4. Suggested Project Structure

```text
src/
│
├── app/
│   ├── store.ts
│   ├── router.tsx
│   └── providers.tsx
│
├── assets/
│   ├── images/
│   └── icons/
│
├── components/
│   ├── ui/
│   ├── common/
│   └── layout/
│
├── features/
│   ├── auth/
│   ├── profile/
│   ├── matches/
│   ├── search/
│   ├── bookmarks/
│   ├── interests/
│   ├── notifications/
│   ├── chat/
│   ├── subscriptions/
│   └── settings/
│
├── pages/
│   ├── Login/
│   ├── Register/
│   ├── Dashboard/
│   ├── Matches/
│   ├── Profile/
│   ├── Bookmarks/
│   ├── Interests/
│   ├── Notifications/
│   ├── Messages/
│   └── Settings/
│
├── layouts/
│   ├── PublicLayout/
│   ├── DashboardLayout/
│   └── AuthLayout/
│
├── hooks/
│
├── services/
│   └── api/
│
├── store/
│   ├── slices/
│   └── middleware/
│
├── types/
│
├── utils/
│
├── constants/
│
├── config/
│
├── routes/
│
├── App.tsx
└── main.tsx
```

## 5. React

React will be the primary UI framework.

Use functional components and React Hooks.

Recommended practices:

- Prefer small, focused components.
- Keep business logic outside presentation components where practical.
- Create reusable components for repeated UI patterns.
- Avoid unnecessary component-level complexity.
- Use composition instead of deeply nested prop chains.
- Use `React.memo` only when there is a measurable benefit.
- Keep feature-specific components inside their feature directory.

Example:

```text
features/
└── matches/
    ├── components/
    │   ├── MatchCard.tsx
    │   ├── MatchList.tsx
    │   └── MatchFilters.tsx
    ├── hooks/
    ├── matchApi.ts
    ├── matchTypes.ts
    └── index.ts
```

## 6. TypeScript

TypeScript should be used throughout the frontend.

Use types for:

- API responses
- API requests
- User profiles
- Match data
- Bookmark data
- Interest data
- Form values
- Component props
- Redux state
- Configuration

Example:

```ts
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  occupation: string;
  profileImage?: string;
}
```

Avoid using `any` unless there is a strong reason.

Prefer:

```ts
unknown;
```

when the type is genuinely unknown.

## 7. Vite

Vite will be used as the frontend build tool.

Benefits:

- Fast development server
- Fast Hot Module Replacement
- Simple configuration
- Excellent React + TypeScript support
- Fast production builds

Recommended commands:

```bash
npm create vite@latest
npm install
npm run dev
npm run build
```

## 8. Tailwind CSS

Tailwind CSS will be the primary styling solution.

Use Tailwind for:

- Layout
- Responsive design
- Spacing
- Typography
- Colors
- Borders
- Shadows
- Responsive breakpoints
- States such as hover/focus/disabled

Example:

```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">...</div>
```

Avoid mixing large amounts of inline CSS with Tailwind unless necessary.

## 9. shadcn/ui

Use shadcn/ui for common reusable UI patterns.

Potential components:

- Button
- Dialog
- Dropdown
- Select
- Tabs
- Input
- Checkbox
- Radio Group
- Sheet
- Tooltip
- Toast
- Alert
- Card

Application-specific components should be built on top of these
primitives.

Example:

```text
shadcn Button
      ↓
VivahButton
      ↓
Feature usage
```

## 10. Redux Toolkit

Redux Toolkit should be used for global client-side state.

Potential Redux state:

```text
auth
user
preferences
UI state
application settings
```

Do not put every piece of component state into Redux.

Use local React state for state that is only required by one component.

Example:

```text
Local React State
    ↓
Modal open/close
Dropdown state
Input state
Temporary UI state
```

Use Redux for state that needs to be shared across multiple areas of the
application.

## 11. RTK Query

RTK Query should handle server/API state.

Use RTK Query for:

- Matches
- Profiles
- Search results
- Bookmarks
- Interests
- Notifications
- User settings
- Subscriptions
- Chat API data

Example:

```ts
const { data, isLoading, error } = useGetMatchesQuery({
  page: 1,
  limit: 20,
});
```

RTK Query provides:

- API caching
- Request lifecycle handling
- Loading states
- Error states
- Cache invalidation
- Refetching

Avoid creating manual Redux reducers for every API response.

## 12. State Management Strategy

Use the following decision rule:

```text
Does only one component need the state?
        │
       YES
        ↓
   React useState

        NO
        │
        ↓
Is it server/API data?
        │
       YES
        ↓
     RTK Query

        NO
        │
        ↓
Does many parts of the application need it?
        │
       YES
        ↓
   Redux Toolkit
```

## 13. React Hook Form

Use React Hook Form for forms.

Important forms include:

- Registration
- Login
- Profile creation
- Profile editing
- Partner preferences
- Search filters
- Contact forms
- Subscription-related forms

Benefits:

- Minimal re-renders
- Easy validation integration
- Good TypeScript support
- Simple form state management

## 14. Zod

Use Zod for schema validation.

Example:

```ts
const profileSchema = z.object({
  name: z.string().min(2),
  age: z.number().min(18),
  city: z.string().min(2),
});
```

Integrate Zod with React Hook Form.

This gives the application consistent form validation.

## 15. Routing

Use React Router.

Suggested route structure:

```text
/
├── /login
├── /register
├── /dashboard
├── /matches
├── /search
├── /profile/:id
├── /bookmarks
├── /interests
├── /notifications
├── /messages
├── /subscription
└── /settings
```

Protected routes should require authentication.

Example:

```text
Public Routes
    ├── Login
    ├── Register
    └── About

Protected Routes
    ├── Dashboard
    ├── Matches
    ├── Bookmarks
    ├── Interests
    ├── Messages
    └── Settings
```

## 16. Authentication

Frontend authentication should integrate with the Node.js REST API.

Recommended approach:

```text
React
  ↓
Login API
  ↓
Node.js
  ↓
Authentication
  ↓
Secure HttpOnly Cookie
```

The frontend should not store sensitive long-lived authentication tokens
in `localStorage`.

The application should have:

- Login
- Logout
- Registration
- Session restoration
- Protected routes
- Unauthorized handling
- Token/session expiry handling

## 17. Matches Feature

The matches feature is one of the primary modules.

Suggested structure:

```text
features/matches/
├── components/
│   ├── MatchCard.tsx
│   ├── MatchGrid.tsx
│   ├── MatchFilters.tsx
│   └── MatchEmptyState.tsx
├── hooks/
├── matchesApi.ts
├── matchTypes.ts
└── index.ts
```

The UI can support:

- Recommended matches
- New matches
- Recently active profiles
- Match percentage
- Quick actions
- Bookmark
- Send interest
- View profile

## 18. Bookmark Feature

Bookmarking should be treated as a separate feature.

UI:

```text
Profile Card
     │
     ├── View Profile
     ├── Bookmark
     └── Send Interest
```

API integration:

```text
POST   /api/bookmarks/:profileId
DELETE /api/bookmarks/:profileId
GET    /api/bookmarks
```

Frontend should update the bookmark state immediately when practical and
synchronize it with the API.

## 19. Search & Filters

Search should support:

- Age
- Location
- Height
- Education
- Occupation
- Marital status
- Community
- Other partner preferences

Keep filter state in the URL when it is useful for:

- Sharing search results
- Browser refresh
- Back/forward navigation
- Bookmarking a search

Example:

```text
/search?ageMin=25&ageMax=30&city=Pune
```

## 20. Profile Components

Create reusable profile components:

```text
ProfileCard
ProfileHeader
ProfilePhotoGallery
ProfileBasicInfo
ProfileAbout
ProfileEducation
ProfileOccupation
ProfileFamilyDetails
ProfilePreferences
ProfileActions
```

The same components can be reused across:

- Match cards
- Search results
- Profile page
- Bookmarks
- Interests

## 21. Responsive Design

The application should follow a mobile-first approach.

Recommended breakpoints:

```text
Mobile
↓
sm
↓
md
↓
lg
↓
xl
```

Primary targets:

- Mobile
- Tablet
- Laptop
- Desktop

The UI should not depend on a fixed desktop layout.

## 22. API Layer

Keep API integration separate from UI components.

Recommended:

```text
services/
└── api/
    ├── authApi.ts
    ├── profileApi.ts
    ├── matchesApi.ts
    ├── bookmarkApi.ts
    ├── interestApi.ts
    ├── notificationApi.ts
    └── subscriptionApi.ts
```

RTK Query can combine these APIs into the application API layer.

Components should consume hooks rather than directly calling `fetch`.

## 23. Error Handling

Every API-driven feature should handle:

```text
Loading
Success
Empty
Error
```

Example:

```text
Loading
   ↓
Success → Display data

Loading
   ↓
Empty → Display empty state

Loading
   ↓
Error → Display error state
```

Do not leave blank screens when an API fails.

## 24. Performance

Important frontend performance practices:

- Lazy-load routes
- Lazy-load heavy components
- Optimize images
- Use responsive image sizes
- Avoid unnecessary re-renders
- Use React.memo selectively
- Use useMemo/useCallback only where useful
- Use RTK Query caching
- Virtualize very large lists if required
- Avoid unnecessary global state
- Split large components
- Keep bundle size under control

For match/profile lists, pagination or infinite scrolling should be
preferred over loading thousands of profiles at once.

## 25. Accessibility

The UI should follow accessible HTML practices.

Important areas:

- Semantic HTML
- Keyboard navigation
- Focus management
- Proper labels
- Accessible dialogs
- Accessible buttons
- Alt text for images
- Sufficient color contrast
- Screen-reader-friendly states

shadcn/ui components can help, but accessibility still needs to be
verified in the application.

## 26. Testing Strategy

### Unit Tests

Use:

```text
Jest
```

Test:

- Utility functions
- Hooks
- Business logic

### Component Tests

Use:

```text
React Testing Library
```

Test:

- Profile card
- Match card
- Bookmark button
- Search filters
- Forms
- Modals

### E2E Tests

Use:

```text
Playwright
```

Important flows:

```text
Registration
Login
Profile creation
Search
View profile
Bookmark profile
Send interest
Accept interest
Logout
```

## 27. Code Quality

Use:

```text
ESLint
Prettier
TypeScript
Husky
lint-staged
```

Before a commit:

```text
Code
 ↓
ESLint
 ↓
TypeScript check
 ↓
Prettier
 ↓
Tests
 ↓
Commit
```

## 28. Environment Configuration

Use environment variables for configuration.

Example:

```text
.env.development
.env.staging
.env.production
```

Frontend variables should use the Vite convention:

```text
VITE_API_BASE_URL
```

Never put secrets such as:

```text
Database passwords
Private API keys
JWT secrets
AWS secret keys
```

in frontend environment variables.

Anything exposed to the React application should be treated as public.

## 29. Frontend Development Principles

### Component Design

Prefer:

```text
Small + reusable + focused
```

instead of:

```text
One huge component containing everything
```

### Business Logic

Keep business logic out of presentation components where practical.

### API Logic

Keep API calls in the API/service layer.

### Types

Keep shared feature types close to their feature or in a shared types
directory when genuinely reused.

### Styling

Use Tailwind consistently.

### State

Use the simplest state solution that solves the problem.

## 30. Recommended Development Flow

```text
Requirement
    ↓
Feature Design
    ↓
UI Component Design
    ↓
TypeScript Types
    ↓
API Contract
    ↓
RTK Query API
    ↓
React Components
    ↓
Form / Validation
    ↓
Loading / Empty / Error States
    ↓
Responsive Design
    ↓
Unit / Component Tests
    ↓
E2E Tests
    ↓
Code Review
    ↓
Build
    ↓
Deployment
```

## 31. Final Frontend Stack

The recommended frontend stack for Vivah Bandh is:

```text
React.js
    +
TypeScript
    +
Vite
    +
Tailwind CSS
    +
shadcn/ui
    +
Redux Toolkit
    +
RTK Query
    +
React Hook Form
    +
Zod
    +
React Router
    +
Lucide React
    +
Jest
    +
React Testing Library
    +
Playwright
    +
ESLint
    +
Prettier
    +
Husky
```

### Core principle

Keep the frontend **React-first, feature-oriented, TypeScript-based, and
API-driven**.

The initial architecture should remain simple enough for a small team
while being structured enough to scale when Vivah Bandh grows.
