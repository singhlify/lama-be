# Project Title

This is a JavaScript project that uses pnpm for package management. It's a web application with a structured layout, including controllers, models, routes, and utility functions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and pnpm installed on your machine. If you don't have them installed, you can download Node.js from [here](https://nodejs.org/en/download/) and pnpm from [here](https://pnpm.io/installation).

### Installing

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `pnpm install` to install all the dependencies.

## Project Structure

The project has the following structure:

```
.
├── app.js
├── index.js
├── src
│   ├── controllers
│   │   ├── user.controllers.js
│   │   ├── file.controllers.js
│   │   └── ...
│   ├── models
│   │   ├── user.model.js
│   │   ├── file.model.js
│   │   └── ...
│   ├── routes
│   │   ├── user.routes.js
│   │   ├── file.routes.js
│   │   └── ...
│   ├── middlewares
│   │   ├── auth.middlewares.js
│   │   ├── multer.middlewares.js
│   │   └── ...
│   └── utils
│       └── ...
└── ...
```

## Running the Application

To run the application, use the following command in the terminal:

```sh
node app.js
```

## Built With

- [Node.js](https://nodejs.org/en/) - The runtime environment
- [pnpm](https://pnpm.io/) - Dependency Management
