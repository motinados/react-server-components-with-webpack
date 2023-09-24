"use client";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<Router />);

function Router() {
  return <ServerOutput />;
}

function ServerOutput() {
  return <div>ServerOutput</div>;
}
