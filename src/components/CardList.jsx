import { Link } from "react-router-dom";

import Card from "./Card";
import Badge from "./Badge";

function CardList({
  employees,
  onDelete,
}) {
  return (
    <div className="employee-grid">

      {employees.map((employee) => {

        const department =
          employee.company?.department ||
          employee.department ||
          "Unknown";


        const role =
          employee.company?.title ||
          employee.role ||
          "Unknown";


        const fullName =
          `${employee.firstName} ${employee.lastName}`;


        const profileImage =
          employee.image ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            fullName
          )}&background=2563eb&color=ffffff&size=200`;


        return (
          <Card key={employee.id}>

            <div className="employee-card-header">

              <img
                className="employee-avatar"
                src={profileImage}
                alt={fullName}
              />


              <div>

                <h2>
                  <Link
                    to={`/employees/${employee.id}`}
                  >
                    {fullName}
                  </Link>
                </h2>


                <Badge>
                  {role}
                </Badge>

              </div>

            </div>


            <div className="employee-card-details">

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {employee.email ||
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
                {role}
              </p>

            </div>


            <div className="employee-card-actions">

              <Link
                to={`/employees/${employee.id}`}
              >
                View Profile
              </Link>


              <Link
                to={`/employees/${employee.id}/edit`}
              >
                Edit
              </Link>


              <button
                type="button"
                className="delete-button"
                onClick={() =>
                  onDelete(employee)
                }
              >
                Delete
              </button>

            </div>

          </Card>
        );
      })}

    </div>
  );
}

export default CardList;