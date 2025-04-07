import { useContext } from "react";
import { ConfigContext } from "../context";

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfigContext must be used within an ConfigProvider");
  }
  return context;
};
