import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppearanceProvider } from "./context/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);
