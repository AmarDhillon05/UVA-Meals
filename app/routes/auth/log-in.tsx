import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleButtonClick = async () => {
    try {
      if (form.username && form.password) {
        const body = {
          username: form.username,
          password: form.password,
        };
        const { data } = await axios.post(
          "http://localhost:3000/api/users/sign-in",
          body
        );

        localStorage.setItem("data", JSON.stringify(data));
        navigate("/auth/profile");
      } else {
        alert("Please fill out all fields!");
      }
    } catch (e: any) {
      console.error(e.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container font-bold mx-auto mt-5 p-5 max-w-md bg-white shadow-md rounded-md">
      <img
        src="/uvahoos.png" // Assuming the image is in the public folder
        alt="HooMeals Logo"
        className="w-16 h-16 m-auto mt-20"
      />
      <h1 className="p-2 mx-2 text-slate-500 text-5xl text-center">
        <div>
          <span className="text-orange-500">hoo</span>meals
        </div>
        <div className="text-sm font-medium">Welcome back, log in below.</div>
      </h1>

      <div className="text-center text-slate-800">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="text-left bg-slate-100 rounded text-slate-800 p-2 mt-5 w-3/4 outline-none"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="text-left bg-slate-100 rounded text-slate-800 p-2 mt-5 w-3/4 outline-none"
        />
        <br />
        <button
          type="button"
          onClick={handleButtonClick}
          className="text-center bg-orange-500 cursor-pointer rounded text-white p-2 mt-10 w-3/4 outline-none"
        >
          Sign In
        </button>
        <br />
        <div className="mt-10 text-slate-700">
          Don't have an account? Use this link to{" "}
          <a href="/auth/register" className="text-blue-600">
            register
          </a>
          .
        </div>
      </div>
    </div>
  );
}
