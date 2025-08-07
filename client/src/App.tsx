import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Layout from "./components/layout/Layout";
import requireAuth from "./components/auth/requireAuth";
import AuthComponent from "./components/auth/AuthComponent";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";

const ProtectedLayout = requireAuth(Layout);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthComponent />} />
          <Route
            path="/*"
            element={
              <ProtectedLayout username="Anything">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ProtectedLayout>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
