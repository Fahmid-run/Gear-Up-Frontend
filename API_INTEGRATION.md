# API_INTEGRATION.md

## GearUp Frontend → Backend API Mapping

This document maps every major frontend page and component to the corresponding backend API endpoint. The frontend consumes the GearUp REST API built with **Next.js + Axios + TanStack Query**.

**Base URL**

```text
http://localhost:5000/api
```

---

## Public Routes

| Frontend Route | Backend Endpoint | Method | Description                     |
| -------------- | ---------------- | ------ | ------------------------------- |
| `/`            | `/gear`          | GET    | Load featured gear for homepage |
| `/gear`        | `/gear`          | GET    | Browse and filter all gear      |
| `/gear/[id]`   | `/gear/:id`      | GET    | Get single gear details         |

---

## Authentication

| Frontend Route   | Backend Endpoint | Method | Description                      |
| ---------------- | ---------------- | ------ | -------------------------------- |
| `/auth/register` | `/auth/register` | POST   | Create customer/provider account |
| `/auth/login`    | `/auth/login`    | POST   | Login and receive JWT            |
| Global Layout    | `/auth/me`       | GET    | Get authenticated user profile   |

---

## Customer Dashboard

| Frontend Route                | Backend Endpoint                        | Method | Description                  |
| ----------------------------- | --------------------------------------- | ------ | ---------------------------- |
| `/dashboard/customer`         | `/rentals`                              | GET    | Rental overview              |
| `/dashboard/customer`         | `/payments`                             | GET    | Payment history              |
| `/dashboard/customer/orders`  | `/rentals`                              | GET    | List customer orders         |
| Order Details                 | `/rentals/:id`                          | GET    | View single rental           |
| Payment Button                | `/payments/create-checkout-session/:id` | POST   | Generate Stripe Checkout URL |
| `/dashboard/customer/reviews` | `/reviews`                              | POST   | Submit gear review           |

---

## Provider Dashboard

| Frontend Route                       | Backend Endpoint       | Method | Description                   |
| ------------------------------------ | ---------------------- | ------ | ----------------------------- |
| `/dashboard/provider`                | `/provider/orders`     | GET    | Dashboard statistics & orders |
| `/dashboard/provider/gear`           | `/provider/gear`       | GET    | Provider gear inventory       |
| `/dashboard/provider/gear/new`       | `/provider/gear`       | POST   | Create new gear               |
| `/dashboard/provider/gear/[id]/edit` | `/provider/gear/:id`   | PUT    | Update gear                   |
| Gear List                            | `/provider/gear/:id`   | DELETE | Remove gear                   |
| `/dashboard/provider/orders`         | `/provider/orders`     | GET    | Incoming rental orders        |
| Update Status                        | `/provider/orders/:id` | PATCH  | Confirm / Pick Up / Return    |

---

## Admin Dashboard

| Frontend Route             | Backend Endpoint   | Method | Description             |
| -------------------------- | ------------------ | ------ | ----------------------- |
| `/dashboard/admin`         | `/admin/users`     | GET    | Dashboard overview      |
| `/dashboard/admin/users`   | `/admin/users`     | GET    | Manage users            |
| User Action                | `/admin/users/:id` | PATCH  | Suspend / Activate user |
| `/dashboard/admin/gear`    | `/admin/gear`      | GET    | View all gear listings  |
| `/dashboard/admin/rentals` | `/admin/rentals`   | GET    | View all rental orders  |

---

## Payment Flow

| Frontend Page      | Backend Endpoint                             | Description                     |
| ------------------ | -------------------------------------------- | ------------------------------- |
| Checkout Button    | `POST /payments/create-checkout-session/:id` | Creates Stripe Checkout Session |
| Stripe Redirect    | Stripe Hosted Checkout                       | Customer completes payment      |
| `/payment/success` | Webhook updates backend                      | Show success UI                 |
| `/payment/cancel`  | —                                            | Show cancelled payment UI       |

---

## Status Badge Mapping

| Rental Status | Frontend Badge |
| ------------- | -------------- |
| `PLACED`      | 🟠 Orange      |
| `CONFIRMED`   | 🔵 Blue        |
| `PAID`        | 🟣 Purple      |
| `PICKED_UP`   | 🟢 Green       |
| `RETURNED`    | ⚪ Gray        |
| `CANCELLED`   | 🔴 Red         |

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
