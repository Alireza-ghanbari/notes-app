import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

export default function App() {
  const token = localStorage.getItem("access_token");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={token ? <Home /> : <Navigate to={"/signin"} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="top-right"
        containerStyle={{
          top: 75,
          left: 20,
          bottom: 20,
          right: 20,
        }}
      />
    </BrowserRouter>
  );
}
