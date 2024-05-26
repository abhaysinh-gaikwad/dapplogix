# Blog Web App

This is a full-stack blog web application where users can register, log in, create, read, update, and delete blog posts. Users can also comment on and like blog posts.

## Features

- User authentication (registration, login, and logout)
- Create, read, update, and delete blog posts
- Comment on and like blog posts
- Responsive design using Chakra UI
- Dark mode toggle

## Tech Stack

- **Frontend:** React, Chakra UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   `git clone https://github.com/yourusername/blog-web-app.git`
   `cd blog-web-app`

2. Install dependencies for the backend:
   `cd server`
   `npm install`

3. Install dependencies for the frontend:
   `cd ../client`
   `npm install`

### Environment Variables

Create a `.env` file in the `server` directory with the following environment variables:
`PORT=5000`
`MONGO_URI=your_mongodb_connection_string`
`JWT_SECRET=your_jwt_secret`

### Running the Application

1. Start the backend server:
   `cd server`
   `npm start`

2. Start the frontend development server:
   `cd ../client`
   `npm start`

3. Open your browser and navigate to http://localhost:3000.

## Folder Structure
```
blog-web-app/
├── client/ # Frontend code
│ ├── public/
│ └── src/
│ ├── components/ # React components
│ ├── pages/ # React pages
│ ├── App.js
│ ├── index.js
│ └── ...
├── server/ # Backend code
│ ├── controllers/ # Controller functions
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── middleware/ # Express middleware
│ ├── server.js
│ └── ...
├── README.md
└── package.json
```
## Usage

- **Register:** Navigate to `/register` to create a new account.
- **Login:** Navigate to `/login` to log into your account.
- **Create a Blog Post:** After logging in, you can create a new blog post by clicking the "Add Blog" button.
- **Like and Comment:** You can like and comment on any blog post.

## Components

- **Nav.js:** The navigation bar component that includes:
  - A dark mode toggle button
  - Login/Register buttons when the user is not logged in
  - User avatar with a dropdown menu (Profile and Logout options) when the user is logged in
- **Home.js:** The main page component that fetches and displays all blog posts, with functionality to like and comment on posts.
- **BlogForm.js:** A modal form component to create a new blog post.
- **CommentForm.js:** A form component to add a new comment to a blog post.
- **Register.js:** The registration page component.
- **Login.js:** The login page component.

## API Endpoints

- **User Routes**
  - `POST /users/register`: Register a new user
  - `POST /users/login`: Log in a user
- **Blog Routes**
  - `GET /blogs`: Get all blog posts
  - `POST /blogs`: Create a new blog post
  - `PATCH /blogs/:id`: Update a blog post
  - `DELETE /blogs/:id`: Delete a blog post
  - `PATCH /blogs/likes/:id`: Like a blog post
- **Comment Routes**
  - `GET /comments/blogs/:blogId`: Get all comments for a blog post
  - `POST /comments/:blogId`: Add a comment to a blog post

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

