import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { ConfigProvider } from "./context/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider>
    <App />
  </ConfigProvider>,
);
