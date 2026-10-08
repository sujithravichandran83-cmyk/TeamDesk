import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">
          TeamDesk
        </NavLink>
      </div>

      <div className="navbar-links">
        <NavLink to="/">
          Dashboard
        </NavLink>

        <NavLink to="/employees">
          Employees
        </NavLink>

        <NavLink to="/add-employee">
          Add Employee
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;