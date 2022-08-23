import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
