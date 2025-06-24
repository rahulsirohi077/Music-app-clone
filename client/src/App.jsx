import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useContext, useEffect, useState, Suspense } from "react";
import { UserContext } from "./context/UserContext";
import { getUser } from "./apis/userAPI";

import React from "react";
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const ProtectRoute = React.lazy(() => import("./components/auth/ProtectRoute"));

function App() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let toastId;
    const getUserInfo = async () => {
      toastId = toast.loading("Loading...");
      await getUser(setUser,toastId);
      setLoading(false);
    };
    getUserInfo();
    return () => toast.dismiss(toastId);
  }, [setUser]);

  if (loading) {
    return <></>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route element={<Home />} path="/" />
          </Route>
          <Route element={<ProtectRoute user={!user} redirect="/"/>}>
            <Route element={<Login />} path="/login" />
            <Route element={<SignUp />} path="/signup" />
          </Route>
        </Routes>
        <Toaster position="bottom-center" />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
