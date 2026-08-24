# API_INTEGRATION.md

## GearUp Frontend → Backend API Mapping

This document maps every major frontend page and component to the corresponding backend API endpoint. The frontend consumes the GearUp REST API built with **Postrgess, Prisma , Node js,ExpressJs**.

**Backend URL**

```text
http://localhost:5000/api
```

**Frontend URL**

```text
http://localhost:5000/api
```

---

## Public Routes

| Frontend Route | Backend Endpoint | Method | Description                     |
| -------------- | ---------------- | ------ | ------------------------------- |
| `/`            | `/api/gear`      | GET    | Load featured gear for homepage |

| `/gear/[id]` | `/api/gear/:id` | GET | Get single gear details |

---

## Authentication

| Frontend Route   | Backend Endpoint     | Method | Description                      |
| ---------------- | -------------------- | ------ | -------------------------------- |
| `/auth/register` | `/api/auth/register` | POST   | Create customer/provider account |
| `/auth/login`    | `/api/auth/login`    | POST   | Login and receive JWT            |
| Global Layout    | `/api/auth/me`       | GET    | Get authenticated user profile   |

---

## Admin Api's

| Frontend Route              | Backend Endpoint    | Method | Description          |
| --------------------------- | ------------------- | ------ | -------------------- |
| `/dashboard/admin/gears`    | `/api/admin/gears`  | GET    | Get all gear list    |
| `/dashboard/admin/orders`   | `/api/admin/orders` | GET    | Get all order list   |
| `/dashboard/admin/payments` | `/api/payments/all` | GET    | Get All Payment list |

---

## Provider Api's

| Frontend Route                  | Backend Endpoint         | Method | Description        |
| ------------------------------- | ------------------------ | ------ | ------------------ |
| `/dashboard/provider/gear`      | `/api/provider/gear`     | GET    | Get a gear list    |
| `/dashboard/provider/gear/new`  | `/api/provider/gear`     | POST   | Create a gear item |
| `/dashboard/provider/gear/[id]` | `/api/provider/gear`     | POST   | Edit a gear item   |
| `/dashboard/provider/orders`    | `/api/provider/orders`   | GET    | get a order list   |
| `/dashboard/provider/payments`  | `/api/payments/provider` | GET    | Get Payment list   |

---

## Customer Api's

| Frontend Route                     | Backend Endpoint           | Method | Description      |
| ---------------------------------- | -------------------------- | ------ | ---------------- |
| `/dashboard/customer/review/[id]/` | `/api/reviews/:gearItemId` | POST   | Create a review  |
| `/dashboard/customer/order`        | `/api/rentals`             | GET    | get a order list |
| `/dashboard/customer/payments`     | `/api/payments`            | GET    | Get Payment list |

---

## Payment Flow

| Frontend Page      | Backend Endpoint                             | Description                     |
| ------------------ | -------------------------------------------- | ------------------------------- |
| Checkout Button    | `POST /payments/create-checkout-session/:id` | Creates Stripe Checkout Session |
| Stripe Redirect    | Stripe Hosted Checkout                       | Customer completes payment      |
| `/payment/success` | Webhook updates backend                      | Show success UI                 |
| `/payment/cancel`  | —                                            | Show cancelled payment UI       |

---

## Authentication Header

All protected requests require a JWT access token.

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## Notes

- **Public routes** do not require authentication.
- **Customer**, **Provider**, and **Admin** dashboards are protected using Next.js Middleware.
- Data fetching is handled with **Axios** and **TanStack Query**.
- Stripe payment is initiated from the frontend and completed through **Stripe Checkout**.
