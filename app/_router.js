"use client";
import { useState, use } from "react";
import { createRoot } from "react-dom/client";
import { createFromFetch } from "react-server-dom-webpack/client";

const root = createRoot(document.getElementById("root"));
root.render(<Router />);

function Router() {
  const [url, setUrl] = useState("rsc/" + "");
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
