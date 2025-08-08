import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { UserProvider } from "./context/UserProvider";


const rootElement = document.getElementById("root") as HTMLElement;
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <CssBaseline />
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
