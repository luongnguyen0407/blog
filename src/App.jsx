import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
const UpdateUser = lazy(() => import("./modules/user/UpdateUser"));
const AddUser = lazy(() => import("./modules/user/AddUser"));
const ManageUser = lazy(() => import("./modules/user/ManageUser"));
const PageNotFound = lazy(() => import("./pages/PageNotFound "));
const Dashboard = lazy(() => import("./layouts/Dashboard"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const Category = lazy(() => import("./modules/category/Category"));
const AddCategory = lazy(() => import("./modules/category/AddCategory"));
const UpdateCategory = lazy(() => import("./modules/category/UpdateCategory"));
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
              <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
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
                <Route
                  path="/dashboard/category/addcategory"
                  element={<AddCategory></AddCategory>}
                ></Route>
                <Route
                  path="/dashboard/category/updatecategory"
                  element={<UpdateCategory></UpdateCategory>}
                ></Route>
                <Route
                  path="/dashboard/user"
                  element={<ManageUser></ManageUser>}
                ></Route>
                <Route
                  path="/dashboard/user/useraddnew"
                  element={<AddUser></AddUser>}
                ></Route>
                <Route
                  path="/dashboard/user/update"
                  element={<UpdateUser></UpdateUser>}
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
