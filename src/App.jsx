import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import { AuthProvider } from "./contexts/auth-context";
const Dashboard = lazy(() => import("./layouts/Dashboard"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const Category = lazy(() => import("./pages/Dashboard/Category"));
const AddNewPost = lazy(() => import("./pages/Dashboard/AddNewPost"));
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
                  element={<AddNewPost></AddNewPost>}
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
