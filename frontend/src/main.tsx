import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router";
import { Web3Provider } from "./lib/Web3Provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <Router />
    </Web3Provider>
  </StrictMode>
);
