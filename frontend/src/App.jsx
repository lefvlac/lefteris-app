import ResponsiveBar from "./components/ResponsiveBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployerDetailPage from "./pages/EmployerDetailPage";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <>
      <Router>
        <ResponsiveBar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Login />} />
          <Route exact path="/employer/:id" element={<EmployerDetailPage />} />
          <Route exact path="/employer/:id/edit" element={<UpdatePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
