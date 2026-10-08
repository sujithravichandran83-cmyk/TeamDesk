import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div>
          <h1>TeamDesk</h1>

          <Navbar />

          <br />

          <ThemeToggle />

          <hr />

          <Sidebar />

          <hr />

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/employees"
              element={<Employees />}
            />

            <Route
              path="/employees/:id"
              element={<EmployeeProfile />}
            />

            <Route
              path="/add-employee"
              element={<AddEmployee />}
            />

            <Route
              path="/employees/:id/edit"
              element={<EditEmployee />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;