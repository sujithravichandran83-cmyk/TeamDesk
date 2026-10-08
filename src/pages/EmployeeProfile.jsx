import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getEmployeeById } from "../services/userService";

import DetailPage from "../components/DetailPage";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Badge from "../components/Badge";
import Button from "../components/Button";

function EmployeeProfile() {
  const { id } = useParams();

  const [employee, setEmployee] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadEmployee() {
      try {
        setLoading(true);
        setError("");

        const savedEmployee =
          localStorage.getItem(
            `teamdeskEmployee_${id}`
          );

        if (savedEmployee) {
          const saved =
            JSON.parse(savedEmployee);

          try {
            const apiEmployee =
              await getEmployeeById(id);

            setEmployee({
              ...apiEmployee,
              ...saved,
              image:
                saved.image ||
                apiEmployee.image,
            });
          } catch (apiError) {
            console.error(apiError);

            setEmployee(saved);
          }

          return;
        }

        const savedEmployees =
          JSON.parse(
            localStorage.getItem(
              "teamdeskEmployees"
            )
          ) || [];

        const localEmployee =
          savedEmployees.find(
            (item) =>
              String(item.id) ===
              String(id)
          );

        if (localEmployee) {
          setEmployee(localEmployee);
          return;
        }

        const apiEmployee =
          await getEmployeeById(id);

        setEmployee(apiEmployee);
      } catch (err) {
        console.error(err);

        setError(
          "Employee not found."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEmployee();
  }, [id]);

  if (loading) {
    return (
      <Loader
        message="Loading employee..."
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
      />
    );
  }

  if (!employee) {
    return (
      <ErrorMessage
        message="Employee not found."
      />
    );
  }

  const fullName =
    `${employee.firstName} ${employee.lastName}`;

  const department =
    employee.company?.department ||
    employee.department ||
    "Not specified";

  const role =
    employee.company?.title ||
    employee.role ||
    "Not specified";

  const profileImage =
    employee.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName
    )}&background=2563eb&color=ffffff&size=200`;

  const address =
    employee.address;

  return (
    <main>
      <DetailPage title="Employee Profile">

        <div className="profile-container">

          <img
            className="profile-image"
            src={profileImage}
            alt={fullName}
            width="120"
            height="120"
          />

          <h1>{fullName}</h1>

          <p>
            <strong>
              Department:
            </strong>{" "}
            <Badge>
              {department}
            </Badge>
          </p>

          <p>
            <strong>
              Role:
            </strong>{" "}
            <Badge>
              {role}
            </Badge>
          </p>

          <p>
            <strong>
              Email:
            </strong>{" "}
            {employee.email ||
              "Not available"}
          </p>

          <p>
            <strong>
              Phone:
            </strong>{" "}
            {employee.phone ||
              "Not available"}
          </p>

          <p>
            <strong>
              Age:
            </strong>{" "}
            {employee.age ||
              "Not available"}
          </p>

          <p>
            <strong>
              Username:
            </strong>{" "}
            {employee.username ||
              "Not available"}
          </p>

          {address && (
            <p>
              <strong>
                Address:
              </strong>{" "}
              {address.address || ""}
              {address.city
                ? `, ${address.city}`
                : ""}
              {address.state
                ? `, ${address.state}`
                : ""}
              {address.postalCode
                ? ` - ${address.postalCode}`
                : ""}
            </p>
          )}

          <br />

          <Link
            to={`/employees/${id}/edit`}
          >
            <Button>
              Edit Employee
            </Button>
          </Link>

          <br />
          <br />

          <Link to="/employees">
            ← Back to Employees
          </Link>

        </div>

      </DetailPage>
    </main>
  );
}

export default EmployeeProfile;