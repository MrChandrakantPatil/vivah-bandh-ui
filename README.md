# Vivah Bandh UI - Project Structure

## Folder Structure

``` text
src/
│
├── assets/
│
├── layouts/
│   ├── public/
│   │   ├── index.tsx
│   │   ├── components/
│   │   ├── data.ts
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── types.ts
│   │
│   ├── dashboard/
│   │   └── ...
│   │
│   └── auth/
│       └── ...
│
├── pages/
│   ├── public/
│   │   ├── home/
│   │   │   ├── index.tsx
│   │   │   ├── components/
│   │   │   ├── data.ts
│   │   │   ├── constants.ts
│   │   │   ├── utils.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── about/
│   │   │   └── ...
│   │   ├── privacy/
│   │   │   └── ...
│   │   └── terms/
│   │       └── ...
│   │
│   └── dashboard/
│       ├── home/
│       │   └── ...
│       ├── profile/
│       │   └── ...
│       ├── matches/
│       │   └── ...
│       └── ...
│
├── features/
│   ├── registration/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data.ts
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── types.ts
│   │
│   ├── authentication/
│   │   └── ...
│   └── ...
│
├── components/
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   └── ...
│
├── context/
│   ├── register/
│   │   ├── RegisterContext.ts
│   │   ├── RegisterProvider.tsx
│   │   ├── useRegister.ts
│   │   ├── reducer.ts
│   │   ├── initialState.ts
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── auth/
│   │   └── ...
│   └── ...
│
├── hooks/
├── services/
├── utils/
├── constants/
├── types/
├── router/
│
├── App.tsx
└── main.tsx
```

## Folder Responsibilities

  -----------------------------------------------------------------------
  Folder                    Responsibility
  -----------------------------------------------------------------------
  `assets`                  Images, icons, fonts and other static assets

  `layouts`                 Application layouts (Public, Dashboard, Auth, etc.)

  `pages`                   Route-level pages

  `features`                Business/domain-specific modules (registration, authentication, etc.)

  `components`              Shared reusable UI components

  `context`                 Global state using React Context API

  `hooks`                   Shared custom hooks

  `services`                API and service layer

  `utils`                   Shared helper functions

  `constants`               Shared application constants

  `types`                   Shared TypeScript types

  `router`                  Route configuration
  -----------------------------------------------------------------------

## Folder Guidelines

-   Keep components as close as possible to where they are used.
-   Use `index.tsx` as the main component file for pages and layouts.
-   Use `index.ts` as a barrel export where appropriate.
-   Create `data.ts`, `constants.ts`, `utils.ts`, and `types.ts` only when a feature or page actually needs them.
-   Move components to the shared `components` folder only when they are reused across multiple features or layouts.
