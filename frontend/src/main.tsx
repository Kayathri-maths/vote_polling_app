import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import CreatePoll from "./pages/CreatePoll";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          // <ProtectedRoute>
          <Dashboard />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/create"
        element={
          // <ProtectedRoute>
          <CreatePoll />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          // <ProtectedRoute>
          <Profile />
          // </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
