# ship_rn_starter — Implementation Plan

Analysis of **ship** (backend), **ship_flutter_starter**, and implementation plan for **ship_rn_starter** (React Native + Expo).

---

## 1. Ship API Analysis

### 1.1 Tech Stack

- **Framework:** Koa.js
- **Auth:** Cookie-based (web) / Bearer token (mobile via `X-Client-Type: mobile`)
- **Database:** MongoDB
- **WebSocket:** Socket.io (via Redis when `REDIS_URI` is set)

### 1.2 Account Endpoints (for mobile)

| Method | Endpoint | Auth | Description |
| POST | `/account/sign-in` | No | Returns `{ accessToken, user }` for mobile |
| POST | `/account/sign-up` | No | Returns `{ emailVerificationToken?, user }`, sends verification email |
| POST | `/account/sign-out` | Yes | Clears session |
| GET | `/account` | Yes | Current user |
| PUT | `/account` | Yes | Update user |
| POST | `/account/forgot-password` | No | Sends reset email, 204 on success |
| PUT | `/account/reset-password` | No | Body: `{ token, password }` |
| GET | `/account/verify-reset-token` | No | Validates token, redirects (web) — mobile uses token from deep link |
| GET/POST | `/account/verify-email` | No | Query: `?token=...` — mobile gets `{ accessToken, user }` |
| POST | `/account/resend-email` | No | Resend verification email |
| POST | `/account/sign-in/google-mobile` | No | Body: `{ idToken }` → `{ accessToken, user }` |

### 1.3 User Model (public)

```ts
{
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  avatarUrl?: string;
}
```

### 1.4 Mobile-specific behavior

- Header `X-Client-Type: mobile` required for token responses
- Sign-in/sign-up/verify-email return JSON `{ accessToken, user }` instead of setting cookies
- Token stored on client (e.g. AsyncStorage)

---

## 2. ship_flutter_starter Analysis

### 2.1 Architecture

- **Pattern:** Feature-based + Clean Architecture
- **Structure:**
  - `core/` — config, DI, theme, services, validators
  - `features/` — auth, chat, profile, users, routing, navigation
  - Per feature: `data/` (API, models, repositories), `domain/` (entities, use cases), `presentation/` (screens, providers, widgets)

### 2.2 State Management

- **Riverpod** (flutter_riverpod, hooks_riverpod, riverpod_annotation)
- **Code generation:** riverpod_generator, json_serializable
- Async state for sign-in, sign-up, account, chats, messages
- `accountProvider` — current user (AsyncValue)

### 2.3 Routing

- **go_router**
- **Redirect logic:** unauthenticated → sign-in; authenticated on public routes → home
- **Public routes:** sign-in, sign-up, forgot-password
- **Private routes:** home, profile, chats, chat/:chatId
- **Shell:** Bottom bar (flutter_floating_bottom_bar)

### 2.4 Services

- **ApiService** (Dio) — baseUrl, `X-Client-Type: mobile`, Bearer interceptor, 401 → clear token + callback
- **StorageService** (SharedPreferences) — token, refresh token
- **AuthService** — Google Sign-In

### 2.5 Screens

| Screen | Route | Notes |
| Sign In | `/sign-in` | Email + password, Google sign-in |
| Sign Up | `/sign-up` | firstName, lastName, email, password |
| Forgot Password | `/sign-in/forgot-password` | Email only (Flutter: mock impl) |
| Home | `/` | Users list (uses Ship users API) |
| Chats | `/chats` | Chat list (mock) |
| Chat Details | `/chats/:chatId` | Messages (mock) |
| Profile | `/profile` | Edit profile, sign out |

### 2.6 Auth Flow

1. Sign-up → API returns user + optional token in dev
2. Sign-in → API returns `{ accessToken, user }` → save token → navigate
3. 401 → clear token → `accountProvider` invalidated → redirect to sign-in
4. Token in `Authorization: Bearer <token>`

### 2.7 Chat

- **Mock implementation:** ChatApiMockImpl (no Ship chat API)
- Chats list, create chat, send message, delete chat
- SSE-like stream for typing simulation
- Can be swapped for real API later

