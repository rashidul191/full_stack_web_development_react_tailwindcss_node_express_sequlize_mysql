import { Routes, Route } from "react-router-dom";
import NotFound from "./view/FrontEnd/Pages/NotFound";
import { FrontendRoutes } from "./routes/FrontendRoutes";
import { UserRoutes } from "./routes/UserRoutes";
import { AdminRoutes } from "./routes/adminRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";

function App() {
  return (
    <Routes>
      {/* Frontend Routes */}
      {FrontendRoutes}

      {/* Auth Routes */}
      {AuthRoutes}

      {/* User Routes */}
      {UserRoutes}

      {/* Admin Routes */}
      {AdminRoutes}

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
