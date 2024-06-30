# Fitness Mobile App

## Overview

Welcome to the Fitness Mobile App repository! This application is built using React Native and Expo Go for the frontend, with a backend powered by Node.js and Express.js. MongoDB is used as the database to store user and exercise data. The exercise dataset is sourced from the public repository: [free-exercise-db](https://github.com/yuhonas/free-exercise-db).

## Features

- **User Authentication**: Secure user login and registration.
- **Exercise Database**: Extensive collection of exercises with descriptions and images.
- **Workout Plans**: Create and manage personalized workout plans.
- **Progress Tracking**: Track your workout progress over time.
- **Award System**: Earn awards for achieving fitness milestones.
- **Calories Tracking**: Monitor your calorie intake and expenditure.
- **Responsive Design**: Smooth and intuitive user interface optimized for mobile devices.

## Tech Stack

- **Frontend**: React Native, Expo Go
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Testing**: Postman for API testing
- **Version Control**: Git and GitHub

## Project Structure

.
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── server.js
├── frontend
│ ├── assets
│ ├── components
│ ├── screens
│ ├── App.js
├── .gitignore
├── README.md
├── package.json
└── yarn.lock


## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm or yarn
- MongoDB
- Expo CLI

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/fitness-app.git
   cd fitness-app/backend
Install the dependencies:

bash
Copier le code
npm install
Create a .env file in the backend directory and add your MongoDB URI:

env
Copier le code
MONGO_URI=your-mongodb-uri
Start the server:

bash
Copier le code
node server.js
Frontend Setup
Navigate to the frontend directory:

bash
Copier le code
cd ../frontend
Install the dependencies:

bash
Copier le code
npm install
Start the Expo server:

bash
Copier le code
npm start
Usage
Open the Expo Go app on your mobile device.
Scan the QR code displayed in the terminal after running expo start.
Register or log in to start using the app.
API Endpoints
User Authentication

POST /api/users/register - Register a new user
POST /api/users/login - User login
Exercises

GET /api/exercises - Get all exercises
GET /api/exercises/:id - Get a specific exercise
Workouts

POST /api/workouts - Create a new workout
GET /api/workouts - Get all workouts
GET /api/workouts/:id - Get a specific workout
Awards

GET /api/awards - Get all awards
POST /api/awards - Create a new award
Calories Tracking

POST /api/calories - Add calorie intake or expenditure
GET /api/calories - Get all calorie records
Screenshots
Place your screenshots here:




Contributing
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Thanks to yuhonas for the free-exercise-db repository.
