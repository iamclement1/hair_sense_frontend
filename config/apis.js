export const getStorageAuthItems = () => {
  const token =
    typeof window !== "undefined" && sessionStorage.getItem("token");
  const refreshToken =
    typeof window !== "undefined" && sessionStorage.getItem("refreshToken");
  const role = typeof window !== "undefined" && sessionStorage.getItem("role");
  return { token, refreshToken, role };
};
