# Jobtica - Employee Management System

**Live Site URL:** [https://jobtica.netlify.app](https://jobtica.netlify.app)  
**Admin Email:** admin@email.com  
**Admin Password:** admin1234


## 🌟 Features of Jobtica

1. 🧑‍💼 **Role-based Authentication** using Firebase (Employee, HR, Admin)
2. 🔐 **Protected Routes** for all dashboards with JWT Middleware on Backend
3. 📋 **Employee Work Sheet System** – Submit, Edit, Delete, and Track Work
4. 💸 **HR Salary Management** – Verify Employees, Pay Requests, View Progress
5. 🧑‍💻 **Admin Panel** – Promote to HR, Fire Employees, Adjust Salaries
6. 💰 **Secure Payment System** – Stripe Payment Gateway Integration
7. 📊 **Chart Visualization** – Salary vs. Month Chart for Employees
8. 📦 **Dynamic Dashboard Layout** – Conditional View based on Role
9. 📨 **Contact Page** – Visitor message sending system to Admin
10. 🧠 **Responsive Design** – Fully optimized for Mobile, Tablet, and Desktop

---

## 🚀 Tech Stack

- **Frontend:** React, TailwindCSS, React Router, ShadCN UI, React Hook Form, React Toastify
- **Backend:** Express.js, MongoDB, Firebase Admin SDK, JWT
- **Auth:** Firebase Email/Password & Google Social Login
- **Data Fetching:** TanStack Query (GET operations)
- **Charts & Tables:** Recharts, TanStack Table
- **Image Upload:** ImgBB
- **Payment:** Stripe API

---

## 🧾 Key Functionalities

- 🧾 Registration with Email/Password + Role Selection (No Admin in dropdown)
- 🖼️ Image upload for profile (via ImgBB)
- 📂 Fire-based login prevention after termination (without deleting from Firebase)
- 🧾 SweetAlert/Toast for all operations (No browser alert)
- 📥 Payment History with Pagination (for Employees)
- 🗃️ Role-specific Dashboard Routing with Conditional UI
- 🛡️ Secure Middleware for role checking (Firebase token + Role verification)

---
