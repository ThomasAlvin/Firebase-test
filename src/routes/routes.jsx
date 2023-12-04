import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import ProtectedPage from "./protectedpage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const routes = [
  <Route
    path="/"
    element={
      <ProtectedPage guestOnly={true}>
        <HomePage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/login"
    element={
      <ProtectedPage>
        <LoginPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/register"
    element={
      <ProtectedPage>
        <RegisterPage />
      </ProtectedPage>
    }
  ></Route>,
  <Route
    path="/admin"
    element={
      <ProtectedPage needLogin={true}>
        <AdminPage />
      </ProtectedPage>
    }
  ></Route>,
];
export default routes;
