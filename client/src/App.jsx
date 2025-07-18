import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { getUser } from "./apis/userAPI";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectRoute from "./components/auth/ProtectRoute";
import Settings from "./pages/Settings";
import PlayList from "./pages/PlayList";
import AppLayout from "./components/layout/AppLayout";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  // console.log("User => ",user)

  useEffect(() => {
    // console.log("use Effect ran")
    let toastId;
    const getUserInfo = async () => {
      toastId = toast.loading("Loading...");
      await getUser(setUser);
      setLoading(false);
      toast.dismiss(toastId);
    };
    getUserInfo();
    return () => toast.dismiss(toastId);
  }, [setUser]);

  return (
    <>
      <Toaster position="bottom-center" />
      {loading ? (
        <></>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectRoute user={user} />}>
              <Route element={<Home />} path="/" />
              <Route element={<Settings />} path="/settings" />
              <Route element={<PlayList />} path="/playlists" />
            </Route>
            <Route element={<ProtectRoute user={!user} redirect="/" />}>
              <Route element={<Login />} path="/login" />
              <Route element={<SignUp />} path="/signup" />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
