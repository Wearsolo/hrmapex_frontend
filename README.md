# 💼 HR Management System

A modern, full-featured HR management platform built with **React (Vite)** and **Node.js**, designed for seamless employee management and intuitive dashboards — with support for dark mode, real-time search, and smooth performance.

---

## ✨ Features

🔹 **Employee Management**  
– Add, edit, delete, and filter employees  
– View detailed employee profiles  
– Department and work-type filters  
– Instant keyword search  

🔹 **Dashboard**  
– Visual summary of HR metrics  
– Attendance and payroll overview  
– Interactive charts and data cards  

🔹 **Smart UI/UX**  
– Dark/Light mode toggle  
– Responsive design (desktop & mobile)  
– Smooth animations with Framer Motion  
– Tailwind-powered layout with custom styles  

---

## ⚙️ Tech Stack

- ⚛️ React 18 + Vite  
- 🎨 Tailwind CSS + CSS Modules  
- 🎞️ Framer Motion  
- 🌐 Node.js (Express backend)  
- 🧠 Context API for state management  
- 🔁 Axios-based services layer  

---

## 📦 Installation & Usage

> Ensure Node.js is installed

```bash
# 1. Clone the project
git clone https://gitlab.com/yourusername/hrmanagement.git

# 2. Navigate to the project
cd hrmanagement

# 3. Install dependencies
npm install

# 4. Start backend server
node server/index.js

# 5. Start frontend development server
npm run dev
```

---

## 🗂️ Project Structure

```
hrmanagement/
├── server/                 # Node.js backend (API & logic)
├── src/
│   ├── assets/            # Static assets (images, icons)
│   ├── components/        # All React UI components
│   ├── context/           # Global state management
│   ├── database/          # SQL scripts and schema
│   ├── services/          # API call wrappers (axios)
│   ├── styles/            # Tailwind + custom styles
│   ├── App.jsx            # Root React component
│   ├── main.jsx           # Entry point
│   └── index.css          # Base styles
├── uploads/               # User-uploaded files (images/docs)
├── index.html             # App HTML shell
├── vite.config.js         # Vite config
└── README.md
```

---

## 📌 Key Components

- **📊 Dashboard**  
  Summary page displaying overall HR metrics such as total employees, applicants, disbursements, and leaves. Includes payroll overview charts with filtering.

- **👥 All Employees**  
  Full list of registered employees with filtering by department and real-time search.

- **💸 Disbursement**  
  Track and manage employee financial disbursements such as reimbursements, claims, and payouts.

- **📁 Payroll**  
  Manage base salary, bonuses, and overtime. View monthly breakdowns in a graphical format.

- **📰 News**  
  Company announcements or HR notices displayed for employees.

- **🌿 Leaves**  
  View and manage employee leave requests and leave status by type and period.

- **📅 Holidays**  
  View official holidays and customized company leave days.

- **⚙️ Settings**  
  Configuration area to manage system preferences, themes (dark/light), and roles.

- **👤 Admin Panel**  
  Topbar with search, notifications, and user account profile with dropdown options.

---

## 🎨 Theme Colors

| Description        | Color        |
|--------------------|--------------|
| Primary (Purple)   | `#7152F3`    |
| Background Light   | `#FFFFFF`    |
| Background Dark    | `#2C2C3A`    |
| Text Light         | `#333333`    |
| Text Dark          | `#FFFFFF`    |

---

## 🌐 Browser Compatibility

| Browser      | Supported |
|--------------|-----------|
| Chrome       | ✅         |
| Firefox      | ✅         |
| Edge         | ✅         |

---

## 🤝 Contributing

```bash
# 1. Fork this repository
# 2. Create a new branch
git checkout -b feature/YourFeature

# 3. Make changes and commit
git commit -m "✨ Add YourFeature"

# 4. Push and open a pull request
git push origin feature/YourFeature
```

---

## 🌐 Browser Support

- Chrome (latest)
- Opera (latest)
- Edge (latest)
- Brave (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

