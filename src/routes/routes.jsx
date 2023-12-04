import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import ProtectedPage from "./protectedpage";

const routes = [
  <Route path="/" element={<HomePage />}></Route>,
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
