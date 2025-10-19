import useAuthStore from "../../stores/authStore.js";

export default function roleCheck(requiredRole) {
  const { role } = useAuthStore.getState();
  return role === requiredRole || role === "5";
}
