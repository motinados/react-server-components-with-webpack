"use client";
import { useState, use, useEffect, startTransition } from "react";
import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";

const root = createRoot(document.getElementById("root"));
root.render(<Router />);

let callbacks = [];
window.router = {
  navigate(url) {
    window.history.replaceState({}, "", url);
    callbacks.forEach((cb) => cb());
  },
};

function Router() {
  const [url, setUrl] = useState("rsc/" + window.location.search);

  useEffect(() => {
    function handleNavigate() {
      startTransition(() => {
        setUrl("rsc/" + window.location.search);
      });
    }
    callbacks.push(handleNavigate);
    window.addEventListener("popstate", handleNavigate);
    return () => {
      callbacks.splice(callbacks.indexOf(handleNavigate), 1);
      window.removeEventListener("popstate", handleNavigate);
    };
  }, []);

  return <ServerOutput url={url} />;
}

const initialCache = new Map();

function ServerOutput({ url }) {
  const [cache, setCache] = useState(initialCache);
  if (!cache.has(url)) {
    cache.set(url, createFromFetch(fetch(url)));
  }
  const content = cache.get(url);
  return use(content);
}
