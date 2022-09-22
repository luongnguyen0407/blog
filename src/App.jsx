import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingPage from "./components/common/LoadingPage";
import { AuthProvider } from "./contexts/auth-context";
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));
const UpdatePost = lazy(() => import("./modules/category/UpdatePost"));
const UpdateUser = lazy(() => import("./modules/user/UpdateUser"));
const UpdateCategory = lazy(() => import("./modules/category/UpdateCategory"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const PostManage = lazy(() => import("./modules/category/PostManage"));
const PostDetailsPage = lazy(() => import("./pages/PostDetailsPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound "));
const ManageUser = lazy(() => import("./modules/user/ManageUser"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Dashboard = lazy(() => import("./layouts/Dashboard"));
const Category = lazy(() => import("./modules/category/Category"));
const AddUser = lazy(() => import("./modules/user/AddUser"));
const AddNewPost = lazy(() => import("./pages/Dashboard/AddNewPost"));
const AddCategory = lazy(() => import("./modules/category/AddCategory"));
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/">
              <Route element={<MainLayout />}>
                <Route path="*" element={<PageNotFound />}></Route>
                <Route index element={<HomePage />}></Route>
                <Route path="updateprofile" element={<UpdateProfile />}></Route>
                <Route path="post/:slug" element={<PostDetailsPage />}></Route>
                <Route element={<Dashboard />}>
                  <Route
                    path="dashboard/post/addPost"
                    element={<AddNewPost />}
                  ></Route>
                  <Route path="dashboard/post" element={<PostManage />}></Route>
                  <Route
                    path="dashboard/post/updatepost"
                    element={<UpdatePost />}
                  ></Route>
                  <Route
                    path="dashboard/category"
                    element={<Category />}
                  ></Route>
                  <Route
                    path="dashboard/category/addcategory"
                    element={<AddCategory />}
                  ></Route>
                  <Route
                    path="dashboard/category/updatecategory"
                    element={<UpdateCategory />}
                  ></Route>
                  <Route path="dashboard/user" element={<ManageUser />}></Route>
                  <Route
                    path="dashboard/user/useraddnew"
                    element={<AddUser />}
                  ></Route>
                  <Route
                    path="dashboard/user/update"
                    element={<UpdateUser />}
                  ></Route>
                </Route>
              </Route>
              <Route path="register" element={<RegisterPage />}></Route>
              <Route path="login" element={<LoginPage />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
