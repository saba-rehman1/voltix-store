"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 2600,
        style: {
          background: "#161B22",
          color: "#ffffff",
          border: "1px solid #232B38",
          borderRadius: "12px",
          fontSize: "13.5px",
          padding: "12px 16px",
          boxShadow: "0 10px 40px -12px rgba(0,0,0,0.5)",
        },
        success: {
          iconTheme: { primary: "#22C55E", secondary: "#161B22" },
        },
        error: {
          iconTheme: { primary: "#EF4444", secondary: "#161B22" },
        },
      }}
    />
  );
}
