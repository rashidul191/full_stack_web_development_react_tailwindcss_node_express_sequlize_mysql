import React from "react";

import { Route } from "react-router-dom";
import LoginUser from "../view/Auth/LoginUser";
import RegistrationUser from "../view/Auth/RegistrationUser";

export const AuthRoutes = (
  <>
    {/* User Auth Route */}
    <Route path="/login" element={<LoginUser />} />
    <Route path="/register" element={<RegistrationUser />} />
    <Route path="/forgot-password" element={<h1>Forgot Password</h1>} />
  </>
);
