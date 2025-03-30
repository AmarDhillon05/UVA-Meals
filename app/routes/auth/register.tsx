import { useState } from "react";
import axios from "axios";

export default function Register() {
  // State for form values
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle button click to submit form
  const handleButtonClick = async () => {
    try {
      if (form.username && form.password && form.passwordConfirm) {
        if (form.password !== form.passwordConfirm) {
          alert("Passwords don't match");
        } else {
          const body = {
            username: form.username,
            password: form.password,
          };
          const { data } = await axios.post(
            "http://localhost:3000/api/users/create",
            body
          );

          localStorage.setItem("data", JSON.stringify(data)); 
          alert("Successful Sign Up! 🎉");
          console.log(data);
        }
      } else {
        alert("Please fill out all fields!");
      }
    } catch (e) {
      console.error(e.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="font-bold">
      <img
        src="../../../public/uvahoos.png"
        className="w-16 h-16 m-auto mt-20"
      />
      <h1 className="p-2 mx-2 text-slate-500 text-5xl text-center">
        <div>
          <span className="text-orange-500">hoo</span>meals
        </div>
        <div className="text-sm font-medium">
          streamlining meal planning for college dining halls.
        </div>
      </h1>

      <div className="text-center mt-16 text-slate-600">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="text-left border-b-2 border-slate-300 p-2 w-3/4 outline-none"
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="text-left border-b-2 border-slate-300 p-2 mt-5 w-3/4 outline-none"
        />
        <br />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={form.passwordConfirm}
          onChange={handleChange}
          className="text-left border-b-2 border-slate-300 p-2 mt-5 w-3/4 outline-none"
        />
        <br />
        <button
          type="button"
          onClick={handleButtonClick}
          className="text-center bg-orange-500 rounded text-white p-2 mt-10 w-3/4 outline-none"
        >
          Register
        </button>
        <br />
        <div className="mt-10 text-slate-700">
          Already have an account? Use this link to{" "}
          <a href="/auth/log-in" className="text-blue-600">
            log in
          </a>
          .
        </div>
      </div>
    </div>
  );
}
