# Asset Management Frontend

This is the **Vue 3 + Vite** frontend for the **Asset Management** application.
It communicates with the Django REST Framework backend (secured with JWT via `djangorestframework-simplejwt`) and provides a Bootstrap-based UI for authentication and property management.

---

## 🚀 Features

* **Authentication**

  * Login with email + password
  * JWT-based (access & refresh tokens stored in `localStorage`)
  * Auto-refresh of expired access tokens

* **User Profile**

  * Fetch logged-in user profile on page reload
  * Update profile name

* **Properties**

  * List only logged-in user’s properties (or all properties for admin/staff)
  * Add new properties with full form (grouped sections)
  * Edit existing properties with inline image upload
  * Upload/replace property images with live preview
  * Property list cards styled with Bootstrap, including hover overlays

* **Reusable Components**

  * `LoadingSpinner.vue` for consistent spinner display

* **Dockerized Deployment**

  * Built into an optimized Nginx container
  * Proxies `/api/` requests to backend

---

## 🛠️ Tech Stack

* [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
* [Vite](https://vitejs.dev/) (bundler)
* [Pinia](https://pinia.vuejs.org/) (state management)
* [Vue Router](https://router.vuejs.org/) (routing)
* [Axios](https://axios-http.com/) (API client with interceptors)
* [Bootstrap 5](https://getbootstrap.com/) (styling)
* [Nginx](https://nginx.org/) (Docker production server)

---

## 📂 Project Structure

```
asset-management-frontend/
│
├── src/
│   ├── api/                # Axios client setup
│   ├── components/         # Reusable components (e.g., spinner)
│   ├── router/             # Vue Router config
│   ├── stores/             # Pinia stores (auth, etc.)
│   ├── views/              # Page views
│   │   ├── auth/           # Login, etc.
│   │   └── property/       # Property list & forms
│   ├── App.vue             # Root app component
│   └── main.js             # App bootstrap
│
├── Dockerfile              # Frontend Docker image
├── docker-compose.yml      # Frontend docker-compose setup
├── nginx.conf              # Nginx config (for proxy & static)
├── package.json
├── vite.config.js
└── .env.example            # Example env variables
```

---

## ⚙️ Environment Variables

Copy `.env.example` → `.env` and configure:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

* In **local dev** → this points to your backend running on localhost:8000.
* In **Docker** → Nginx proxies `/api/` → backend (via `host.docker.internal` or Docker network).

---

## 🖥️ Local Development

### Install dependencies

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

* Runs at `http://localhost:5173`
* Proxies API calls to backend at `http://localhost:8000`

---

## 🐳 Dockerized Deployment

### Build & run (production)

```bash
docker-compose up -d --build
```

* Frontend available at `http://localhost:3000`
* Nginx serves the built Vue app from `/usr/share/nginx/html`
* API requests (`/api/`) are proxied to Django backend

### Stop

```bash
docker-compose down
```

---

## 🔑 Authentication Flow

1. User logs in → backend issues `access` + `refresh` tokens.
2. Tokens stored in `localStorage`.
3. Axios attaches `Authorization: Bearer <access_token>` automatically.
4. If `401 Unauthorized` and access expired → refresh token used to request new access.
5. If refresh also fails → user is logged out and redirected to `/login`.

---

## 📱 Property Management

* **Property List**

  * Card-based layout with property info
  * Image preview or “Upload a photo” button (hover overlay)
  * Inline image uploads → instantly preview new file before saving

* **Property Form (Create/Edit)**

  * Grouped into logical sections using `<fieldset>` + styled legends:

    * General
    * Contractual Relationship
    * Location
    * Comments/Story
  * Edit mode shows property image (with replace overlay)
  * New mode places image upload at bottom

---

## 🔧 API Integration

### Authentication Endpoints

* `POST /api/auth/token/` → login (email, password)
* `POST /api/auth/token/refresh/` → refresh access token
* `GET /api/auth/profile/` → get logged-in user
* `PUT /api/auth/profile/` → update profile (name only)

### Property Endpoints

* `GET /api/properties/` → list properties (user-only or all if admin)
* `POST /api/properties/` → create property
* `GET /api/properties/:id/` → retrieve property
* `PUT /api/properties/:id/` → update property
* `PATCH /api/properties/:id/` → partial update
* `DELETE /api/properties/:id/` → delete property

---

## 📝 Development Notes

* All image uploads are handled via `FormData` with `Content-Type: multipart/form-data`.
* Live preview works via `URL.createObjectURL(file)` before uploading.
* Logout clears tokens from `localStorage`.
* Spinners are reusable (`<LoadingSpinner />`) and used for API calls + file uploads.

---

## ✅ Next Steps

* Add pagination & filtering to property list (backend already supports filters).
* Handle image cleanup (optional: revoke preview URLs after use).
* Improve error handling & notifications (e.g., Toasts).

---

📌 This project is designed to work **independently** of the backend’s Docker setup.
You can run both stacks separately, or connect them via Docker networks if needed.

---
