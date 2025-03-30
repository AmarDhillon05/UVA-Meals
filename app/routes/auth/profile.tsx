import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    calorie_goals: "",
    weight: "",
    goal: "",
    protein_goals: "",
    restriction: "none",
    allergies: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Basic validation
      if (!form.weight || !form.goal) {
        setMessage("Please fill out all required fields.");
        return;
      }

      // Get user data from localStorage
      const storedData = localStorage.getItem("data");
      const user = storedData ? JSON.parse(storedData).user : null;

      // Check if user data is valid
      if (!user || !user._id) {
        setMessage("User data not found. Please log in again.");
        return;
      }

      // Make API request to update profile
      const { data } = await axios.put(
        `http://localhost:3000/api/users/update/${user._id}`,
        form
      );

      if (data.success) {
        navigate("/info/menu");
      } else {
        setMessage("Failed to update profile. Please try again.");
      }
    } catch (e: any) {
      console.error("Error saving profile:", e.message);
      setMessage(
        "An error occurred while saving your profile. Please try again."
      );
    }
  };

  return (
    <div className="container font-bold mx-auto mt-5 p-5 max-w-md bg-white shadow-md rounded-md">
      <h1 className="p-2 mx-2 text-slate-500 text-4xl text-center">
        <div>
          <span className="text-orange-500">hoo</span>meals
        </div>
      </h1>

      {/* Profile Form */}
      <form id="profileForm" onSubmit={handleSubmit}>
        {/* Calorie Goal */}
        <div className="text-xl text-gray-600 text-left mt-10">
          What is your current weight?
        </div>
        <input
          type="number"
          name="weight"
          min={0}
          value={form.weight}
          placeholder="150lbs"
          onChange={handleChange}
          required
          className="text-left border-b-4 border-slate-500 text-5xl text-slate-800 p-2 mt-5 w-full outline-none"
        />
        <div className="text-xl text-gray-600 text-left mt-10">
          What is your target weight?
        </div>
        <input
          type="number"
          name="goal"
          min={0}
          value={form.goal}
          placeholder="140lbs"
          onChange={handleChange}
          required
          className="text-left border-b-4 border-slate-500 text-5xl text-slate-800 p-2 mt-5 w-full outline-none"
        />
        {/* Dietary Restrictions */}
        <div className="text-xl text-gray-600 text-left mt-10">
          Do you have any dietary restrictions? (optional)
        </div>
        <select
          id="restriction"
          name="restriction"
          value={form.restriction}
          onChange={handleChange}
          className="text-left bg-slate-100 rounded text-slate-800 p-2 mt-5 w-full outline-none"
        >
          <option value="none">None</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten-Free</option>
          <option value="halal">Halal</option>
          <option value="kosher">Kosher</option>
        </select>

        {/* Allergies */}
        <div className="text-xl text-gray-600 text-left mt-10">
          Any allergies? (optional)
        </div>
        <input
          type="text"
          id="allergies"
          name="allergies"
          value={form.allergies}
          onChange={handleChange}
          placeholder="E.g., peanuts, shellfish"
          className="text-left bg-slate-100 rounded text-slate-800 p-2 mt-5 w-full outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="text-center bg-orange-500 rounded text-white p-2 mt-5 w-full outline-none hover:bg-orange-600"
        >
          Save Profile
        </button>
      </form>

      {/* Message Display */}
      {message && (
        <div
          id="message"
          className={`mt-4 text-center ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
