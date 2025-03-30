import { useState } from "react";

export default function register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  return (
    <h1 className="font-bold">
      <img
        src="../../../public/uvahoos.png"
        className="w-16 h-16 m-auto mt-20"
      />
      <h1 className="p-2 mx-2 text-slate-500 text-5xl text-center">
        <div>
          <span className="text-orange-500">hoo</span>meals
        </div>
        <div className="text-sm font-medium">welcome back, log in below.</div>
      </h1>

      <div className="text-center mt-10">
        <input
          type="text"
          placeholder="Username"
          className="text-left border-b-2 border-slate-300 p-2 w-3/4 outline-none"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          className="text-left border-b-2 border-slate-300 p-2 mt-5 w-3/4 outline-none"
        />
        <br />
        <button
          type="button"
          className="text-center bg-orange-500 cursor-pointer rounded text-white p-2 mt-10 w-3/4 outline-none"
        >
          Sign In
        </button>
        <br />
        <div className="mt-10 text-slate-700">
          {" "}
          Don't have an account? Use this link to{" "}
          <a href="/auth/register" className="text-blue-600">
            {" "}
            register
          </a>
          .{" "}
        </div>
      </div>
    </h1>
  );
}