---

## 3. ship_rn_starter — Recommended Architecture

### 3.1 Project Structure

```bash
ship_rn_starter/
├── app/                          # Expo Router (file-based)
│   ├── (auth)/                   # Auth stack (unauthenticated)
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   ├── forgot-password.tsx
│   │   ├── verification.tsx     # Email verification / reset token
│   │   └── reset-password.tsx    # New password with token
│   ├── (tabs)/                   # Main app (authenticated)
│   │   ├── index.tsx             # Home
│   │   ├── chats.tsx
│   │   ├── chat/[id].tsx         # Chat details
│   │   └── profile.tsx
│   ├── _layout.tsx               # Root layout + auth redirect
│   └── +not-found.tsx
├── src/
│   ├── api/                      # API layer
│   │   ├── client.ts             # Axios/fetch + interceptors
│   │   ├── auth.api.ts
│   │   └── constants.ts
│   ├── auth/                     # Auth state & hooks
│   │   ├── auth-context.tsx
│   │   ├── use-auth.ts
│   │   └── storage.ts
│   ├── features/
│   │   ├── chat/
│   │   │   ├── api/
│   │   │   ├── hooks/            # TanStack Query hooks
│   │   │   └── types.ts
│   │   └── profile/
│   ├── hooks/
│   └── lib/                      # Utils, constants
├── components/
│   └── ui/                       # react-native-reusables
├── constants/
└── package.json
```

### 3.2 State Management

#### TanStack Query (React Query)

- Use for server state: auth, user, chats, messages
- Mutations: sign-in, sign-up, sign-out, forgot-password, reset-password, update profile
- Queries: current user, chats list, messages
- Cache invalidation on mutations
- Integrates well with React Native and Expo

#### Auth state

- **Option A:** TanStack Query `useQuery(['account'])` + `useMutation` for sign-in/out — single source of truth
- **Option B:** Zustand or React Context for minimal client state (token, user)
- **Recommendation:** TanStack Query for account + simple in-memory/AsyncStorage persistence for token. On app start: if token exists → fetch account; if 401 → clear token and redirect to sign-in.

### 3.3 Additional Libraries

| Purpose | Package | Notes |
| HTTP client | `axios` or `fetch` | Axios for interceptors |
| Async storage | `@react-native-async-storage/async-storage` | Token persistence |
| TanStack Query | `@tanstack/react-query` | Server state |
| Forms & validation | `react-hook-form` + `zod` | Same as Ship web |
| Deep linking | `expo-linking` | For verify-email, reset-password tokens |
| Google Auth | `@react-native-google-signin/google-signin` or `expo-auth-session` | For Google sign-in |

### 3.4 API Client

```ts
// src/api/client.ts
- baseURL: process.env.EXPO_PUBLIC_API_URL (from .env per environment)
- headers: { 'Content-Type': 'application/json', 'X-Client-Type': 'mobile' }
- Request: add Authorization: Bearer <token> from AsyncStorage
- Response 401: clear token, trigger redirect to sign-in
```

---

## 4. Implementation Plan — Phases

### Phase 1: Core Infrastructure

1. **API client**
   - Axios instance with base URL, `X-Client-Type: mobile`
   - Request interceptor: add Bearer token from AsyncStorage
   - Response interceptor: on 401 — clear storage, redirect to sign-in (via callback/store)
2. **Storage**
   - AsyncStorage wrapper for `accessToken`
3. **TanStack Query**
   - QueryClientProvider
   - Default options (staleTime, retry)
4. **Environment**
   - `EXPO_PUBLIC_API_URL` from env files (dev/staging/production)
   - See Section 8 for full setup

### Phase 2: Auth

1. **Auth API**
   - `signIn`, `signUp`, `signOut`, `getAccount`
   - `forgotPassword`, `resetPassword`, `verifyEmail`, `resendEmail`
   - `signInWithGoogle` (idToken)
