import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppearanceProvider } from "./context/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppearanceProvider>
      <App />
    </AppearanceProvider>
  </StrictMode>
);
