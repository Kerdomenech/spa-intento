# Project Manager SPA

## Description
Internal project management tool built as a Single Page Application (SPA). 
It allows companies to manage projects with role-based access control, 
session persistence, and full CRUD operations via a simulated REST API.

## Technologies
- Vanilla JavaScript (ES Modules)
- Vite
- TailwindCSS
- JSON Server (simulated API)
- LocalStorage (session persistence)

## Installation
```bash
npm install
```

## Running the Project
```bash
npm run dev
```

## Running JSON Server
Open a second terminal and run:
```bash
npx json-server --watch database/db.json --port 5000
```

## Test Users

| Name         | Email             | Password | Role         |
|--------------|-------------------|----------|--------------|
| Manager      | manager@test.com  | asdasd   | manager      |
| Collaborator | user@test.com     | sasa     | collaborator |

## Project Structure