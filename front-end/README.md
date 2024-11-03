# CodeLink Front-End

Welcome to the CodeLink Front-End project! This README provides setup and usage details for the project.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Directory Structure](#directory-structure)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Technologies Used](#technologies-used)
-   [Contributing](#contributing)
-   [License](#license)

## Introduction

CodeLink is a collaborative platform designed to connect developers and allow them to share and work on code together. This repository contains the front-end code, built with a modern development stack to deliver a responsive and interactive user experience.

## Features

-   **User Authentication**: Secure login and signup functionality with cookie-based session management.
-   **User Profiles**: Users can edit their profile information.
-   **Connections**: Send, accept, and manage connection requests.
-   **Feed and Posts**: Interactive feed displaying user posts and updates.
-   **Real-time Data Handling**: Fetches data from APIs using cookies to maintain session security.
-   **Global State Management**: Centralized state management with Redux for smooth data flow across components.

## Directory Structure

The project directory structure is as follows:

```
codelink-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ...
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Profile.js
│   │   ├── Feed.js
│   │   └── Connections.js
│   ├── redux/
│   │   ├── store.js
│   │   ├── slices/
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
├── tailwind.config.js
└── README.md
```

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Atom-Atharva/Codelink.git
    ```
2. Navigate to the project directory:
    ```bash
    cd front-end
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create `.env` file for required environment variables.

## Usage

To start the development server locally:

```bash
npm run dev
```

This will launch the app in your browser at `http://localhost:5173`.

## Technologies Used

-   **Vite**: A fast build tool optimized for modern web projects.
-   **React**: For building a component-based, interactive UI.
-   **Tailwind CSS**: A utility-first CSS framework for styling.
-   **DaisyUI**: A Tailwind CSS-based component library.
-   **Axios**: For making API requests, configured to support secure cookie handling.
-   **Redux**: State management library for maintaining application-wide state.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit:
    ```bash
    git commit -m "Add your commit message"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---
