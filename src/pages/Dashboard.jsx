import { useEffect, useMemo, useState } from "react";

import { getEmployees } from "../services/userService";

import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Badge from "../components/Badge";

function Dashboard() {
  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadEmployees() {
      try {
        setLoading(true);
        setError("");

        const data =
          await getEmployees();

        setEmployees(data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  const totalEmployees =
    employees.length;

  const departmentCount =
    useMemo(() => {
      return new Set(
        employees
          .map(
            (employee) =>
              employee.company
                ?.department
          )
          .filter(Boolean)
      ).size;
    }, [employees]);

  const averageAge =
    useMemo(() => {
      if (employees.length === 0) {
        return 0;
      }

      const totalAge =
        employees.reduce(
          (total, employee) =>
            total + employee.age,
          0
        );

      return (
        totalAge / employees.length
      ).toFixed(1);
    }, [employees]);

  const departmentCounts =
    useMemo(() => {
      return employees.reduce(
        (counts, employee) => {
          const department =
            employee.company
              ?.department ||
            "Unknown";

          counts[department] =
            (counts[department] || 0) + 1;

          return counts;
        },
        {}
      );
    }, [employees]);

  const sortedDepartments =
    useMemo(() => {
      return Object.entries(
        departmentCounts
      ).sort(
        ([, countA], [, countB]) =>
          countB - countA
      );
    }, [departmentCounts]);

  if (loading) {
    return (
      <Loader
        message="Loading dashboard..."
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

  return (
    <main>
      {/* Dashboard Header */}

      <section className="dashboard-header">
        <h1>HR Dashboard</h1>

        <p>
          Welcome to TeamDesk. Manage
          your employees and HR
          information from one place.
        </p>
      </section>


      {/* Overview */}

      <section>
        <h2>Overview</h2>

        <div className="stats-grid">

          <StatCard
            title="Total Employees"
            value={totalEmployees}
          />

          <StatCard
            title="Departments"
            value={departmentCount}
          />

          <StatCard
            title="Average Age"
            value={`${averageAge} years`}
          />

        </div>
      </section>


      <br />


      {/* Department Headcount */}

      <section>
        <h2>
          Department-wise Headcount
        </h2>

        {sortedDepartments.length ===
        0 ? (
          <p>
            No department data
            available.
          </p>
        ) : (
          <div className="stats-grid">

            {sortedDepartments.map(
              ([department, count]) => {

                const percentage =
                  totalEmployees > 0
                    ? Math.round(
                        (count /
                          totalEmployees) *
                          100
                      )
                    : 0;

                return (
                  <div
                    className="stat-card"
                    key={department}
                  >
                    <h3>
                      {department}
                    </h3>

                    <p>
                      {count}
                    </p>

                    <span>
                      {count === 1
                        ? "employee"
                        : "employees"}
                    </span>

                    <div
                      style={{
                        marginTop:
                          "12px",
                        height:
                          "8px",
                        backgroundColor:
                          "var(--border-color)",
                        borderRadius:
                          "999px",
                        overflow:
                          "hidden",
                      }}
                    >
                      <div
                        style={{
                          width:
                            `${percentage}%`,
                          height:
                            "100%",
                          backgroundColor:
                            "var(--primary-color)",
                          borderRadius:
                            "999px",
                        }}
                      />
                    </div>

                    <small>
                      {percentage}% of
                      workforce
                    </small>
                  </div>
                );
              }
            )}

          </div>
        )}
      </section>


      <br />


      {/* HR Summary */}

      <section className="dashboard-summary">

        <h2>HR Summary</h2>

        <p>
          <strong>
            Workforce:
          </strong>{" "}
          {totalEmployees} employees
        </p>

        <p>
          <strong>
            Departments:
          </strong>{" "}
          {departmentCount}
        </p>

        <p>
          <strong>
            Average employee age:
          </strong>{" "}
          {averageAge} years
        </p>

        <p>
          <strong>
            Most represented department:
          </strong>{" "}

          {sortedDepartments.length >
          0
            ? sortedDepartments[0][0]
            : "N/A"}
        </p>

        <p>
          <strong>
            Status:
          </strong>{" "}

          <Badge>
            Active
          </Badge>
        </p>

      </section>
    </main>
  );
}

export default Dashboard;