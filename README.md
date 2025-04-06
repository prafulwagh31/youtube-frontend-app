# React + Vite YouTube Clone

This project is a **YouTube Clone** built using **React** and **Vite**. The application replicates key functionalities of YouTube, focusing on user authentication, video management, and interactive features such as commenting and searching. This is the **frontend** of the application and is designed to integrate with a backend that supports JWT authentication and bcrypt.js for password hashing.

---

## Live Link : [Click here](https://youtubecloneproj.netlify.app/)

## Features

- **Authentication**:

  - User signup and login using JWT and bcrypt.js.
  - Authentication state is managed using Redux Toolkit slices.

- **Video Management**:

  - Upload, edit, and delete videos.
  - Filter videos based on categories.

- **Channel Management**:

  - Create a channel (only for authenticated users).
  - Edit channel details.

- **Comment System**:

  - Add comments below videos.
  - Edit or delete comments (restricted to comment owners).

- **Navigation and Search**:

  - Sidebar with quick links and categories.
  - Search bar for video searching.

- **Error Handling**:
  - Dedicated error route page for handling 404 and other errors.

---

## Technologies Used

- **Frontend Framework**: React
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Libraries**:
  - Axios (for API requests)
  - JWT-decode (for decoding JWT tokens)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js]
- [npm]

### run the proj

- npm install
- npm run dev

## Alert / Warning

- due to use of free hosting,
  the website can be slow to fetch data from backend,
  please be patience :-)
"# youtube-frontend-app" 
