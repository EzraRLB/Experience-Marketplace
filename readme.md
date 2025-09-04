# Experience Marketplace

A full-stack web application for managing and browsing experiences, built with Flask backend and React frontend.

## Tech Stack

**Backend:**
- Flask 3.0.3
- Flask-SQLAlchemy 3.1.1
- Flask-CORS 4.0.1
- SQLite Database

**Frontend:**
- React 19.1.1
- TypeScript 5.8.3
- Vite 7.1.2
- Tailwind CSS 4.1.13

## Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn

## Project Structure

```
experience_marketplace_flask/
├── backend/                 # Flask API server
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   └── routes.py
│   ├── requirements.txt
│   └── wsgi.py
├── frontend/               # React application
│   └── expmkt_front/
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
└── docker-compose.yml
```

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize database:**
   ```bash
   python manage_db.py
   ```

6. **Run the Flask server:**
   ```bash
   python wsgi.py
   ```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend/expmkt_front
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Available Scripts

### Backend
- `python wsgi.py` - Start the Flask development server
- `python manage_db.py` - Initialize/manage database

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

The Flask backend provides RESTful API endpoints for managing experiences. The server runs on port 5000 by default.

## Development Workflow

1. Start the backend server first
2. Start the frontend development server
3. The frontend will proxy API requests to the backend
4. Both servers support hot reloading for development

## Environment Variables

Create a `.env` file in the backend directory for environment-specific configurations:

```env
FLASK_ENV=development
FLASK_DEBUG=True
DATABASE_URL=sqlite:///experiences.db
```

## License

This project is licensed under the MIT License.