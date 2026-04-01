# Maestro Frontend

Maestro is a web application that serves as a musical portfolio and project management tool for a composer and their clients. It provides a showcase for musical works, a platform for presenting services, and a secure space for client communication and project tracking.

## Key Features

This platform is divided into three levels of access: Visitor, Client, and Administrator.

### For Visitors:
-   **Discover the Composer:** Explore the artist's presentation and musical universe.
-   **Listen to Previews:** Browse and listen to excerpts from the composer's portfolio.
-   **Contact Form:** Easily get in touch with the composer.
-   **Responsive Design:** Enjoy a seamless experience on desktop, tablet, and mobile.

### For Clients (Authenticated Users):
-   **Personal Dashboard:** Access a private area to manage projects and personal information.
-   **Submit Project Requests:** Fill out a form to request new musical compositions.
-   **Track Projects:** Monitor the status of ongoing projects (e.g., pending, in-progress, completed).
-   **Manage Profile:** Update personal and professional (company) details in the settings page.

### For the Administrator (Composer):
-   **Admin Dashboard:** A central hub to manage all aspects of the site.
-   **Content Management:** Add, update, and delete presentation sections and musical previews on the homepage and compositions page.
-   **Genre Management:** Create, update, and delete musical genres to categorize the portfolio.
-   **Project Management:** View all client projects, filter them by status, and update their progress.
-   **Client Management:** View a list of all registered clients and their details.
-   **Contact Requests:** Review and manage messages received through the contact form.

## Tech Stack

-   **Frontend:** React, Vite
-   **Routing:** React Router DOM
-   **Styling:** SCSS, React-Bootstrap
-   **API Communication:** Axios
-   **State Management:** React Context
-   **Security:** DOMPurify for sanitizing user inputs.

## Project Structure

The source code is organized to separate concerns, making the project scalable and maintainable.

```
/src
├── api/              # Functions for making API calls
├── assets/           # Static assets like images and logos
├── components/       # Reusable UI components
├── pages/            # Top-level components for each route/page
├── App.jsx           # Main application component with routing
├── main.jsx          # Entry point of the React application
├── UserContext.jsx   # React Context for user state
└── UserProvider.jsx  # Provider for user context
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later)
-   npm (or a compatible package manager)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/solenesol/maestro-front.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd maestro-front
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

### Environment Variables

Before running the application, you need to set up your environment variables.

1.  Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```

2.  Open the `.env` file and fill in the required values:
    -   `VITE_API_URL`: The base URL for the backend API (e.g., `http://localhost:3000/api`).
    -   `VITE_IMAGES_URL`: The base URL from which to serve static images (e.g., `http://localhost:3000/images/`).
    -   `VITE_BACK_URL`: The base URL of the backend, used for serving audio files (e.g., `http://localhost:3000`).

### Running the Application

-   **To start the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

## Available Scripts

In the project directory, you can run the following commands:

-   `npm run dev`: Starts the development server with Hot Module Replacement.
-   `npm run build`: Compiles the application for production into the `dist` folder.
-   `npm run lint`: Lints the source files using ESLint.
-   `npm run preview`: Serves the production build locally to preview the final app.
