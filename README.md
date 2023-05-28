# Welcome to New Chimes DB!

## Description

This is a project meant to upgrade and modernize the internal web tools for the Cornell Chimes. It will consolidate the Database inspection (concert history, song library, playing stats), concert logging, and song entry tasks we do day-to-day. It will implement the UI designed by Chenchen Lu (CLL '23).

In essence, this is a CRUD app - Create, Read, Update, Delete. As such, it has a Database that contains the data itself, a Backend API, and a Frontend that presents the data and allows users to interact with and modify it.

## Implementation

This is a Node.js project.

**Database** is a relational model implemented in SQLite with Prisma. It is quite small compared to most real-life usages so it fits in a SQLite file.

**Backend** uses the Express library for the REST routes.

**Frontend** is written in React with the Material UI library.

## Usage

In order for the app to run, there must be a Frontend process and a Backend process.
* The Backend process holds the Database itself and fields HTTP Requests using a REST API.
* The Frontend process holds the webpages and makes HTTP Requests to the Backend process.

### Prerequisites
* **Node.js and NPM (Node Package Manager)** - [Install Link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### 1 - Run the Frontend Process

Setup:
1. Clone this repo to your local workspace
2. Run the command `npm install` (this installs dependent Node.js packages/libraries)

Run:
1. Run the command `npm run start` to start the frontend process
2. Navigate to http://localhost:3000/ in your browser of choice

That's it! 

*However*, there must be a process running for the backend in order for you to see any data. If not, your page will lack content. This is set up by a proxy to port 3030  in the ways described [in this article](https://dev.to/salarc123/how-to-connect-a-react-frontend-with-a-nodejs-express-backend-50i9). To run the backend, choose *one* of the following options:

### 2.1- Backend Option 1 - Development w Local Backend (Recommended)

1. Clone the backend repo [here](https://github.com/jenniferturney/chimes-db-prototype) to your local workspace.
2. In `src/index.js` of the **Backend**, specify at which port you want it to listen on. Since the frontend is using port 3000, make sure it is something other than 3000. It should be set to 3030 by default
3. In the **Frontend**, make sure that the "proxy" field in `package.json` matches the port on which the **Backend** is listening. This should be 3030 by default.
4. In a different terminal than the Frontend process, run the command `npm run start`

### 2.2 - Backend Option 2 - Development with fake Backend in Frontend Repo (Deprecated)

The Frontend Repo contains files named `fakeDB.js` and `server.js`. These were temporary placeholders so that we could start programming HTTP requests into the frontend. These are now out of date and probably no longer work.

1. In a separate terminal from your frontend process, navigate to the frontend repo and run the command `npm run serverStart`. This will kick off the fake server listening on port 3030.

### 2.3 - Backend Option 3 - Real Server (Not yet in existence)

Eventually, the server will have to be hosted somewhere when the app is deployed. We do not have this yet.

# [Auto Generated, Ignore for now] - Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
