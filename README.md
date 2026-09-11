# 🚧 Smart Pothole Detection & Reporting System

A full-stack, AI-powered system for real-time pothole detection, geo-tagged reporting, and authority notification — built with Next.js, Node.js, and YOLOv8.

---

## 📁 Project Structure

```
smart-pothole-detection/
│
├── README.md                          # Project overview and documentation
├── LICENSE                            # MIT License
├── .gitignore                         # Git ignore rules
├── .env.example                       # Root-level environment variable template
├── docker-compose.yml                 # Multi-service Docker orchestration
├── Makefile                           # Convenience commands (dev, build, test, etc.)
│
├── apps/
│   │
│   ├── frontend/                      # Next.js 14 Web Application
│   │   ├── public/
│   │   │   ├── images/                # Static images (logos, banners, etc.)
│   │   │   ├── icons/                 # App icons and favicons
│   │   │   └── logo.svg               # Main application logo
│   │   │
│   │   ├── src/
│   │   │   ├── app/                   # Next.js App Router
│   │   │   │   ├── layout.js          # Root layout (fonts, providers, global styles)
│   │   │   │   ├── page.js            # Landing / home page
│   │   │   │   │
│   │   │   │   ├── login/
│   │   │   │   │   └── page.js        # User login page
│   │   │   │   │
│   │   │   │   ├── register/
│   │   │   │   │   └── page.js        # User registration page
│   │   │   │   │
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── page.js        # Main dashboard overview
│   │   │   │   │   ├── map/
│   │   │   │   │   │   └── page.js    # Interactive pothole map view
│   │   │   │   │   ├── potholes/
│   │   │   │   │   │   ├── page.js    # Pothole listings & management
│   │   │   │   │   │   └── [id]/
│   │   │   │   │   │       └── page.js # Individual pothole detail view
│   │   │   │   │   ├── reports/
│   │   │   │   │   │   └── page.js    # Generated reports view
│   │   │   │   │   └── settings/
│   │   │   │   │       └── page.js    # User/system settings
│   │   │   │   │
│   │   │   │   └── detect/
│   │   │   │       └── page.js        # Real-time detection interface (camera/video upload)
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── ui/                # Shared UI primitives (Button, Card, Modal, etc.)
│   │   │   │   ├── dashboard/         # Dashboard-specific widgets and charts
│   │   │   │   ├── map/               # Map components (MapView, PotholeMarker, etc.)
│   │   │   │   ├── potholes/          # Pothole list, detail, and form components
│   │   │   │   ├── reports/           # Report generation and display components
│   │   │   │   └── detection/         # Camera feed, bounding box overlay, detection UI
│   │   │   │
│   │   │   ├── hooks/                 # Custom React hooks (useAuth, useDetection, etc.)
│   │   │   ├── services/
│   │   │   │   └── api.js             # Axios/fetch API client with interceptors
│   │   │   ├── lib/                   # Third-party library wrappers (Leaflet, Chart.js)
│   │   │   ├── store/                 # Global state management (Zustand / Redux)
│   │   │   ├── utils/                 # Frontend utility functions
│   │   │   └── constants/             # Frontend constants (routes, API endpoints, etc.)
│   │   │
│   │   ├── .env.example               # Frontend environment variable template
│   │   ├── next.config.mjs            # Next.js configuration
│   │   ├── jsconfig.json              # JS path aliases configuration
│   │   ├── package.json               # Frontend dependencies and scripts
│   │   └── Dockerfile                 # Frontend Docker image definition
│   │
│   │
│   ├── backend/                       # Node.js / Express REST API
│   │   ├── src/
│   │   │   │
│   │   │   ├── config/
│   │   │   │   ├── env.js             # Environment variable loader & validator
│   │   │   │   ├── database.js        # Prisma client initialization
│   │   │   │   └── logger.js          # Winston/Pino logger setup
│   │   │   │
│   │   │   ├── modules/               # Feature-based modular architecture
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.controller.js   # Login, register, refresh, logout handlers
│   │   │   │   │   ├── auth.service.js      # JWT logic, bcrypt, token management
│   │   │   │   │   ├── auth.routes.js       # Auth route definitions
│   │   │   │   │   └── auth.validation.js   # Joi/Zod request validation schemas
│   │   │   │   │
│   │   │   │   ├── users/
│   │   │   │   │   ├── user.controller.js   # User CRUD handlers
│   │   │   │   │   ├── user.service.js      # User business logic
│   │   │   │   │   └── user.routes.js       # User route definitions
│   │   │   │   │
│   │   │   │   ├── potholes/
│   │   │   │   │   ├── pothole.controller.js   # Pothole CRUD + status update handlers
│   │   │   │   │   ├── pothole.service.js       # Pothole business logic
│   │   │   │   │   ├── pothole.routes.js        # Pothole route definitions
│   │   │   │   │   └── pothole.validation.js    # Pothole request validation schemas
│   │   │   │   │
│   │   │   │   ├── detections/
│   │   │   │   │   ├── detection.controller.js  # Trigger and retrieve AI detections
│   │   │   │   │   ├── detection.service.js     # Communicate with AI service
│   │   │   │   │   └── detection.routes.js      # Detection route definitions
│   │   │   │   │
│   │   │   │   ├── authorities/
│   │   │   │   │   ├── authority.controller.js  # Authority management handlers
│   │   │   │   │   ├── authority.service.js     # Authority business logic
│   │   │   │   │   └── authority.routes.js      # Authority route definitions
│   │   │   │   │
│   │   │   │   ├── reports/
│   │   │   │   │   ├── report.controller.js     # Report generation handlers
│   │   │   │   │   ├── report.service.js        # PDF/CSV report generation logic
│   │   │   │   │   └── report.routes.js         # Report route definitions
│   │   │   │   │
│   │   │   │   ├── notifications/
│   │   │   │   │   ├── notification.service.js     # Email/SMS/push notification logic
│   │   │   │   │   └── notification.controller.js  # Notification management handlers
│   │   │   │   │
│   │   │   │   ├── media/
│   │   │   │   │   ├── media.controller.js   # File upload/download handlers
│   │   │   │   │   ├── media.service.js      # S3 / local storage integration
│   │   │   │   │   └── media.routes.js       # Media route definitions
│   │   │   │   │
│   │   │   │   └── dashboard/
│   │   │   │       ├── dashboard.controller.js  # Dashboard stats handlers
│   │   │   │       ├── dashboard.service.js     # Aggregation and analytics logic
│   │   │   │       └── dashboard.routes.js      # Dashboard route definitions
│   │   │   │
│   │   │   ├── services/              # Shared cross-module services
│   │   │   │   ├── ai.service.js              # HTTP client to AI microservice
│   │   │   │   ├── geocoding.service.js        # Reverse geocoding (Google Maps / OSM)
│   │   │   │   ├── authority.service.js        # Geo-boundary → authority mapping
│   │   │   │   ├── notification.service.js     # Notification dispatch service
│   │   │   │   ├── storage.service.js          # File storage abstraction (S3/local)
│   │   │   │   └── deduplication.service.js    # Duplicate pothole detection logic
│   │   │   │
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.js       # JWT verification middleware
│   │   │   │   ├── error.middleware.js      # Global error handler
│   │   │   │   ├── rateLimit.middleware.js  # Rate limiting (express-rate-limit)
│   │   │   │   └── validation.middleware.js # Request validation middleware
│   │   │   │
│   │   │   ├── routes/
│   │   │   │   └── index.js           # Central route aggregator
│   │   │   │
│   │   │   ├── utils/                 # Backend utility functions (helpers, formatters)
│   │   │   ├── constants/             # Backend constants (status codes, messages, etc.)
│   │   │   ├── app.js                 # Express app setup (middleware stack, routes)
│   │   │   └── server.js              # HTTP server entry point
│   │   │
│   │   ├── prisma/
│   │   │   ├── schema.prisma          # Prisma ORM schema (User, Pothole, Detection, etc.)
│   │   │   ├── seed.js                # Database seed script with mock data
│   │   │   └── migrations/            # Auto-generated Prisma migration files
│   │   │
│   │   ├── tests/
│   │   │   ├── unit/                  # Unit tests for services and utilities
│   │   │   └── integration/           # Integration tests for API endpoints
│   │   │
│   │   ├── .env.example               # Backend environment variable template
│   │   ├── package.json               # Backend dependencies and scripts
│   │   └── Dockerfile                 # Backend Docker image definition
│   │
│   │
│   └── ai-service/                    # Python FastAPI — YOLOv8 Inference Microservice
│       ├── app/
│       │   ├── main.py                # FastAPI application entry point
│       │   │
│       │   ├── api/
│       │   │   └── routes/
│       │   │       ├── health.py      # Health check endpoint (/health)
│       │   │       └── detection.py   # Pothole detection endpoint (/detect)
│       │   │
│       │   ├── core/
│       │   │   ├── model.py           # YOLOv8 model loader and manager
│       │   │   ├── inference.py       # Single image inference logic
│       │   │   └── video_processor.py # Frame-by-frame video processing logic
│       │   │
│       │   ├── schemas/
│       │   │   └── detection.py       # Pydantic schemas for request/response
│       │   │
│       │   ├── config.py              # App configuration (model paths, thresholds)
│       │   └── utils/                 # Utility functions (image preprocessing, NMS, etc.)
│       │
│       ├── models/
│       │   └── pothole/
│       │       └── best.pt            # Trained YOLOv8 model weights (placeholder)
│       │
│       ├── tests/
│       │   ├── test_detection.py      # Tests for detection endpoint and inference
│       │   └── test_video.py          # Tests for video processing pipeline
│       │
│       ├── requirements.txt           # Production Python dependencies
│       ├── requirements-dev.txt       # Development Python dependencies (pytest, etc.)
│       ├── .env.example               # AI service environment variable template
│       ├── Dockerfile                 # AI service Docker image definition
│       └── README.md                  # AI service specific documentation
│
│
├── data/                              # Sample & reference data
│   ├── sample-images/                 # Sample pothole images for testing
│   ├── sample-videos/                 # Sample road videos for testing
│   ├── geojson/
│   │   └── authority-boundaries.geojson  # Geographic authority boundary definitions
│   └── mock/                          # Mock JSON data for local development
│
│
├── docs/                              # Project documentation
│   ├── architecture/
│   │   ├── system-architecture.md     # High-level system architecture overview
│   │   ├── data-flow.md               # Data flow diagrams and descriptions
│   │   └── ai-architecture.md         # AI/ML pipeline architecture details
│   │
│   ├── api/
│   │   ├── openapi.yaml               # OpenAPI 3.0 specification
│   │   └── api-reference.md           # Human-readable API reference guide
│   │
│   ├── database/
│   │   ├── schema.md                  # Database schema documentation
│   │   └── er-diagram.png             # Entity-relationship diagram
│   │
│   ├── deployment/
│   │   └── deployment-guide.md        # Step-by-step deployment instructions
│   │
│   └── demo/
│       └── demo-script.md             # Demo walkthrough script for presentations
│
│
├── infrastructure/                    # Infrastructure configuration
│   ├── nginx/
│   │   └── nginx.conf                 # Nginx reverse proxy configuration
│   ├── aws/
│   │   ├── ec2/                       # EC2 instance configurations and scripts
│   │   └── s3/                        # S3 bucket policies and CORS configs
│   └── monitoring/                    # Prometheus / Grafana / CloudWatch configs
│
│
├── scripts/                           # Utility shell scripts
│   ├── setup.sh                       # One-time project setup script
│   ├── dev.sh                         # Start all services in development mode
│   ├── build.sh                       # Build all Docker images
│   ├── seed.sh                        # Run database seeding
│   └── health-check.sh                # Check health of all running services
│
│
├── postman/
│   └── pothole-api.postman_collection.json  # Postman collection for API testing
│
│
└── .github/
    └── workflows/
        ├── ci.yml                     # CI pipeline (lint, test, build on PR)
        └── deploy.yml                 # CD pipeline (deploy on merge to main)
```

