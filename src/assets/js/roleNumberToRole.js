export default function RoleNumberToRole(roleNumber, t) {
  switch (roleNumber) {
    case "1":
      return t("technician");
    case "2":
      return t("reception");
    case "3":
      return t("accountant");
    case "4":
      return t("director");
    case "5":
      return t("manager");
    default:
      return "";
  }
}
