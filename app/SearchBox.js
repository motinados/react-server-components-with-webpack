"use client";
import { useTransition } from "react";

export default function SearchBox({ search: initialSearch }) {
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    startTransition(() => {
      window.router.navigate(`?search=${e.target.value}`);
    });
  }

  return (
    <>
      <input type="text" defaultValue={initialSearch} onChange={onChange} />
      {isPending ? "Loading..." : null}
    </>
  );
}
