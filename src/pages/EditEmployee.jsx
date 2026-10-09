import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getEmployeeById } from "../services/userService";

import Form from "../components/Form";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Toast from "../components/Toast";
import Button from "../components/Button";

function EditEmployee() {
  const { id } = useParams();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    department: "",
    role: "",
  });

  const [employeeImage, setEmployeeImage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadEmployee() {
      try {
        setLoading(true);
        setError("");

        // Check edited employee in localStorage
        const savedEmployee =
          localStorage.getItem(
            `teamdeskEmployee_${id}`
          );

        if (savedEmployee) {
          const employee =
            JSON.parse(savedEmployee);

          setForm({
            firstName:
              employee.firstName || "",

            lastName:
              employee.lastName || "",

            email:
              employee.email || "",

            age:
              employee.age || "",

            department:
              employee.company?.department ||
              employee.department ||
              "",

            role:
              employee.company?.title ||
              employee.role ||
              "",
          });

          setEmployeeImage(
            employee.image || ""
          );

          return;
        }

        // Check newly added employees
        const savedEmployees =
          JSON.parse(
            localStorage.getItem(
              "teamdeskEmployees"
            )
          ) || [];

        const localEmployee =
          savedEmployees.find(
            (employee) =>
              String(employee.id) ===
              String(id)
          );

        if (localEmployee) {
          setForm({
            firstName:
              localEmployee.firstName || "",

            lastName:
              localEmployee.lastName || "",

            email:
              localEmployee.email || "",

            age:
              localEmployee.age || "",

            department:
              localEmployee.company?.department ||
              localEmployee.department ||
              "",

            role:
              localEmployee.company?.title ||
              localEmployee.role ||
              "",
          });

          setEmployeeImage(
            localEmployee.image || ""
          );

          return;
        }

        // Otherwise get employee from API
        const employee =
          await getEmployeeById(id);

        setForm({
          firstName:
            employee.firstName || "",

          lastName:
            employee.lastName || "",

          email:
            employee.email || "",

          age:
            employee.age || "",

          department:
            employee.company?.department ||
            "",

          role:
            employee.company?.title ||
            "",
        });

        setEmployeeImage(
          employee.image || ""
        );
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load employee."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEmployee();
  }, [id]);

  function handleChange(event) {
    const { name, value } =
      event.target;

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
      return (
        "First name and last name are required."
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
      return (
        "Please enter a valid email address."
      );
    }

    if (!form.age) {
      return "Age is required.";
    }

    const age = Number(form.age);

    if (age < 18 || age > 65) {
      return (
        "Age must be between 18 and 65."
      );
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

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const updatedEmployee = {
      id: Number(id),

      firstName:
        form.firstName.trim(),

      lastName:
        form.lastName.trim(),

      email:
        form.email.trim(),

      age:
        Number(form.age),

      image:
        employeeImage,

      company: {
        department:
          form.department.trim(),

        title:
          form.role.trim(),
      },
    };

    // Save edited employee
    localStorage.setItem(
      `teamdeskEmployee_${id}`,
      JSON.stringify(updatedEmployee)
    );

    
    const savedEmployees =
      JSON.parse(
        localStorage.getItem(
          "teamdeskEmployees"
        )
      ) || [];

    const employeeExists =
      savedEmployees.some(
        (employee) =>
          String(employee.id) ===
          String(id)
      );

    if (employeeExists) {
      const updatedEmployees =
        savedEmployees.map(
          (employee) => {
            if (
              String(employee.id) ===
              String(id)
            ) {
              return {
                ...employee,
                ...updatedEmployee,
              };
            }

            return employee;
          }
        );

      localStorage.setItem(
        "teamdeskEmployees",
        JSON.stringify(
          updatedEmployees
        )
      );
    }

    setMessage(
      "Employee updated successfully!"
    );
  }

  if (loading) {
    return (
      <Loader
        message="Loading employee..."
      />
    );
  }

  if (error && !form.firstName) {
    return (
      <ErrorMessage
        message={error}
      />
    );
  }

  return (
    <main>
      <section className="form-page">

        <div className="form-header">
          <h1>Edit Employee</h1>

          <p>
            Update the employee information
            below.
          </p>
        </div>

        <Toast
          message={message}
          type="success"
          onClose={() =>
            setMessage("")
          }
        />

        {error && (
          <ErrorMessage
            message={error}
          />
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

          <Button type="submit">
            Save Changes
          </Button>

        </Form>

        <br />

        <Link to={`/employees/${id}`}>
          ← Back to Employee Profile
        </Link>

      </section>
    </main>
  );
}

export default EditEmployee;