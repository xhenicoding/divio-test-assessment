# Divio Test Assessment

This is a full-stack application built with Django (backend) and React (frontend), Dockerized with `docker-compose`. The backend API is built with Django REST Framework and includes JWT authentication, while the frontend is a React application styled with Tailwind CSS.

## Features

- **Backend**: Django REST Framework with JWT authentication, PostgreSQL database, and product management endpoints.
- **Frontend**: React application with Redux state management, Tailwind CSS styling, and API interaction with the backend.
- **Dockerized**: Both backend and frontend are containerized, along with PostgreSQL, using `docker-compose` for seamless local development.
- **Session Persistence**: User session, search results, and selection state persist across page reloads.

---

## Prerequisites

Ensure that you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Comes installed with Docker Desktop

---

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

```bash
git clone https://github.com/xhenicoding/divio-test-assessment.git
cd divio-test-assessment
```

### 2. Environment Variables

Create an `.env` file in the `backend` folder to store environment variables (for example, database credentials). Here’s an example `.env` file for Django:

```plaintext
POSTGRES_DB=mydatabase
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

Make sure to load these values in your `settings.py` if you’re using environment variables for sensitive data.

### 3. Build and Run with Docker Compose

In the project root directory, run:

```bash
docker-compose up --build
```

This will:

- Build and start the Django backend on `http://localhost:8000`.
- Build and start the React frontend on `http://localhost:3000`.
- Start a PostgreSQL database container.

## Setting Up the Django Backend

Once the backend container is running, you’ll need to apply migrations and create a superuser for accessing the Django admin.

1. **Enter the Backend Container**:

   ```bash
   docker-compose exec backend bash
   ```

2. **Run Migrations**:

   ```bash
   python manage.py migrate
   ```

3. **Create a Superuser**:

   ```bash
   python manage.py createsuperuser
   ```

You can now log in to the Django admin at `http://localhost:8000/admin`.

## Application Usage

### Accessing the Application

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000/api`
- **Django Admin**: `http://localhost:8000/admin`

### API Endpoints

The backend provides several API endpoints for managing products and user authentication. Here are some key endpoints:

- `POST /api/auth/`: Authenticate and receive a JWT token.
- `POST /api/auth/refresh/`: Refresh JWT token.
- `GET /api/products/`: List and search products with optional sorting.
- `POST /api/products/<id>/select/`: Mark a product as selected.

### Using the Application

1. **Login**: Use the login form on the frontend to authenticate.
2. **Search and Sort Products**: The main interface allows you to search and sort products.
3. **Select Products**: You can mark a product as selected, which is saved in the backend.


## Project Structure

### Backend

The Django backend is organized with the following structure:

- **models.py**: Defines the product model.
- **serializers.py**: Serializes data for API responses.
- **views.py**: Defines the API endpoints.
- **urls.py**: Routes for the backend API.

### Frontend

The React frontend includes components and Redux slices for managing authentication, product display, and selection.

- **components**: Contains the main UI components like `ProductTable` and `Login`.
- **features**: Holds Redux slices for managing `auth` and `products` state.
