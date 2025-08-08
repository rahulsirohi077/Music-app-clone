import { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getUser } from "./apis/userAPI";
import { UserContext } from "./context/UserContext";

import ProtectRoute from "./components/auth/ProtectRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PlayList from "./pages/PlayList";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";

function App() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is not available.");
  }

  const { user, setUser } = userContext;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let toastId: string;
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
            <Route element={<ProtectRoute user={user ? user:false} />}>
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
