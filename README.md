# School Attendance Project

Welcome to the E-scuela project! This README provides instructions on how to set up and start the project, as well as how to seed the database with initial data.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

## Getting Started

1. **Clone the Repository:**


2. **Install Dependencies:**

- Navigate to the root directory of the project and run the following command to install the necessary dependencies:
  ```
  npm install
  ```

3. **Environment Variables:**
- Create a `.env` file in the root directory and set the necessary environment variables. Here's an example of what your `.env` file might look like:
  ```env
  DB_NAME=your_database_name
  DB_USER=your_database_user
  DB_PASSWORD=your_database_password
  DB_HOST=your_database_host
  ```

4. **Database Setup:**
- Populate the database with the necessary tables by running the following command:
  ```
  npx sequelize db:seed:all --config src/config/config.js --seeders-path src/seeders
  ```