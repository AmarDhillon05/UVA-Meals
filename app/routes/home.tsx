import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const text = "streamlining meal planning for college dining halls.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText(""); // Reset on re-render

    const interval = setInterval(() => {
      setDisplayedText((prev) => text.slice(0, i + 1));
      i++;

      if (i >= text.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="container font-bold mx-auto p-5 mt-16 max-w-xl bg-white shadow-md rounded-md">
      <img
        src="../../../public/uvahoos.png"
        className="w-32 h-32 m-auto mt-20"
      />
      <h1 className="p-2 mx-2 text-slate-500 text-8xl text-center">
        <div>
          <span className="text-orange-500">hoo</span>meals
        </div>
        <div className="text-lg text-slate-900 font-medium h-6">{displayedText}</div>
        <a
          href="/auth/register"
          className="text-center bg-orange-500 text-2xl rounded text-white p-2 mt-10 w-3/4 outline-none"
        >
          Start Now
        </a>
      </h1>
    </div>
  );
}
