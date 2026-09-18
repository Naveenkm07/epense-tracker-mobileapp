# Expense Tracker

A modern, highly-polished expense tracker built with React Native (Expo) designed to help you monitor and categorize your expenses quickly.

## Features

- **Modern & Beautiful UI/UX**: Hand-crafted layouts with shadows, Apple-like smooth typography, pie charts, and intuitive rounded cards.
- **Secure Authentication**: Integration with Clerk handles signup, login, and robust session management safely.
- **Cloud Database Integration**: Connected to Supabase with Row Level Security (RLS) guaranteeing user isolation and private data access via custom JWT injection logic.
- **Expense Summaries**: Beautiful dashboard featuring a dynamic, interactive pie chart generated using `react-native-chart-kit`.
- **Easy Entry & Import**: Create expenses manually with crisp UI inputs, or prepare to bulk import your history via Excel/CSV.
- **Google Play Store Ready**: Formatted with standard packages (`com.epenesetarcker.app`), strict adaptive icons, custom splash screens, and configured EAS build profiles.

## Setup for Development

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Environment Variables
Create a `.env` in the root folder with the following:
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=ey...
```

### 3. Start the Project
```bash
npm start
# or 
npx expo start
```
Press `a` to run on Android emulator, or `i` to run on iOS simulator.

## Google Play Store Build (EAS)

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```
2. **Login to Expo**
   ```bash
   eas login
   ```
3. **Build Android App Bundle (AAB)**
   ```bash
   eas build -p android --profile production
   ```
4. **Submit to Play Store**
   Download the generated `.aab` file and upload it directly to the Google Play Console, along with your created `PrivacyPolicy.md` (which you can host via GitHub pages or an arbitrary privacy policy hosting site).

## Security Overview

The app is secured via a strict Supabase + Clerk JWT handoff:
1. Clerk handles the identity and JWT token creation on login.
2. We query Supabase via a `createClerkSupabaseClient` factory that intercepts requests and passes the custom Clerk JWT in the headers.
3. Supabase RLS enforces `auth.uid() = user_id`, keeping each user isolated from the rest.

## Privacy Policy
A generated standard Privacy Policy is located in `PrivacyPolicy.md`. You will need to provide a public URL to this text in your Play Store console.