---

## 🏗️ Architecture Overview

This is a **microservices-based** monorepo with three core services:

| Service | Technology | Responsibility |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | User interface — detection, reporting, dashboard |
| **Backend** | Node.js + Express + Prisma | REST API — business logic, database, auth |
| **AI Service** | Python + FastAPI + YOLOv8 | ML inference — pothole detection from images/video |

### Communication Flow

```
User (Browser)
    │
    ▼
Frontend (Next.js) ──────────────────────────────► Backend (Express API)
                                                         │
                                              ┌──────────┴──────────┐
                                              │                     │
                                         PostgreSQL           AI Service
                                         (via Prisma)         (FastAPI + YOLOv8)
```

---

## 🧩 Key Features Mapped to Code

| Feature | Frontend Route | Backend Module | AI Service |
|---|---|---|---|
| Real-time Detection | `/detect` | `detections/` | `/detect` endpoint |
| Pothole Map | `/dashboard/map` | `potholes/` | — |
| Report Generation | `/dashboard/reports` | `reports/` | — |
| Authority Notification | — | `notifications/` + `authorities/` | — |
| User Authentication | `/login`, `/register` | `auth/` | — |
| Media Upload | Detection page | `media/` | — |

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, Leaflet.js (maps), Zustand (state), Tailwind CSS
- **Backend**: Node.js, Express.js, Prisma ORM, PostgreSQL, JWT, Multer
- **AI Service**: Python, FastAPI, Ultralytics YOLOv8, OpenCV, Pydantic
- **Infrastructure**: Docker, Nginx, AWS (EC2 + S3), GitHub Actions
- **Dev Tools**: Postman, Makefile, shell scripts

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/your-org/smart-pothole-detection.git
cd smart-pothole-detection

