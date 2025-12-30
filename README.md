# 🏭 Enterprise Resource Planning (ERP) System

A comprehensive, full-stack ERP solution designed for the manufacturing and textile industry. This system manages the complete lifecycle of business operations, from **Procurement** and **Inventory Management** to **Sales**, **Production**, and **Financial Accounting**.

Built with modern web technologies, focusing on type safety, scalability, and automated financial flows.

## 🚀 Tech Stack

### **Frontend (Client)**
* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
* **State/Forms:** React Hook Form + Zod Validation
* **Data Fetching:** TanStack Query (React Query)

### **Backend (Server)**
* **Framework:** [NestJS](https://nestjs.com/)
* **Language:** TypeScript
* **ORM:** [Prisma](https://www.prisma.io/)
* **Authentication:** Passport.js (JWT) & Bcrypt
* **Architecture:** Modular (Controller-Service-Repository pattern)

### **Database & Infrastructure**
* **Database:** PostgreSQL (Hosted on [Supabase](https://supabase.com/))
* **Security:** Row Level Security (RLS) enabled
* **Connection:** Transaction Pooling (PgBouncer) for App, Direct Connection for Migrations

---

## 📂 Project Structure

This is a Monorepo containing both the client and server applications.

```text
root/
├── frontend/         # Next.js Application
│   ├── src/app/      # App Router Pages
│   ├── components/   # Shadcn UI Components
│   └── lib/          # Utils & API Clients
│
├── backend/          # NestJS Application
│   ├── src/modules/  # Business Logic (Sales, Purchase, Auth, etc.)
│   ├── prisma/       # Schema & Seed Scripts
│   └── main.ts       # Entry Point
│
└── README.md         # Documentation