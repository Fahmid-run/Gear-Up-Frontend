# GearUp — API Integration Documentation

> **Frontend:** Next.js + TypeScript + Tailwind CSS + shadcn/ui
> **Backend:** Node.js + Express.js + Prisma + PostgreSQL
> **Authentication:** JWT
> **Payment:** Stripe Checkout
> **API Style:** REST
> **Frontend State/Data Fetching:** React Query
> **HTTP Client:** Axios

---

## Overview

GearUp is a sports and outdoor equipment rental platform consisting of a Next.js frontend and a RESTful backend API.

The frontend communicates with the backend through HTTP requests and dynamically adapts its interface based on the authenticated user's role:

- `Customer`
- `Provider`
- `Admin`

The frontend is responsible for:

- Rendering the user interface
- Form validation
- Sending API requests
- Displaying loading/error/success states
- Managing authenticated sessions
- Role-based navigation
- Consuming rental and payment data
- Redirecting users to Stripe Checkout

The backend is responsible for:

- Authentication
- Authorization
- Business logic
- Database operations
- Rental calculations
- Payment creation
- Stripe webhook processing
- Data validation
- Security

---

# Backend Base URL

Configure the backend URL through an environment variable.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Production:

```env
NEXT_PUBLIC_API_URL=https://your-gearup-backend.vercel.app/api
```

---

# Authentication

GearUp uses JWT authentication.

After successful login, the backend returns an authentication token.

The frontend attaches the token to protected API requests.

```http
Authorization: Bearer <JWT_TOKEN>
```

### Protected API flow

```text
User Login
    ↓
Backend validates credentials
    ↓
JWT returned
    ↓
Frontend stores authentication state
    ↓
Protected request
    ↓
Authorization header
    ↓
Backend verifies JWT
    ↓
Role authorization
    ↓
Controller
    ↓
Service
    ↓
Database
```

---

# API Response Convention

The frontend expects API responses in the following general structure:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": {}
}
```

For errors:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "error": {}
}
```

The frontend should display the backend `message` whenever appropriate.

---

# Authentication API

## Register

### Endpoint

```http
POST /api/auth/register
```

### Access

Public.

### Frontend

```text
/(auth)/register/page.tsx
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "phone": "01700000000",
  "address": "Dhaka, Bangladesh",
  "role": "Customer"
}
```

Provider registration:

```json
{
  "name": "ABC Sports",
  "email": "provider@example.com",
  "password": "Password123!",
  "phone": "01800000000",
  "address": "Dhaka, Bangladesh",
  "role": "Provider"
}
```

### UI Requirements

- Zod validation
- Password validation
- Email validation
- Phone validation
- Role selection
- Inline validation messages
- Loading state
- API error display
- Success toast
- Redirect to login

> `Admin` must not be selectable during public registration.

---

# Login

### Endpoint

```http
POST /api/auth/login
```

### Access

Public.

### Frontend

```text
/(auth)/login/page.tsx

```

### Request

```json
{
  "email": "customer@example.com",
  "password": "Password123!"
}
```

# 9. Gear API

## Get All Gear

### Endpoint

```http
GET /api/gear
```

### Access

Public.

### Frontend

```text
/(public)/page.tsx


```

# Gear Details

### Endpoint

```http
GET /gear/:id
```

### Access

Public.

### Frontend

```text
/(public)/gear/[id]/page.tsx
/features/gear/gear.api.ts
```

Used to display:

- Gear name
- Description
- Image
- Category
- Brand
- Provider
- Stock
- Condition
- Rental price
- Availability
- Reviews

---

# Categories

### Endpoint

```http
GET /categories
```

### Access

Public.

### Frontend

```text
/(public)/gear/page.tsx
/features/gear/gear.api.ts
```

Used by:

- Category filter
- Gear form
- Search/filter UI
- Admin category management

---

# 12. Provider Gear API

## Get Provider Gear

### Endpoint

```http
GET /provider/gear
```

### Access

Provider.

### Frontend

```text
/dashboard/provider/gear/page.tsx
/features/provider/provider.api.ts
/components/tables/GearTable.tsx
```

---

## Create Gear

### Backend Endpoint

```http
POST /api/provider/gear
```

### Access

Provider.

### Frontend

```text
/dashboard/provider/gear/new/page.tsx
```

### Request

```json
{
  "name": "Mountain Bike",
  "description": "Professional mountain bike suitable for outdoor trails.",
  "category": "cycling",
  "brand": "Trek",
  "stock": 5,
  "condition": "Excellent",
  "rentalPricePerDay": 25,
  "image": "https://example.com/mountain-bike.jpg"
}
```

---

#. Update Gear

### Endpoint

```http
PUT /provider/gear/:id
```

### Access

Provider.

### Frontend

```text
/dashboard/provider/gear/[id]/edit/page.tsx
/components/forms/GearForm.tsx
```

The frontend should only allow a provider to edit gear belonging to that provider.

---

# Delete Gear

### Endpoint

```http
DELETE /provider/gear/:id
```

### Access

Provider.

### Frontend

