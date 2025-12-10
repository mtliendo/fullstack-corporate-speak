# Corporate Speak Translator - Frontend

This is the frontend application for the Corporate Speak Translator, built with Next.js.

![Corporate Speak Translator](../../project-screenshots/corporate-screenshot.png)

## Overview

This is a Next.js 16 application that serves as the frontend for the Corporate Speak Translator. Users can input casual phrases and receive polished corporate responses powered by AWS Bedrock AI.

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI
- **Icons**: Lucide React

## Backend Integration

This application integrates with a real AWS API Gateway endpoint that connects to an AWS Lambda function. The Lambda function uses AWS Bedrock with the Amazon Nova Lite model to generate corporate responses.

Unlike the `starter` branch which uses mock data, this implementation makes actual API calls to the deployed backend infrastructure.

## Key Functionality

### `handleTranslate` Function

The main translation logic is handled by the `handleTranslate` function located in `app/page.tsx`. This function:

1. Validates the input phrase
2. Makes a POST request to the AWS API Gateway endpoint
3. Sends both the context (optional) and phrase to the backend
4. Receives and displays the AI-generated corporate response

```typescript
const handleTranslate = async () => {
  if (!phrase.trim()) return

  setIsLoading(true)
  setResponse('')
  setIsCopied(false)

  const response = await fetch(
    'https://0vyy3tt0kg.execute-api.us-east-1.amazonaws.com/generate-corporate-speak',
    {
      method: 'POST',
      body: JSON.stringify({ context, phrase }),
    }
  )

  const data = await response.json()
  setResponse(data[0].text)
  setIsLoading(false)
}
```

The function sends a POST request with JSON payload containing:

- `context`: Optional context provided by the user
- `phrase`: The phrase to translate into corporate speak

The API returns an array with the generated corporate response, which is then displayed to the user.

## Development

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

**Note**: The API Gateway endpoint is configured with CORS to allow requests from `http://localhost:3000` during development.

## Building for Production

```bash
pnpm run build
pnpm run start
```
