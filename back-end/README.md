Here’s the README file for the backend, including the API details you provided:

---

# CodeLink Backend

Backend server for CodeLink, a platform for users to connect and manage their professional network.

---

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Environment Variables](#environment-variables)
-   [API Endpoints](#api-endpoints)
    -   [Auth APIs](#auth-apis)
    -   [Profile APIs](#profile-apis)
    -   [Connection Request APIs](#connection-request-apis)
    -   [User APIs](#user-apis)
-   [Dependencies](#dependencies)
-   [Contributing](#contributing)
-   [License](#license)

---

## Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/Atom-Atharva/Codelink.git
cd back-end
npm install
```

## Usage

Start the development server.

```bash
npm start
```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
PORT=<your_port>
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

---

## API Endpoints

### Auth APIs

-   **POST** `/signup`  
    Register a new user.

-   **POST** `/login`  
    Authenticate and log in a user.

-   **POST** `/logout`  
    Log out a user.

### Profile APIs

-   **GET** `/profile/view`  
    View user profile details.

-   **PATCH** `/profile/edit`  
    Edit user profile information.

-   **PATCH** `/profile/password`  
    Update user password.

### Connection Request APIs

_Connection status values: Ignore, Interested, Accepted, Rejected_

-   **POST** `/request/send/interested/:userId`  
    Send a connection request with an “Interested” status.

-   **POST** `/request/send/ignored/:userId`  
    Send a connection request with an “Ignored” status.

-   **POST** `/request/review/accepted/:requestId`  
    Accept a received connection request.

-   **POST** `/request/review/rejected/:requestId`  
    Reject a received connection request.

### User APIs

-   **GET** `/user/connections`  
    View connections that the user is matched with.

-   **GET** `/user/requests/received`  
    View all connection requests received by the user.

-   **GET** `/user/feed`  
    Access a personalized user feed of other users on platform.

---

## Dependencies

The project uses the following main dependencies:

-   `express`
-   `mongoose`
-   `jsonwebtoken`
-   `bcryptjs`

Refer to the `package.json` for the complete list of dependencies.

---

## Contributing

If you want to contribute to CodeLink Backend, feel free to open a pull request.

---

## License

This project is licensed under the MIT License.

---

Let me know if there’s anything more specific you’d like to add!