```text
/components/dialogs/DeleteGearDialog.tsx
```

Recommended UI:

```text
Delete button
    ↓
Confirmation Dialog
    ↓
DELETE request
    ↓
Success Toast
    ↓
Invalidate Gear Query
    ↓
Refresh Table
```

---

# 15. Rental Order API

## Create Rental Order

### Endpoint

```http
POST /rentals
```

### Access

Customer.

### Frontend

```text
/(public)/gear/[id]/page.tsx
/components/forms/RentalForm.tsx
/features/rentals/rental.api.ts
```

### Request

```json
{
  "gearItemId": "GEAR_ID",
  "startDate": "2026-08-25T09:00:00.000Z",
  "endDate": "2026-08-28T09:00:00.000Z"
}
```

The frontend should not blindly trust the price displayed in the UI.

The backend must calculate the final rental amount.

---

# Get Customer Rentals

### Endpoint

```http
GET /rentals
```

### Access

Authenticated customer.

### Frontend

```text
/dashboard/customer/orders/page.tsx
/features/rentals/rental.api.ts
/components/tables/RentalTable.tsx
```

Used for:

- Order history
- Status tracking
- Payment button
- Rental details

---

# Get Rental Details

### Endpoint

```http
GET /rentals/:id
```

### Access

Authenticated user with appropriate ownership/role.

### Frontend

Used for:

- Rental details
- Payment
- Status tracking
- Review eligibility

---

# Provider Rental Orders

### Endpoint

```http
GET /provider/orders
```

### Access

Provider.

### Frontend

```text
/dashboard/provider/orders/page.tsx
/components/tables/ProviderOrderTable.tsx
```

---

# 20. Update Rental Status

### Endpoint

```http
PATCH /provider/orders/:id
```

### Access

Provider.

### Supported statuses

```text
PLACED
CONFIRMED
PAID
PICKED_UP
RETURNED
CANCELLED
```

Typical provider workflow:

```text
PLACED
   ↓
CONFIRMED
   ↓
PAID
   ↓
PICKED_UP
   ↓
RETURNED
```

The UI should only display valid actions for the current status.

Example:

```text
PLACED
→ Confirm

CONFIRMED
→ Wait for Payment

PAID
→ Mark Picked Up

PICKED_UP
→ Mark Returned

RETURNED
→ No provider action
```

---

# Payment API

## Create Stripe Checkout Session

### Endpoint

```http
POST /payments/create
```

### Access

Authenticated customer.

### Frontend

```text
/dashboard/customer/orders/[id]/pay/page.tsx
/features/payment/payment.api.ts
```

### Request

```json
{
  "rentalOrderId": "RENTAL_ORDER_ID"
}
```

### Backend response

The backend creates a Stripe Checkout Session and returns a payment URL.

Example:

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Checkout session created",
  "data": {
    "payment": {
      "id": "PAYMENT_ID",
      "amount": 400.99,
      "currency": "usd",
      "provider": "STRIPE",
      "status": "PENDING",
      "rentalOrderId": "RENTAL_ORDER_ID"
    },
    "checkoutUrl": "https://checkout.stripe.com/..."
  }
}
```

The frontend redirects the customer:

```ts
window.location.href = checkoutUrl;
```

---

# Stripe Payment Flow

```text
Customer
   ↓
Rental Order
   ↓
Provider confirms
   ↓
CONFIRMED
   ↓
Create Checkout Session
   ↓
Backend → Stripe
   ↓
Stripe Checkout URL
   ↓
Customer pays
   ↓
Stripe processes payment
   ↓
Stripe Webhook
   ↓
Backend
   ↓
Payment = COMPLETED
   ↓
Rental = PAID
```

The frontend must NOT mark the payment as completed itself.

The Stripe webhook is the authoritative payment confirmation mechanism.

---

# Payment History

### Endpoint

```http
GET /payments
```

### Access

Authenticated customer.

### Frontend

```text
/dashboard/customer/payments/page.tsx
/features/payment/payment.api.ts
/components/tables/PaymentTable.tsx
```

Display:

- Transaction ID
- Amount
- Currency
- Provider
- Payment status
- Rental order
- Payment date

---

# Payment Details

### Endpoint

```http
GET /payments/:id
```

### Access

Authenticated user with appropriate authorization.

Used by the payment details UI.

---

# Payment Success

### Frontend Route

```text
/payment/success
```

No direct backend mutation should be performed simply because the user reaches this page.

The UI should display:

```text
Payment Successful
```

and optionally fetch the associated payment/rental information.

The actual payment status is determined by the backend webhook.

---

# 26. Payment Cancel

### Frontend Route

```text
/payment/cancel
```

Display:

```text
Payment Cancelled
```

Actions:

```text
Return to Orders
Try Payment Again
Browse Gear
```

---

# 27. Review API

## Create Review

### Endpoint

```http
POST /reviews
```

### Access

Customer.

### Frontend

```text
/dashboard/customer/reviews/page.tsx
/components/forms/ReviewForm.tsx
/features/reviews/review.api.ts
```

### Request

```json
{
  "gearItemId": "GEAR_ID",
  "rating": 5,
  "review": "Excellent equipment. The gear was clean and in great condition."
}
```

The backend should verify that:

1. The customer rented the gear.
2. The rental has been returned.
3. The customer is allowed to review it.

The frontend should only display the review form when the order is eligible.

---

# Admin API

## Get Users

### Endpoint

```http
GET /admin/users
```

### Access

Admin.

### Frontend

```text
/dashboard/admin/users/page.tsx
/components/tables/UserTable.tsx
/features/admin/admin.api.ts
```

Supported UI:

- Search
- Pagination
- Role filter
- Status filter
- User details
- Suspend
- Activate

---

# 29. Update User Status

### Endpoint

```http
PATCH /admin/users/:id
```

### Access

Admin.

Example:

```json
{
  "status": "SUSPENDED"
}
```

or:

```json
{
  "status": "ACTIVE"
}
```

Frontend flow:

```text
Suspend
   ↓
