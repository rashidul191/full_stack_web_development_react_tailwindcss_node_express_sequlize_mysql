import React from "react";
import { ROLES } from "../enum/Roles";
import PrivateRoute from "./PrivateRoute";
import UserLayout from "../view/layouts/UserLayout";
import { Route } from "react-router-dom";

export const UserRoutes = (
  <>
    <Route
      path="/user"
      element={
        <PrivateRoute role={ROLES.User}>
          <UserLayout />
        </PrivateRoute>
      }
    >
      <Route path="dashboard" element={<h1>User Dashboard</h1>} />
      <Route path="profile" element={<h1>User Profile</h1>} />
    </Route>
  </>
);
