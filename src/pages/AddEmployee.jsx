import { useState } from "react";

import Toast from "../components/Toast";
import Form from "../components/Form";
import useLocalStorage from "../hooks/useLocalStorage";

function AddEmployee() {
  const [savedEmployees, setSavedEmployees] =
    useLocalStorage("teamdeskEmployees", []);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    department: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function validateForm() {
    if (
      !form.firstName.trim() ||
      !form.lastName.trim()
    ) {
      return "First name and last name are required.";
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
      return "Please enter a valid email address.";
    }

    if (!form.age) {
      return "Age is required.";
    }

    const age = Number(form.age);

    if (age < 18 || age > 65) {
      return "Age must be between 18 and 65.";
    }

    if (!form.department.trim()) {
      return "Department is required.";
    }

    if (!form.role.trim()) {
      return "Role is required.";
    }

    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const fullName =
      `${form.firstName.trim()} ${form.lastName.trim()}`;

    const newEmployee = {
      id: Date.now(),

      firstName:
        form.firstName.trim(),

      lastName:
        form.lastName.trim(),

      email:
        form.email.trim(),

      age:
        Number(form.age),

      department:
        form.department.trim(),

      role:
        form.role.trim(),

      image:
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          fullName
        )}&background=2563eb&color=ffffff&size=200`,
    };

    setSavedEmployees([
      ...savedEmployees,
      newEmployee,
    ]);

    setMessage(
      "Employee added successfully!"
    );

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      department: "",
      role: "",
    });
  }

  return (
    <main>
      <section className="form-page">
        <div className="form-header">
          <h1>Add Employee</h1>

          <p>
            Enter the employee details below
            to add a new member to TeamDesk.
          </p>
        </div>

        <Toast
          message={message}
          type="success"
          onClose={() => setMessage("")}
        />

        {error && (
          <div
            className="error-message"
            role="alert"
          >
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label htmlFor="firstName">
                First Name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName">
                Last Name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="age">
              Age
            </label>

            <input
              id="age"
              name="age"
              type="number"
              min="18"
              max="65"
              value={form.age}
              onChange={handleChange}
              placeholder="18 - 65"
              required
            />
          </div>

          <div>
            <label htmlFor="department">
              Department
            </label>

            <input
              id="department"
              name="department"
              type="text"
              value={form.department}
              onChange={handleChange}
              placeholder="e.g. Engineering"
              required
            />
          </div>

          <div>
            <label htmlFor="role">
              Job Role
            </label>

            <input
              id="role"
              name="role"
              type="text"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          <button type="submit">
            Add Employee
          </button>
        </Form>
      </section>
    </main>
  );
}

export default AddEmployee;