# Copy environment files
cp .env.example .env

# Start all services via Docker Compose
docker-compose up --build

# OR use the Makefile
make dev
```

### Environment Variables
Each service has its own `.env.example`:
- Root: `.env.example` — shared/orchestration variables
- Frontend: `apps/frontend/.env.example`
- Backend: `apps/backend/.env.example`
- AI Service: `apps/ai-service/.env.example`

---

## 📋 Scripts Reference

| Script | Command | Description |
|---|---|---|
| Setup | `./scripts/setup.sh` | One-time environment setup |
| Dev | `./scripts/dev.sh` | Start all services in dev mode |
| Build | `./scripts/build.sh` | Build all Docker images |
| Seed DB | `./scripts/seed.sh` | Populate database with mock data |
| Health | `./scripts/health-check.sh` | Verify all services are running |

---

## 📖 Documentation

| Document | Location |
|---|---|
| System Architecture | `docs/architecture/system-architecture.md` |
| Data Flow | `docs/architecture/data-flow.md` |
| AI Architecture | `docs/architecture/ai-architecture.md` |
| API Reference | `docs/api/api-reference.md` |
| OpenAPI Spec | `docs/api/openapi.yaml` |
| Database Schema | `docs/database/schema.md` |
| Deployment Guide | `docs/deployment/deployment-guide.md` |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request — CI will run automatically

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