2. **Auth hooks**
   - `useSignIn`, `useSignUp`, `useSignOut`, `useAccount`
   - `useForgotPassword`, `useResetPassword`, `useVerifyEmail`
3. **Auth redirect**
   - Root layout: check auth state → redirect to `/(auth)/sign-in` or `/(tabs)`
4. **Screens**
   - Sign In (email, password, link to Sign Up / Forgot Password)
   - Sign Up (firstName, lastName, email, password)
   - Forgot Password (email)
   - Verification (token from query/deep link → verify email or validate reset token)
   - Reset Password (token from query, new password)

### Phase 3: Main App Shell

1. **Tabs layout**
   - Home, Chats, Profile (similar to Flutter bottom bar)
2. **Auth guard**
   - Redirect unauthenticated users from `/(tabs)/*` to sign-in

### Phase 4: Screens

1. **Home**
   - Users list (GET `/users`) or placeholder
2. **Chats**
   - Mock chats list (like Flutter)
3. **Chat Details**
   - Mock chat UI, send message, typing indicator
4. **Profile**
   - Display/edit user (PUT `/account`), sign out

### Phase 5: Chat Feature (Mock — same as Flutter)

1. **Mock API layer** (chats, messages) — like Flutter's ChatApiMockImpl
2. TanStack Query hooks for mock data
3. Screens wired to hooks
4. Later: optional swap to real Ship chat API when merged

### Phase 6: Polish

1. Google Sign-In (expo-auth-session or @react-native-google-signin)
2. Error handling (toast/snackbar)
3. Loading states
4. Deep linking for verify-email and reset-password

---

## 5. Routing Strategy (Expo Router)

### Suggested structure

```bash
app/
├── _layout.tsx              # Root: QueryClientProvider, auth redirect
├── (auth)/
│   ├── _layout.tsx         # Auth stack (no tabs)
│   ├── sign-in.tsx
│   ├── sign-up.tsx
│   ├── forgot-password.tsx
│   ├── verification.tsx    # ?type=email|reset&token=...
│   └── reset-password.tsx  # ?token=...
├── (tabs)/
│   ├── _layout.tsx         # Tab navigator
│   ├── index.tsx            # Home
│   ├── chats.tsx
│   └── profile.tsx
└── chat/[id].tsx           # Chat details (outside tabs, or nested)
```

### Redirect logic (`_layout.tsx`)

```ts
const { data: user, isLoading } = useAccount();

if (isLoading) return <SplashScreen />;

const isAuthRoute = pathname.startsWith('/(auth)');
if (!user && !isAuthRoute) return Redirect href="/(auth)/sign-in" />;
if (user && isAuthRoute) return <Redirect href="/(tabs)" />;

return <Slot />;
```

---

## 6. State Management Summary

| Data | Tool | Example |
| Account (user) | TanStack Query | `useQuery({ queryKey: ['account'], queryFn: getAccount })` |
| Sign-in/out | TanStack Query | `useMutation` + invalidate `['account']` |
| Token | AsyncStorage | Persist on sign-in, clear on sign-out/401 |
| Chats list | TanStack Query | `useQuery(['chats'], getChats)` |
| Messages | TanStack Query | `useQuery(['chats', id, 'messages'], getMessages)` |
| Local UI state | useState/useReducer | Forms, modals |

No Zustand/Redux required for this scope. TanStack Query covers server state and cache; auth redirect uses account query state.

---

## 7. Comparison: Flutter vs RN Plan

| Aspect | Flutter | RN (Plan) |
| Architecture | Feature-based + Clean Arch | Feature-based, simpler layers |
| State | Riverpod | TanStack Query |
| Routing | go_router | Expo Router |
| API | Dio | Axios |
| Storage | SharedPreferences | AsyncStorage |
| Forms | Manual + validators | react-hook-form + zod |
| UI | shadcn_flutter | react-native-reusables |
| Chat | Mock | Mock (same approach) |
| Environments | `--dart-define API_URL=...` | `.env.*` + `dotenv-cli` + EAS profiles |

---

## 8. Environments (dev, staging, production)

