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

src/
├── components/
│   └── layout.js
├── controllers/
│   ├── login.controller.js
│   ├── dashboard.controller.js
│   └── projects.controller.js
├── router/
│   └── routes.js
├── services/
│   ├── api.js
│   └── loginUser.js
├── views/
│   ├── loginView.js
│   ├── dashboardView.js
│   ├── projectsView.js
│   └── notFound.js
├── main.js
└── style.css
database/
└── db.json

## Role Permissions

| Action              | Manager | Collaborator |
|---------------------|---------|--------------|
| View all projects   | ✅      | ❌           |
| View own projects   | ✅      | ✅           |
| Create project      | ✅      | ❌           |
| Edit project        | ✅      | ❌           |
| Delete project      | ✅      | ❌           |
| Update own status   | ✅      | ✅           |

## Technical Decisions
- **SPA routing** is handled with `history.pushState` and a custom router, 
  avoiding full page reloads.
- **Session persistence** uses `localStorage` to keep the user logged in 
  after refreshing the page.
- **Role-based access** is enforced both in the router (redirect) and in 
  the UI (conditional rendering of buttons).
- **JSON Server** runs on port 5000 and acts as the REST API backend.
- **Fetch API** is used for all HTTP requests (GET, POST, PUT, PATCH, DELETE).

