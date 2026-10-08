# TeamDesk — Employee Management System

TeamDesk is a responsive Employee Management System built with React. It helps HR teams view, search, filter, sort, add, edit, and delete employee records while providing useful workforce statistics through an HR dashboard.

## Live Demo

https://team-desk-jade.vercel.app

## GitHub Repository

https://github.com/sujithravichandran83-cmyk/TeamDesk

---

## Project Overview

TeamDesk was developed as a capstone project for an HR-focused Employee Management System.

The application uses the DummyJSON Users API to load employee information and provides additional employee management features using React state and localStorage.

### Main Features

- HR dashboard
- Employee directory
- Employee search
- Department filtering
- Role filtering
- Employee sorting
- Pagination
- Employee profile page
- Add employee form
- Edit employee form
- Delete employee with confirmation modal
- Form validation
- Dark and light theme
- Responsive design
- Loading states
- Error handling
- Empty states
- Toast notifications
- localStorage support
- Debounced employee search

---

## HR Dashboard

The dashboard provides an overview of the workforce, including:

- Total employee count
- Number of departments
- Average employee age
- Department-wise headcount
- Most represented department

---

## Employee Directory

The employee directory allows HR users to:

- Search employees by name
- Filter by department
- Filter by role
- Sort employees by name, age, or department
- Navigate through paginated employee records
- View employee profiles
- Edit employee information
- Delete employees

---

## Employee Management

### Add Employee

HR users can add new employees using a controlled form with validation.

Required information includes:

- First name
- Last name
- Email
- Age
- Department
- Job role

### Edit Employee

Existing employee information can be updated through the edit form.

### Delete Employee

Employees can be deleted using a confirmation modal to prevent accidental deletion.

---

## Employee Profile

Each employee has a dedicated profile page containing:

- Profile image
- Full name
- Department
- Role
- Email
- Phone
- Age
- Username
- Address

---

## Technologies Used

### Frontend

- React
- JavaScript ES6+
- HTML5
- CSS3

### React Features

- React Router
- Context API
- useState
- useEffect
- useContext
- useReducer
- useRef
- useMemo
- useCallback
- Custom Hooks

### API

DummyJSON Users API:

https://dummyjson.com/users

### Storage

Browser localStorage is used to preserve:

- Added employees
- Edited employee information
- Theme preference

### Deployment

Vercel

### Version Control

Git and GitHub

---

## React Components

The project contains more than the required 15 React components.

Main components include:

- Navbar
- Footer
- Sidebar
- SearchBar
- FilterDropdown
- Card
- CardList
- DetailPage
- Form
- Modal
- Loader
- ErrorMessage
- Pagination
- Toast
- ThemeToggle
- Button
- Badge
- StatCard
- NotFound

---

## Custom Hooks

The project includes two custom hooks:

### useDebounce

Used to delay employee search filtering until the user stops typing.

### useLocalStorage

Used to synchronize React state with browser localStorage.

---

## Project Structure

```text
TeamDesk/
│
├── public/
│
├── screenshots/
│   ├── dashboard.png
│   ├── employees.png
│   ├── employee-profile.png
│   └── add-employee.png
│
├── src/
│   │
│   ├── components/
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── CardList.jsx
│   │   ├── DetailPage.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── FilterDropdown.jsx
│   │   ├── Footer.jsx
│   │   ├── Form.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotFound.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Toast.jsx
│   │
│   ├── context/
│   │   └── ThemeContext.jsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   └── useLocalStorage.js
│   │
│   ├── pages/
│   │   ├── AddEmployee.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditEmployee.jsx
│   │   ├── EmployeeProfile.jsx
│   │   └── Employees.jsx
│   │
│   ├── services/
│   │   └── userService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js