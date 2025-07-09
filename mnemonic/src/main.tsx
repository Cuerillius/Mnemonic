import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex flex-col h-screen w-full bg-black bg-[radial-gradient(at_90%_93%,hsla(12,56%,54%,0.3)_0px,transparent_50%),radial-gradient(at_0%_0%,hsla(18,100%,50%,0.5)_0px,transparent_50%)]">
      <div className="flex items-center justify-start p-4 gap-4">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          className="w-12 h-12"
        />
        <h1 className="text-3xl  font-bold">mnemonic</h1>
      </div>
      <div className="absolute top-4 right-4">
        <div
          className="p-2 rounded-md border border-gray-600 text-sm text-gray-400 bg-gray-800/50"
          title="Use arrow keys to navigate between items and Enter to select."
        >
          💡 Use your keyboard to navigate
        </div>
      </div>
      <App />
    </div>
  </StrictMode>
);
