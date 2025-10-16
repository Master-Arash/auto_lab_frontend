export default function RoleNumberToRole(roleNumber) {
  switch (roleNumber) {
    case "1":
      return "Technician";
    case "2":
      return "Reception";
    case "3":
      return "Accountant";
    case "4":
      return "Director";
    case "5":
      return "Manager";
  }
}