Confirmation Dialog
   ↓
PATCH
   ↓
Success Toast
   ↓
Invalidate Users Query
```

---

# Admin Gear Management

### Endpoint

```http
GET /admin/gear
```

### Access

Admin.

### Frontend

```text
/dashboard/admin/gear/page.tsx
/components/tables/GearTable.tsx
```

Admin can inspect:

- Gear
- Provider
- Category
- Price
- Stock
- Availability
- Created date

---

# Admin Rental Management

### Endpoint

```http
GET /admin/rentals
```

### Access

Admin.

### Frontend

```text
/dashboard/admin/rentals/page.tsx
/components/tables/RentalTable.tsx
```

Admin can inspect:

- Customer
- Provider
- Gear
- Rental dates
- Amount
- Payment status
- Rental status

---

# API → Frontend Component Mapping

| Frontend Page   | Component        | Method | Backend Endpoint       | Frontend endpoint | Role          |
| --------------- | ---------------- | ------ | ---------------------- | ----------------- | ------------- |
| Home            | FeaturedGear     | GET    | `/gear`                | `/`               | Public        |
| Browse Gear     | GearGrid         | GET    | `/gear`                | `/`               | Public        |
| Browse Gear     | CategoryFilter   | GET    | `/categories`          | Public            | Public        |
| Gear Details    | GearDetails      | GET    | `/gear/:gearId`        | `/gear/:geraId`   | Public        |
| Register        | RegisterForm     | POST   | `/auth/register`       | `/register`       | Public        |
| Login           | LoginForm        | POST   | `/auth/login`          | `/login`          | Public        |
| Dashboard       | AuthProvider     | GET    | `/auth/me`             | `/profile/me`     | Authenticated |
| Customer Orders | RentalTable      | GET    | `/rentals`             | Customer          | Customer      |
| Rental Details  | RentalDetails    | GET    | `/rentals/:id`         | Customer          | Customer      |
| Payment         | PaymentButton    | POST   | `/payments/create`     | Customer          | Customer      |
| Payments        | PaymentTable     | GET    | `/payments`            | Customer          | Customer      |
| Payment Details | PaymentDetails   | GET    | `/payments/:id`        | Customer          | Customer      |
| Reviews         | ReviewForm       | POST   | `/reviews`             | Customer          | Customer      |
| Provider Gear   | GearTable        | GET    | `/provider/gear`       | Provider          | Provider      |
| Add Gear        | GearForm         | POST   | `/provider/gear`       | Provider          | Provider      |
| Edit Gear       | GearForm         | PUT    | `/provider/gear/:id`   | Provider          | Provider      |
| Delete Gear     | DeleteGearDialog | DELETE | `/provider/gear/:id`   | Provider          | Provider      |
| Provider Orders | OrderTable       | GET    | `/provider/orders`     | Provider          | Provider      |
| Provider Orders | StatusButton     | PATCH  | `/provider/orders/:id` | Provider          | Provider      |
| Admin Users     | UserTable        | GET    | `/admin/users`         | Admin             | Provider      |
| User Management | StatusButton     | PATCH  | `/admin/users/:id`     | Admin             | Provider      |
| Admin Gear      | GearTable        | GET    | `/admin/gear`          | Admin             | Provider      |
| Admin Rentals   | RentalTable      | GET    | `/admin/rentals`       | Admin             | Provider      |

---

# 39. Role-Based UI

The frontend should not only protect routes.

Navigation and actions should also adapt to the current role.

### Customer

```text
Browse Gear
My Orders
Payments
Reviews
Profile
```

### Provider

```text
Dashboard
My Gear
Add Gear
Orders
Profile
```

### Admin

```text
Dashboard
Users
Gear
Rentals
Categories
Profile
```

---

## Conclusion

The GearUp frontend follows a clear separation between:

```text
UI
 ↓
Feature Components
 ↓
React Query
 ↓
API Modules
 ↓
Axios
 ↓
GearUp Backend
 ↓
Prisma
 ↓
PostgreSQL
```

This architecture keeps API communication separate from presentation components, makes server-state management predictable, and allows individual features such as authentication, rentals, payments, provider inventory, and admin management to evolve independently.
