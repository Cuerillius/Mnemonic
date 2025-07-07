import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex flex-col h-screen w-full bg-black bg-[radial-gradient(at_90%_93%,hsla(12,56%,54%,0.3)_0px,transparent_50%),radial-gradient(at_0%_0%,hsla(18,100%,50%,0.5)_0px,transparent_50%)]">
      <div className="flex items-center justify-start p-4 gap-4">
        <img src="/logo.png" className="w-12 h-12" />
        <h1 className="text-3xl  font-bold">mnemonic</h1>
      </div>

      <App />
    </div>
  </StrictMode>
);
