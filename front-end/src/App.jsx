import "./App.css";
import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Nav from "./components/Nav";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Nav />} />
      <Route path="/userprofil" element={<User />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
