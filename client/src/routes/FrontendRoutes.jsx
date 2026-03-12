import { Route } from "react-router-dom";

import Home from "../view/FrontEnd/Pages/Home";
import BlogPage from "../view/FrontEnd/pages/BlogPage";
import BlogDetails from "../view/FrontEnd/Pages/BlogDetails";
import FrontendLayout from "../view/layouts/FrontEndLayout";

export const FrontendRoutes = (
  <>
 

    <Route element={<FrontendLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
    </Route>
  </>
);
