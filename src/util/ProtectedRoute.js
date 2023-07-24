import { Outlet, Navigate, Route } from "react-router-dom";
const ProtectedRoute = ({}) => {
  // let auth = false;
  let auth = true;
  const checkAuth = () => {
    if (sessionStorage.getItem("user") === null) {
      console.log("gagal");
      auth = false;
    } else if (JSON.parse(window.sessionStorage.getItem("user").token != null)) {
      auth = true;
    }
    return auth;
  };
  // if (!isLoggedIn) {
  return checkAuth() ? <Outlet /> : <Navigate to="/admin/login" />;
  // }
  // return children;
};
export default ProtectedRoute;
