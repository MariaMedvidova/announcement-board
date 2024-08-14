# announcement-board

Welcome to the Announcement Board project! This project is a monorepo for a city announcement board application, where users can manage and display announcements for various cities. The backend handles data and API logic, while the frontend provides a user-friendly interface for interacting with the announcements.

## Project Structure
The repository is organized into two main folders:
1. Backend:
- Purpose: Manages server-side logic, including database operations, API endpoints, and data validation.
- Technologies: Node.js, Express, Knex, PostgreSQL, TypeScript, Zod, @faker-js/faker (for data generation).
- Key Components:
  - src/routes: Defines the application's routing structure.
  - src/controllers: Defines API endpoints for CRUD operations on announcements and categories.
  - src/services: Handles business logic and database interactions.
  - src/seeds: Scripts for seeding the database with initial data.
  - src/migrations: Database schema management using Knex.
  - src/types: TypeScript type definitions for entities like Announcement and Category.
  - src/validation: Validates incoming data using Zod.
  - src/config: Configuration files, including database connection settings.
2. Frontend:
- Purpose: Provides the user interface for managing announcements. Users can view, create and edit announcements.
- Technologies: React, TypeScript, CSS/SCSS for styling, Bootstrap for UI components, Axios and various libraries for enhanced functionality.
- Key Components:
  - src/components: Reusable UI components styled with CSS and Bootstrap using Styled Components.
  - src/pages: Page-level components representing different views in the application.
  - src/types: TypeScript type definitions for entities like Announcement and Category.

## API Documentation
The API documentation is available through Swagger UI at http://localhost:5000/api-docs. This provides an interactive interface to explore and test the API endpoints.

## Setup

### Prerequisites:
Ensure you have the following installed:
- Node.js (v16.14.0 or later)
- PostgreSQL (for database)
  
### Installation:

1. Clone the repository:
```bash
git clone https://github.com/user/announcement-board.git
cd announcement-board
```

3. Install dependencies:
```bash
# For the backend
cd backend
npm install

# For the frontend
cd ../frontend
npm install
```

3. Set up environment variables:
Create a .env file in the backend directory with the following content:
```bash
API_PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=announcement_board
```

4. Run the migrations to set up the database:
```bash
cd backend
npx knex migrate:latest
```

6. Generate initial data (optional):
```bash
npx knex seed:run
```

8. Start the server:
```bash
npm start
```

9.  Run the frontend:
```bash
cd ../frontend
npm start
```


## Usage

1. Backend API:
- Start the backend server and it will listen on port 5000.
2. Frontend:
- Start the frontend server and it will be available at http://localhost:3000.

