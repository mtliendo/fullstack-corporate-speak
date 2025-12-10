# Corporate Speak Translator - Frontend

This is the frontend application for the Corporate Speak Translator, built with Next.js.

![Corporate Speak Translator](../../project-screenshots/corporate-screenshot.png)

## Overview

This is a Next.js 16 application that serves as the frontend for the Corporate Speak Translator. Users can input casual phrases and receive polished corporate responses.

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI
- **Icons**: Lucide React

## Mock Data

Currently, this application uses **mock data** for demonstration purposes. The translation functionality simulates an API call and returns one of several predefined corporate responses. This allows you to see the application in action without requiring backend infrastructure.

In the `starter` branch, the `handleTranslate` function in `app/page.tsx` uses mock responses. The function simulates a network delay and randomly selects from a set of pre-written corporate phrases.

## Key Functionality

### `handleTranslate` Function

The main translation logic is handled by the `handleTranslate` function located in `app/page.tsx`. This function:

1. Validates the input phrase
2. Simulates an API call with a loading state
3. Returns a random corporate response from the mock data array
4. Updates the UI with the translated response

```typescript
const handleTranslate = async () => {
  if (!phrase.trim()) return

  setIsLoading(true)
  setResponse('')
  setIsCopied(false)

  // Simulate API call with mock data
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const randomResponse =
    mockResponses[Math.floor(Math.random() * mockResponses.length)]
  setResponse(randomResponse)
  setIsLoading(false)
}
```

## Development

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Building for Production

```bash
pnpm run build
pnpm run start
```
