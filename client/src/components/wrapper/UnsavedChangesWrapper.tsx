// UnsavedChangesWrapper.tsx
import React, { ReactNode, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BlockerFunction, useBlocker } from "react-router";

interface Props {
  when: boolean;
  message?: string;
  children: ReactNode;
}

export function UnsavedChangesWrapper({
  when,
  message = "You have unsaved changes. Are you sure you want to leave?",
  children,
}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const lastLocation = useRef(location);

  // Track browser close / reload
  useEffect(() => {
    if (!when) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [when]);

  // Block navigation within the app
  const shouldBlock = useCallback<BlockerFunction>(
    () => when,
    [when]
  );
  const blocker = useBlocker(shouldBlock);

  useEffect(() => {
    if (blocker.state === "blocked") {
      // Show confirmation dialog
      const confirmLeave = window.confirm(message);
      if (confirmLeave) {
        blocker.proceed(); // Allow navigation
      } else {
        blocker.reset();   // Stay on the page
      }
    }
  }, [blocker, message]);

  return <>{children}</>;
}
