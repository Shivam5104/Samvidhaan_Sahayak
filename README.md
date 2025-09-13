# Samvidhaan Sahayak: AI-Powered Constitutional Guide

**Samvidhaan Sahayak** is a modern, AI-driven web application designed to make the Constitution of India accessible and understandable for everyone. It serves as an interactive educational tool, leveraging the power of Google's Gemini generative AI to provide clear, contextual information about constitutional articles, legal recourse, and historical precedents.

## Core Features

The application is built with a rich set of features to provide a comprehensive learning experience:

- **AI-Powered Legal Query**: Users can describe a situation involving a potential rights violation in plain English. The AI analyzes the query and provides:
  - The single most relevant constitutional article.
  - A clear summary of that article.
  - An explanation of potential punishments for violation.
  - Guidance on legal recourse available to the user.
  - A list of relevant landmark case studies.

- **Preamble Explorer**: An interactive page that allows users to click on key terms in the Preamble of the Constitution (e.g., SOVEREIGN, SECULAR, JUSTICE) to get a detailed, AI-generated explanation of their meaning and significance.

- **Article Comparison Tool**: A powerful utility for users to compare two constitutional articles side-by-side. The AI generates a detailed analysis covering their core subject matter, relationship, potential conflicts, and judicial interpretations.

- **Constitutional Timeline**: An interactive, horizontal carousel showcasing the key milestones in the history of the Indian Constitution, from the formation of the Constituent Assembly in 1946 to recent amendments.

- **Text-to-Speech (TTS)**: For enhanced accessibility, the AI-generated responses on the query page can be read aloud, allowing users to listen to the information.

- **Founding Fathers Section**: A biographical section dedicated to the key members of the Drafting Committee who architected the Constitution.

## Technology Stack

This prototype is built using a modern, scalable, and type-safe technology stack:

- **Framework**: **Next.js 15** with the App Router
- **Language**: **TypeScript**
- **Generative AI**: **Genkit (Google's Generative AI Toolkit)** connected to the **Google Gemini** model.
- **UI Components**: **ShadCN UI**
- **Styling**: **Tailwind CSS**
- **Forms**: **React Hook Form** with **Zod** for schema validation.

## How It Works

The application leverages Next.js Server Actions to create a seamless connection between the user interface and the backend AI logic. When a user makes a request (like submitting a query or clicking on a Preamble keyword), a Server Action calls the corresponding Genkit flow. This flow communicates with the Gemini Pro model to generate a structured response, which is then passed back to the React components to be displayed to the user.

## Running the Project

To run this project locally, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Set up Environment Variables**:
    Create a `.env` file in the root of the project and add your Google AI Studio API key:
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Run the Development Servers**:
    You need to run two processes in separate terminals:
    - The Next.js frontend application:
      ```bash
      npm run dev
      ```
    - The Genkit AI flows:
      ```bash
      npm run genkit:watch
      ```
      Live Link: https://9000-firebase-studio-1751025722861.cluster-ys234awlzbhwoxmkkse6qo3fz6.cloudworkstations.dev

The application will be available at `http://localhost:9002`, and the Genkit developer UI will be at `http://localhost:4000`.
