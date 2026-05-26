"use client";

import Fuse from "fuse.js";

const items = [
  {
    title: "Dashboard",
  },
  {
    title: "Editor",
  },
  {
    title: "AI Workspace",
  },
  {
    title: "Collaboration",
  },
];

const fuse = new Fuse(items, {
  keys: ["title"],
  threshold: 0.3,
});

export function searchItems(query: string) {
  if (!query) return items;

  return fuse.search(query).map((r) => r.item);
}