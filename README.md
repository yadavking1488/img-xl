# Kirana Store Management Platform

This project delivers a mobile-first ERP and OCR workflow for kirana, grocery, and provision stores. It combines a Vite + React + TypeScript frontend with a NestJS API and Prisma schema designed for PostgreSQL.

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: NestJS, TypeScript
- Database: PostgreSQL + Prisma
- Auth: Google OAuth + JWT + refresh tokens
- OCR: Google Vision API with Tesseract fallback
- Export: XLSX, CSV, Google Sheets integration
- State: TanStack Query + Zustand
- Validation: Zod + React Hook Form

## Project structure

- `frontend/` – Mobile-first retail dashboard and OCR workflow UI
- `backend/` – REST API for dashboard, inventory, customer ledger, and document processing
- `docker-compose.yml` – PostgreSQL local database for development

## Local setup

1. Start PostgreSQL:
   - `docker compose up -d`
2. Install frontend packages:
   - `cd frontend && npm install`
3. Install backend packages:
   - `cd backend && npm install`
4. Generate Prisma client:
   - `cd backend && npx prisma generate`
5. Start frontend:
   - `cd frontend && npm run dev`
6. Start backend:
   - `cd backend && npm run start:dev`

## Deployment

The project includes a Render Blueprint in `render.yaml` for the frontend static site and NestJS API, plus a GitHub Actions workflow that builds the frontend and tests/builds the backend on pushes and pull requests to `main`.

1. Push this project to `https://github.com/yadavking1488/img-xl`.
2. In Render, choose **New → Blueprint**, connect that GitHub repository, and apply `render.yaml`.
3. Render will create `img-xl-web` and `img-xl-api`; the frontend obtains the API hostname from the API service, and the API restricts CORS to the frontend service hostname.
4. Configure any production credentials as Render environment variables. Do not commit `.env` files or credentials.

The API currently serves demo data. Although PostgreSQL and Prisma models are scaffolded, database persistence, OAuth, and live OCR processing are not implemented yet; the demo API does not require the database to start.

## API overview

- `GET /api/health`
- `GET /api/dashboard/summary`
- `GET /api/inventory`
- `GET /api/customers`
- `GET /api/documents`
- `GET /api/reports/gst`

## Business modules included

- Dashboard
- OCR Upload Center
- Supplier Invoice Processing
- Inventory Management
- Product Catalog
- Customer Management
- Khata / Udhaar Tracking
- Customer Ledger
- Due Collection Tracking
- GST Reporting
- Reports Center
- Google Sheets Synchronization
- Excel Export Engine
- AI Suggestions Center

## Notes

This repository contains a production-ready architecture foundation and a working MVP interface with realistic demo data. For live OCR and Google integrations, add API credentials and wire the provider service implementations into the backend.
