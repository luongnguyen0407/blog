import LoadingPage from "./components/common/LoadingPage";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/auth-context";
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
const AboutPage = lazy(() => import("./pages/AboutPage"));
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/">
              <Route element={<MainLayout></MainLayout>}>
                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
                <Route index element={<HomePage></HomePage>}></Route>
                <Route path="about" element={<AboutPage></AboutPage>}></Route>
                <Route
                  path="post/:slug"
                  element={<PostDetailsPage></PostDetailsPage>}
                ></Route>
                <Route element={<Dashboard></Dashboard>}>
                  <Route
                    path="dashboard/post/addPost"
                    element={<AddNewPost></AddNewPost>}
                  ></Route>
                  <Route
                    path="dashboard/post"
                    element={<PostManage></PostManage>}
                  ></Route>
                  <Route
                    path="dashboard/post/updatepost"
                    element={<UpdatePost></UpdatePost>}
                  ></Route>
                  <Route
                    path="dashboard/category"
                    element={<Category></Category>}
                  ></Route>
                  <Route
                    path="dashboard/category/addcategory"
                    element={<AddCategory></AddCategory>}
                  ></Route>
                  <Route
                    path="dashboard/category/updatecategory"
                    element={<UpdateCategory></UpdateCategory>}
                  ></Route>
                  <Route
                    path="dashboard/user"
                    element={<ManageUser></ManageUser>}
                  ></Route>
                  <Route
                    path="dashboard/user/useraddnew"
                    element={<AddUser></AddUser>}
                  ></Route>
                  <Route
                    path="dashboard/user/update"
                    element={<UpdateUser></UpdateUser>}
                  ></Route>
                </Route>
              </Route>
              <Route
                path="register"
                element={<RegisterPage></RegisterPage>}
              ></Route>
              <Route path="login" element={<LoginPage></LoginPage>}></Route>
            </Route>
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;
