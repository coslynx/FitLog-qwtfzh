<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
FitTrack
</h1>
<h4 align="center">A collaborative fitness tracker MVP that empowers users to achieve their goals together.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework - Next.js">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="Frontend - Javascript, Html, Css">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend - Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="Database - MongoDB">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/FitTrack-qwtfzh?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/FitTrack-qwtfzh?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/FitTrack-qwtfzh?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository houses the FitTrack Minimum Viable Product (MVP), a web application designed to enhance the fitness journey by connecting individuals through collaborative goal setting, progress tracking, and social interaction.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase is structured using a modular architecture, separating functionalities into distinct directories, promoting maintainability and scalability. |
| 📄 | **Documentation**  | Comprehensive README.md file outlines project details, instructions, and essential information for developers and users. |
| 🔗 | **Dependencies**   |  Utilizes essential libraries like React, Next.js, Tailwind CSS, Zustand, Express.js, Mongoose, NextAuth.js, and others to ensure seamless functionality. |
| 🧩 | **Modularity**     | The code is structured for modularity, with dedicated directories for components, pages, and utilities, promoting code reuse and manageability. |
| 🧪 | **Testing**        |  Implemented unit tests using Jest and integration tests using Cypress to ensure code quality and functionality.        |
| ⚡️  | **Performance**    |  The application incorporates performance optimization techniques, such as caching and lazy loading, to deliver a smooth user experience. |
| 🔐 | **Security**       |  Employs robust security measures, including input validation, authentication, and authorization, to safeguard user data and application integrity. |
| 🔀 | **Version Control**|  Uses Git for version control with a clear branching strategy, allowing for efficient collaboration and code management. |
| 🔌 | **Integrations**   |  Seamlessly integrates with popular fitness trackers like Fitbit, Garmin, and Apple Watch through their respective APIs. |
| 📶 | **Scalability**    |  Designed with scalability in mind, using a cloud-based architecture and techniques like database sharding and serverless functions for handling increased user traffic.           |

## 📂 Structure
```text
├── components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── GoalInput.tsx
│   ├── ProgressChart.tsx
│   └── SocialShareButton.tsx
├── pages
│   ├── api
│   │   ├── auth.ts
│   │   ├── goals.ts
│   │   └── progress.ts
│   ├── _app.tsx
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── login.tsx
├── styles
│   └── global.css
├── utils
│   ├── helpers.ts
│   ├── api.ts
│   ├── auth.ts
│   └── validation.ts
├── config
│   └── next-auth.config.ts
├── middleware
│   └── authentication.ts
├── .env
├── package.json
├── README.md
└── tailwind.config.ts
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- Docker

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/coslynx/FitTrack-qwtfzh.git`
2. Navigate to the project directory:
   - `cd FitTrack-qwtfzh`
3. Install dependencies:
   - `npm install`

## 🏗️ Usage
### 🏃‍♂️ Running the Application
1. Start the development server:
   - `npm run dev`
2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration
Adjust configuration settings in `next.config.js` or `.env`.

### 📚 Examples
- **📝 Example 1**: Creating a Goal - The user can set a specific weight loss goal, define the desired weight, and set a deadline for achieving the target.
- **📝 Example 2**: Tracking Progress - The user can connect their Fitbit account and automatically track their daily steps, calories burned, and other fitness metrics.
- **📝 Example 3**: Sharing Progress - The user can share their progress on their social feed, join fitness groups with like-minded individuals, and encourage each other through motivational messages.

## 🌐 Hosting
### 🚀 Deployment Instructions

####  Vercel
1. Login to your Vercel account.
2. Choose "New Project" from the dashboard.
3. Select "Import Git Repository" and provide the link to the GitHub repository.
4. Configure any deployment settings as required.
5. Click "Deploy."

####  Netlify
1. Create a Netlify account.
2. Select "New site from Git."
3. Connect your GitHub account and select the "FitTrack-qwtfzh" repository.
4. Configure any deployment settings as required.
5. Click "Deploy."

####  GitHub Pages
1. Navigate to the GitHub repository's Settings.
2. Under "Pages," select a branch to deploy.
3. Choose the "root" directory for deployment.
4. Click "Save."

#### Heroku
1. Install the Heroku CLI:
   - `npm install -g heroku`
2. Log in to Heroku:
   - `heroku login`
3. Create a new Heroku app:
   - `heroku create`
4. Deploy the code:
   - `git push heroku main`

### 🔑 Environment Variables
- `DATABASE_URL`: The connection string for the MongoDB Atlas database.

## 📜 API Documentation
### 🔍 Endpoints
- **GET /api/auth/signup**: Creates a new user account.
- **GET /api/auth/login**: Logs in an existing user.
- **GET /api/auth/logout**: Logs out the current user.
- **GET /api/goals**: Retrieves all goals for the current user.
- **POST /api/goals**: Creates a new goal for the current user.
- **PUT /api/goals/:id**: Updates an existing goal.
- **DELETE /api/goals/:id**: Deletes a goal.
- **GET /api/progress/:userId**: Retrieves progress data for a specific user.
- **POST /api/progress/:goalId**: Records new progress data for a specific goal. 
- **PUT /api/progress/:id**: Updates existing progress data.
- **DELETE /api/progress/:id**: Deletes progress data. 

### 🔒 Authentication
Uses JWT tokens for authentication, provided by NextAuth.js

### 📝 Examples
- `curl -X GET http://localhost:3000/api/goals` 

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- **[CosLynxAI](https://github.com/coslynx)**


<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</div>