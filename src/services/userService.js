const API_URL = "https://dummyjson.com/users";

export async function getEmployees() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  const data = await response.json();

  return data.users;
}

export async function getEmployeeById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Employee not found");
  }

  const data = await response.json();

  return data;
}