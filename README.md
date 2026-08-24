# 🏋️ GearUp — Sports & Outdoor Gear Rental Platform

<p align="center">
  <strong>Rent Sports & Outdoor Gear Instantly</strong>
</p>

<p align="center">
  A modern, responsive frontend for a sports and outdoor equipment rental platform.
  Customers can discover and rent equipment, providers can manage their inventory,
  and administrators can oversee the entire platform.
</p>

---

## ✨ Overview

**GearUp** is a modern full-stack rental platform frontend built with **Next.js**.

The application provides a clean and responsive experience for three different user roles:

- 👤 **Customer** — Browse gear, select rental dates, place orders, make payments, track rentals, and leave reviews.
- 🏪 **Provider** — Manage equipment inventory and rental orders.
- 🛡️ **Admin** — Monitor users, gear, rentals, and overall platform activity.

The frontend communicates with the GearUp backend through REST APIs and provides role-based dashboards with protected routes.

---

## 🚀 Key Features

### 🌎 Public Experience

- 🏠 Modern landing page
- 🏋️ Browse sports & outdoor equipment
- ⭐ Gear ratings
- 📦 Availability indicators
- 🖼️ Optimized gear images
- 📱 Fully responsive design
- 🌙 Dark/Light mode

### 👤 Customer

- 🔐 Registration & login
- 👤 Profile management
- 🏋️ Browse available equipment
- 📅 Interactive rental date selection
- 🛒 Rental checkout flow
- 💳 Stripe Checkout integration
- 📋 Rental order history
- 📊 Order status tracking
- 💰 Payment history
- ⭐ Submit reviews after returning equipment

### 🏪 Provider

- 📊 Provider dashboard
- 📦 Gear inventory management
- ➕ Add new equipment
- ✏️ Edit equipment
- 🗑️ Remove equipment
- 💰 Manage rental pricing
- 📈 Inventory statistics
- 📋 Incoming rental orders
- 🔄 Update rental status
- 👤 Provider profile

### 🛡️ Admin

- 📊 Platform overview
- 👥 User management
- 🚫 Suspend users
- ✅ Activate users
- 🏋️ Gear moderation
- 📋 Rental management
- 📈 Platform statistics
- 🗂️ Category management

---

# 🛠️ Tech Stack

## 🎨 Frontend

| Technology          | Purpose                                    |
| ------------------- | ------------------------------------------ |
| ⚡ **Next.js**      | React framework & application architecture |
| ⚛️ **React**        | UI development                             |
| 🔷 **TypeScript**   | Type-safe development                      |
| 🎨 **Tailwind CSS** | Styling & responsive design                |
| 🧩 **shadcn/ui**    | Reusable accessible UI components          |
| 🎯 **Lucide React** | Interface icons                            |
| 🖼️ **next/image**   | Optimized image rendering                  |

---

## 🔄 Data & API

| Technology | Purpose                  |
| ---------- | ------------------------ |
| 🛡️ **Zod** | Form and data validation |

---

## 💳 Payments

| Technology             | Purpose                        |
| ---------------------- | ------------------------------ |
| 💳 **Stripe Checkout** | Secure rental payments         |
| 🔔 **Stripe Webhooks** | Payment status synchronization |

---

## 🎨 UI & UX

| Technology          | Purpose                                      |
| ------------------- | -------------------------------------------- |
| 🧩 **shadcn/ui**    | Buttons, dialogs, tables, forms, cards, etc. |
| 🎨 **Tailwind CSS** | Responsive design system                     |
