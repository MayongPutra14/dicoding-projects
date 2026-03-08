const employees = [
  {
    name: "Fulan",
    email: "fulan@dicoding.com",
    joinYear: 2020,
  },
];

function addEmployee(name, email, joinYear) {
  const newEmploye = {
    name,
    email,
    joinYear,
  };

  return employees.push(newEmploye)
}


addEmployee("gilang", "gilang@gmail.com", 2025)

console.log(employees);