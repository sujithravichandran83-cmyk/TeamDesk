import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Quick Links</h2>

      <div className="sidebar-links">
        <NavLink to="/">
          Dashboard
        </NavLink>

        <NavLink to="/employees">
          Employee Directory
        </NavLink>

        <NavLink to="/add-employee">
          Add Employee
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;