Goal: run dev server or simulator with different API URLs and app identifiers for each environment.

### 8.1 Environment files

```bash
ship_rn_starter/
├── .env                    # Default / dev (commit to repo as template)
├── .env.development        # Local dev (optional override)
├── .env.staging            # Staging config
├── .env.production         # Production config (templates only)
└── .env.local              # Machine-specific overrides (gitignore)
```

**Variables per env:**

| Variable | Dev | Staging | Production |
| `EXPO_PUBLIC_API_URL` | `http://localhost:3001` | `https://api-staging.example.com` | `https://api.example.com` |
| `EXPO_PUBLIC_APP_ENV` | `development` | `staging` | `production` |

### 8.2 Loading env files

Expo loads `.env` by default. For `.env.staging` / `.env.production` use:

- **Option A:** `dotenv-cli` — `dotenv -e .env.staging -- expo start`
- **Option B:** `expo-env` or similar — pass env file via script

### 8.3 `package.json` scripts

```json
{
  "scripts": {
    "start": "expo start",
    "start:dev": "expo start",
    "start:staging": "dotenv -e .env.staging -- expo start",
    "start:production": "dotenv -e .env.production -- expo start",
    "ios": "expo start --ios",
    "ios:dev": "expo start --ios",
    "ios:staging": "dotenv -e .env.staging -- expo start --ios",
    "ios:production": "dotenv -e .env.production -- expo start --ios",
    "android": "expo start --android",
    "android:staging": "dotenv -e .env.staging -- expo start --android"
  }
}
```

### 8.4 `app.config.js` (optional — app name per env)

Use dynamic config to show env in app name (for debugging):

```js
// app.config.js
const IS_DEV = process.env.EXPO_PUBLIC_APP_ENV === 'development';
const IS_STAGING = process.env.EXPO_PUBLIC_APP_ENV === 'staging';

export default {
  ...require('./app.json').expo,
  name: IS_STAGING ? 'Ship RN (Staging)' : IS_DEV ? 'Ship RN (Dev)' : 'Ship RN',
};
```

### 8.5 EAS Build profiles (`eas.json`)

For cloud builds (EAS Build), set env in profiles:

```json
{
  "build": {
    "development": {
      "env": {
        "EXPO_PUBLIC_APP_ENV": "development",
        "EXPO_PUBLIC_API_URL": "http://localhost:3001"
      }
    },
    "staging": {
      "env": {
        "EXPO_PUBLIC_APP_ENV": "staging",
        "EXPO_PUBLIC_API_URL": "https://api-staging.example.com"
      },
      "distribution": "internal"
    },
    "production": {
      "env": {
        "EXPO_PUBLIC_APP_ENV": "production",
        "EXPO_PUBLIC_API_URL": "https://api.example.com"
      }
    }
  }
}
```

### 8.6 Implementation checklist

1. Add `dotenv-cli` as dev dependency
2. Create `.env.development`, `.env.staging`, `.env.production` (with placeholders)
3. Add scripts to `package.json`
4. Use `process.env.EXPO_PUBLIC_API_URL` in API client (already in Phase 1)
5. Add `app.config.js` if you want different app names per env
6. Add `eas.json` when using EAS Build

### 8.7 Simulator usage

- **Dev:** `npm run start:dev` or `npm run ios:dev` — connects to `localhost`
- **Staging:** `npm run start:staging` or `npm run ios:staging` — connects to staging API
- **Production:** `npm run start:production` — connects to production API (use with care)

---

## 9. Next Steps

1. Add dependencies: `@tanstack/react-query`, `axios`, `@react-native-async-storage/async-storage`, `react-hook-form`, `zod`, `@hookform/resolvers`, `dotenv-cli`
2. Implement Phase 1 (API client, storage, Query setup)
3. Implement Phase 1.5 (environments: .env files + scripts)
4. Implement Phase 2 (auth API, hooks, screens)
5. Implement Phase 3–4 (tabs, home, chats, profile)
6. Implement Phase 5 (chat mock)
7. Implement Phase 6 (Google Sign-In, deep links, polish)
