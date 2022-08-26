import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import { AuthProvider } from "./contexts/auth-context";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./layouts/Dashboard";
import Category from "./pages/Dashboard/Category";
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Suspense>
          <Routes>
            <Route element={<MainLayout></MainLayout>}>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route path="/about" element={<AboutPage></AboutPage>}></Route>
              <Route element={<Dashboard></Dashboard>}>
                <Route
                  path="/dashboard/addPost"
                  element={<AboutPage></AboutPage>}
                ></Route>
                <Route
                  path="/dashboard/category"
                  element={<Category></Category>}
                ></Route>
              </Route>
            </Route>
            <Route
              path="/register"
              element={<RegisterPage></RegisterPage>}
            ></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
