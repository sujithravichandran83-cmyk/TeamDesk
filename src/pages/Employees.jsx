import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { getEmployees } from "../services/userService";

import CardList from "../components/CardList";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Modal from "../components/Modal";
import useDebounce from "../hooks/useDebounce";


/* =========================================
   EMPLOYEE REDUCER
   ========================================= */

function employeeReducer(state, action) {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}


/* =========================================
   EMPLOYEES PAGE
   ========================================= */

function Employees() {
  const [employeeState, dispatch] =
    useReducer(employeeReducer, {
      employees: [],
      loading: true,
      error: "",
    });


  const searchInputRef = useRef(null);


  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("All");

  const [role, setRole] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("name");

  const [currentPage, setCurrentPage] =
    useState(1);


  /* =========================================
     MODAL STATE
     ========================================= */

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);


  const debouncedSearch =
    useDebounce(search, 500);


  const employeesPerPage = 5;


  /* =========================================
     LOAD EMPLOYEES
     ========================================= */

  useEffect(() => {
    async function loadEmployees() {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: true,
        });

        const apiEmployees =
          await getEmployees();


        const newEmployees =
          JSON.parse(
            localStorage.getItem(
              "teamdeskEmployees"
            )
          ) || [];


        const updatedEmployees =
          apiEmployees.map((employee) => {
            const savedEmployee =
              localStorage.getItem(
                `teamdeskEmployee_${employee.id}`
              );


            if (savedEmployee) {
              return {
                ...employee,
                ...JSON.parse(
                  savedEmployee
                ),
              };
            }


            return employee;
          });


        dispatch({
          type: "SET_EMPLOYEES",
          payload: [
            ...updatedEmployees,
            ...newEmployees,
          ],
        });


        dispatch({
          type: "SET_ERROR",
          payload: "",
        });

      } catch (err) {
        console.error(err);

        dispatch({
          type: "SET_ERROR",
          payload:
            "Unable to load employees.",
        });

      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    }


    loadEmployees();
  }, []);


  const employees =
    employeeState.employees;


  /* =========================================
     DEPARTMENTS
     ========================================= */

  const departments = useMemo(() => {
    return [
      ...new Set(
        employees
          .map(
            (employee) =>
              employee.company?.department ||
              employee.department
          )
          .filter(Boolean)
      ),
    ];
  }, [employees]);


  /* =========================================
     ROLES
     ========================================= */

  const roles = useMemo(() => {
    return [
      ...new Set(
        employees
          .map(
            (employee) =>
              employee.company?.title ||
              employee.role
          )
          .filter(Boolean)
      ),
    ];
  }, [employees]);


  /* =========================================
     FILTER EMPLOYEES
     ========================================= */

  const filteredEmployees =
    employees.filter((employee) => {
      const fullName =
        `${employee.firstName} ${employee.lastName}`;


      const matchesSearch =
        fullName
          .toLowerCase()
          .includes(
            debouncedSearch.toLowerCase()
          );


      const employeeDepartment =
        employee.company?.department ||
        employee.department;


      const employeeRole =
        employee.company?.title ||
        employee.role;


      const matchesDepartment =
        department === "All" ||
        employeeDepartment ===
          department;


      const matchesRole =
        role === "All" ||
        employeeRole === role;


      return (
        matchesSearch &&
        matchesDepartment &&
        matchesRole
      );
    });


  /* =========================================
     SORT EMPLOYEES
     ========================================= */

  const sortedEmployees = [
    ...filteredEmployees,
  ].sort((a, b) => {
    if (sortBy === "name") {
      const nameA =
        `${a.firstName} ${a.lastName}`;

      const nameB =
        `${b.firstName} ${b.lastName}`;


      return nameA.localeCompare(nameB);
    }


    if (sortBy === "age") {
      return a.age - b.age;
    }


    if (sortBy === "department") {
      const departmentA =
        a.company?.department ||
        a.department ||
        "";


      const departmentB =
        b.company?.department ||
        b.department ||
        "";


      return departmentA.localeCompare(
        departmentB
      );
    }


    return 0;
  });


  /* =========================================
     PAGINATION
     ========================================= */

  const totalPages = Math.ceil(
    sortedEmployees.length /
      employeesPerPage
  );


  const startIndex =
    (currentPage - 1) *
    employeesPerPage;


  const currentEmployees =
    sortedEmployees.slice(
      startIndex,
      startIndex + employeesPerPage
    );


  /* =========================================
     SEARCH
     ========================================= */

  const handleSearchChange =
    useCallback((event) => {
      setSearch(event.target.value);

      setCurrentPage(1);
    }, []);


  /* =========================================
     DEPARTMENT FILTER
     ========================================= */

  const handleDepartmentChange =
    useCallback((event) => {
      setDepartment(
        event.target.value
      );

      setCurrentPage(1);
    }, []);


  /* =========================================
     ROLE FILTER
     ========================================= */

  const handleRoleChange =
    useCallback((event) => {
      setRole(event.target.value);

      setCurrentPage(1);
    }, []);


  /* =========================================
     SORT
     ========================================= */

  const handleSortChange =
    useCallback((event) => {
      setSortBy(event.target.value);

      setCurrentPage(1);
    }, []);


  /* =========================================
     OPEN DELETE MODAL
     ========================================= */

  const handleDeleteClick =
    useCallback((employee) => {
      setSelectedEmployee(employee);

      setIsModalOpen(true);
    }, []);


  /* =========================================
     CLOSE DELETE MODAL
     ========================================= */

  const handleCloseModal =
    useCallback(() => {
      setIsModalOpen(false);

      setSelectedEmployee(null);
    }, []);


  /* =========================================
     DELETE EMPLOYEE
     ========================================= */

  const handleConfirmDelete =
    useCallback(() => {
      if (!selectedEmployee) {
        return;
      }


      const employeeId =
        String(selectedEmployee.id);


      /*
       * Remove from main employee list
       */

      const updatedEmployees =
        employees.filter(
          (employee) =>
            String(employee.id) !==
            employeeId
        );


      dispatch({
        type: "SET_EMPLOYEES",
        payload: updatedEmployees,
      });


      /*
       * Remove from newly added employees
       */

      const savedEmployees =
        JSON.parse(
          localStorage.getItem(
            "teamdeskEmployees"
          )
        ) || [];


      const updatedSavedEmployees =
        savedEmployees.filter(
          (employee) =>
            String(employee.id) !==
            employeeId
        );


      localStorage.setItem(
        "teamdeskEmployees",
        JSON.stringify(
          updatedSavedEmployees
        )
      );


      /*
       * Remove saved edited version
       */

      localStorage.removeItem(
        `teamdeskEmployee_${employeeId}`
      );


      /*
       * Close modal
       */

      setIsModalOpen(false);

      setSelectedEmployee(null);


      /*
       * Fix pagination if the
       * current page becomes empty
       */

      const newTotalPages =
        Math.ceil(
          (updatedEmployees.length) /
            employeesPerPage
        );


      if (
        currentPage > newTotalPages &&
        newTotalPages > 0
      ) {
        setCurrentPage(
          newTotalPages
        );
      }

    }, [
      selectedEmployee,
      employees,
      currentPage,
    ]);


  /* =========================================
     LOADING STATE
     ========================================= */

  if (employeeState.loading) {
    return (
      <Loader
        message="Loading employees..."
      />
    );
  }


  /* =========================================
     ERROR STATE
     ========================================= */

  if (employeeState.error) {
    return (
      <ErrorMessage
        message={employeeState.error}
      />
    );
  }


  /* =========================================
     UI
     ========================================= */

  return (
    <main>

      <h1>Employees</h1>


      <SearchBar
        value={search}
        onChange={handleSearchChange}
        inputRef={searchInputRef}
      />


      <br />


      <FilterDropdown
        label="Department"
        value={department}
        options={[
          "All",
          ...departments,
        ]}
        onChange={
          handleDepartmentChange
        }
      />


      <FilterDropdown
        label="Role"
        value={role}
        options={[
          "All",
          ...roles,
        ]}
        onChange={
          handleRoleChange
        }
      />


      <FilterDropdown
        label="Sort Employees"
        value={sortBy}
        options={[
          "name",
          "age",
          "department",
        ]}
        onChange={
          handleSortChange
        }
      />


      <br />


      <p>
        Showing{" "}
        {currentEmployees.length}{" "}
        of{" "}
        {sortedEmployees.length}{" "}
        employees
      </p>


      {currentEmployees.length === 0 ? (
        <p>
          No employees found.
        </p>
      ) : (
        <CardList
          employees={currentEmployees}
          onDelete={handleDeleteClick}
        />
      )}


      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={
          setCurrentPage
        }
      />


      {/* =====================================
          DELETE CONFIRMATION MODAL
          ===================================== */}

      <Modal
        isOpen={isModalOpen}
        title="Delete Employee"
        onClose={handleCloseModal}
        onConfirm={
          handleConfirmDelete
        }
      >
        {selectedEmployee && (
          <p>
            Are you sure you want to
            delete{" "}
            <strong>
              {selectedEmployee.firstName}{" "}
              {selectedEmployee.lastName}
            </strong>
            ? This action cannot be
            undone.
          </p>
        )}
      </Modal>

    </main>
  );
}


export default Employees;