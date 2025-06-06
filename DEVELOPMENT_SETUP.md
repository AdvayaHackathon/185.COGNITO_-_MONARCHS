# Getting Started with Trovio - Unveil the Mysteries

Welcome to the Trovio team! This document outlines the basic steps to get your local development environment set up and start working on the Trovio project, located within this repository under the `trovio/` directory.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

* **Node.js:** (Ideally the latest LTS version. You can check your version with `node -v`). We recommend using a Node.js version manager like [nvm](https://github.com/nvm-sh/nvm) (for macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) to easily switch between Node.js versions if needed.
* **npm:** (Check your version with `npm -v`).

## Initial Setup

1.  **Clone the Organization Repository:**
    First, clone the main organization repository to your local machine using Git:
    ```bash
    git clone https://github.com/AdvayaHackathon/185.COGNITO_-_MONARCHS.git
    cd "185.COGNITO_-_MONARCHS"
    ```


2. **Navigate to the Project Directory:**
    Change your current directory to the `trovio/` folder within the cloned repository:
    ```bash
    cd trovio
    ```

3. **Install Dependencies:**
    Navigate into the `trovio/` directory in your terminal and install the necessary dependencies using npm:
    ```bash
    npm install
    ```
    This command will download and install all the libraries and packages required for the project, as specified in the `trovio/package.json` file.

## Running the Development Server

Trovio uses Next.js with **TypeScript**, **Tailwind CSS**, and the **App Router**. To start the local development server from within the `trovio/` directory:

```bash
npm run dev
```

This command will start the Next.js development server. You should be able to view the application in your web browser, usually at http://localhost:3000. Any changes you make to the codebase will typically be hot-reloaded, meaning your browser will automatically update to reflect the changes without a full manual refresh.

## Key Technologies
- **Next.js**: The React framework we are using for building Trovio with the App Router (`app/` directory).
- **TypeScript**: Provides static typing for enhanced code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapid styling.
- **ESLint**: Used for linting our code to ensure consistency and catch potential errors. You can run it from the trovio/ directory with:

```bash
npm run lint
```

- **Prettier**: While not explicitly installed by default with `create-next-app`, it's highly recommended to add it for code formatting. If you choose to add it later, you can run it with the configured command (usually `npm run format`).
- **Google Places API (New)**: The API we will be using to fetch data about places to help users unveil the mysteries of their destinations. You will need to configure API keys as discussed in the project documentation.

## Project Structure (Inside `trovio/`)

```
trovio/
├── public/
├── src/
│   ├── app/             // Frontend (React components, pages, layouts, API routes)
│   │   ├── (api)/       // Dedicated directory for your backend API routes
│   │   │   └── places/
│   │   │       └── route.ts   // Example API route for places data
│   │   ├── components/    // Reusable frontend components
│   │   ├── layout.tsx
│   │   ├── page.tsx       // Your main application page(s)
│   │   ├── ... (other frontend routes and components)
│   ├── lib/             // Utility functions, API clients, database connections, etc. (shared or backend-specific)
│   │   ├── places.ts    // Frontend-specific Places API client (if needed)
│   │   ├── api-utils.ts // Utility functions for your backend API routes
│   │   ├── db.ts        // Database connection logic (if you have one)
│   │   ├── auth.ts      // Authentication logic
│   │   └── ... (other shared or backend utilities)
│   ├── models/          // Data models/schemas (can be shared or backend-specific)
│   │   └── place.ts
│   ├── services/        // Backend business logic (can be an alternative to parts of 'lib')
│   │   └── places.ts    // Backend logic for fetching/processing places data
│   ├── utils/           // Generic utility functions (shared)
│   │   └── helpers.ts
│   ├── middleware.ts    // Middleware for handling requests
│   ├── ... (other frontend-related files like global CSS, etc. at the src level)
├── styles/            // Global CSS files (if not using Tailwind exclusively)
├── eslint.config.mjs
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tsconfig.json
└── ... (other configuration files)
```

## Workflow: Development on `develop` Branch

**Important**: All active development work for Trovio will be done on the `develop` branch within the `trovio/` directory. The `main` branch is reserved for stable, working versions of the application that are ready for demonstration or potential deployment.

1. **Checkout the `develop` Branch**:
First, navigate to the `trovio/` directory and then switch to the `develop` branch:

```bash
cd trovio
git checkout develop
git pull origin develop
```

2. **Create a Feature Branch**: Before starting work on a new feature or bug fix, create a new branch from the `develop` branch:

```bash
git checkout -b feature/[your-feature-name]
```

Replace `[your-feature-name]` with a descriptive name for your branch.

3. **Develop Your Code**: Make your changes and implement the required functionality within the `trovio/` directory. Follow the project's coding conventions and best practices. Utilize ESLint and Prettier (if added) to maintain code quality and style.

4. **Test Your Code**: Thoroughly test your changes to ensure they work as expected and don't introduce any regressions.

5. **Commit Your Changes**: Commit your changes with clear and concise commit messages:

```bash
git add .
git commit -m "feat: Implement [brief description of your feature]"
```

6. **Push Your Branch**: Push your branch to the remote repository:

```bash
git push origin feature/[your-feature-name]
```

7. **Create a Pull Request**: Once your work is complete and tested, create a pull request (PR) from your feature branch to the `develop` branch on the repository platform. Provide a clear description of your changes in the PR.

8. **Code Review**: Your code will be reviewed by other team members. Address any feedback and make necessary changes.

9. **Merge to `develop`**: Once the PR is approved, it will be merged into the `develop` branch.

Merging to `main`: Only designated team members will be responsible for merging tested and working versions from the `develop` branch into the `main` branch when a stable release or demonstration version is ready to help users unveil the mysteries of their travels.

## Further Information

More detailed documentation on specific aspects of the project (like API key setup, component guidelines, etc.) will be provided separately or can be found within the `trovio/docs/` directory (if one exists) or other relevant locations.