import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";

// const SignIn = lazy(() => import("./pages/SignIn"));
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <span>Home Page</span>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <span>Search Page</span>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
