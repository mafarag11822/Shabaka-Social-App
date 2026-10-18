import "./style/index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from "@heroui/toast";

createRoot(document.getElementById("root")!).render(
  <>
    <ToastProvider />
    <App />
  </>,
);
