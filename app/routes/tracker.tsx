import { useEffect, useState } from "react";
import TrackerModal from "../components/tracker_modal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function Tracker() {
  const colorMap = {
    Calories: "#454241",
    Protein: "#ff4500",
    "Total Fat": "#2648dd",
    "Total Carbohydrates": "#00b300",
    Sodium: "#ffcc00",
    Cholesterol: "#8a2be2",
  };

  const dburi = "http://localhost:3000/api/get-meals-info";
  const [menu, setMenu] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const [trackedMeals, setTrackedMeals] = useState({});
  const [trackedNutrition, setTrackedNutrition] = useState<any>({});

  const [graphData, setGraphData] = useState([]);

  async function getData() {
    const response = await fetch(dburi);
    let data = await response.json();
    data = data.menu; // ONLY FOR SIDHARTHS DATABASE
    //data = JSON.parse(data) // AMAR DB
    Object.keys(data)
      .filter((key) => data[key].name !== "")
      .forEach((key) => {
        const nut = data[key]["nutrition"];
        data[key]["cal"] = parseInt(nut.Calories);
        data[key]["fat"] = parseInt(nut["Total Fat"]);
        data[key]["carb"] = parseInt(nut["Total Carbohydrates"]);
        data[key]["protein"] = parseInt(nut["Protein"]);
      });
    data = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value.name !== "")
    );
    return data;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setMenu(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();

    //Getting tracked Data so far
    const lastTracked = localStorage.getItem("lastUpdatedDay");
    const today = new Date().getDay().toString();
    if (lastTracked == null || lastTracked != today) {
      localStorage.setItem("trackedMeals", "{}");
      localStorage.setItem("nutrition", "{}");
    }

    setTrackedMeals(JSON.parse(localStorage.getItem("trackedMeals")));
    setTrackedNutrition(JSON.parse(localStorage.getItem("trackedNutrition")));
  }, []);

  return (
    <div className="container font-bold mx-auto p-5 max-w-lg bg-white shadow-md rounded-md items-center center">
      <div className="flex w-11/12 m-auto bg-slate-950 mb-5">
        <a
          href="/info/menu"
          className="w-1/2 bg-slate-200 text-slate-950 text-center"
        >
          <div> Menu</div>
        </a>
        <a
          href="/tracker"
          className="w-1/2 bg-slate-700 text-white text-center"
        >
          <div> Tracker</div>
        </a>
      </div>
      {showModal && (
        <TrackerModal
          item={currentItem}
          modalToggle={setShowModal}
          className="block items-center"
          trackedMeals={trackedMeals}
          trackedNutrition={trackedNutrition}
          setTrackedMeals={setTrackedMeals}
          setTrackedNutrition={setTrackedNutrition}
        />
      )}

      {/* Page Content - Dim when modal is open */}
      <div
        className={`w-full min-h-screen text-black transition-opacity ${
          showModal ? "opacity-25" : "opacity-100"
        }`}
      >
        <div className="p-2 m-2">
          <h1 className="text-slate-500 text-xl text-center">
            <span className="text-orange-500">hoo</span>meals
          </h1>
          <h1 className="font-bold text-3xl text-slate-600 text-center">
            My Nutrition Statistics
          </h1>
        </div>
        <div className="flex flex-wrap justify-center text-white mb-10">
          <div className="w-1/6 p-2 m-2 bg-slate-600 rounded">
            <div className="text-xl text-center">
              {trackedNutrition.Calories}
            </div>
            <div className="text-sm font-medium text-center">Calories</div>
          </div>
          <div className="w-1/6 p-2 m-2 bg-orange-500 rounded">
            <div className="text-xl text-center">{trackedNutrition.Fat}g</div>
            <div className="text-sm font-medium text-center">Fat</div>
          </div>
          <div className="w-1/4 p-2 m-2 bg-slate-600 rounded">
            <div className="text-xl text-center">
              {trackedNutrition.Cholesterol}g
            </div>
            <div className="text-sm font-medium text-center">Cholestrol</div>
          </div>
          <div className="w-1/4 p-2 m-2 bg-orange-500 rounded">
            <div className="text-xl text-center">
              {trackedNutrition.Sodium}g
            </div>
            <div className="text-sm font-medium text-center">Sodium</div>
          </div>
          <div className="w-1/4 p-2 m-2 bg-slate-600 rounded">
            <div className="text-xl text-center">
              {trackedNutrition.Protein}g
            </div>
            <div className="text-sm font-medium text-center">Protein</div>
          </div>
          <div className="w-1/4 p-2 m-2  bg-orange-500 rounded">
            <div className="text-xl text-center">
              {trackedNutrition.Carbohydrates}g
            </div>
            <div className="text-sm font-medium text-center">Carbs</div>
          </div>
        </div>
        <div className="border-gray-200">
          <div className="container mx-auto px-4">
            {Object.keys(trackedMeals).map((key, idx) => {
              let nut = {};
              trackedMeals[key].forEach((macro) => {
                nut[macro.name] = macro.value;
              });
              return (
                <div
                  key={idx}
                  className="w-full max-w-3xl text-center border-b-6 border-[#F67D31] bg-white shadow-lg pb-2 pt-2 transition duration-300 hover:bg-slate-200 cursor-pointer hover:border-[#F67D31] text-[#00205B]"
                >
                  <h2 className="font-bold text-lg text-left">{key}</h2>
                  <div className="flex flex-wrap items-center text-sm font-semibold mt-2 text-center">
                    <p className="bg-slate-700 p-2 text-white">
                      Calories: {nut ? nut.Calories : "Not Available"}
                    </p>
                    <p className="bg-orange-600 p-2 text-white">
                      Protein: {nut ? nut.Protein : "Not Available"}
                    </p>
                    <p className="bg-blue-700 p-2 text-white">
                      Carb: {nut ? nut["Total Carbohydrates"] : "Not Available"}
                    </p>
                    <p className="bg-slate-500 p-2 text-white">
                      Fat: {nut ? nut["Total Fat"] : "Not Available"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <input
          type="text"
          placeholder="Add Meals.."
          className="text-left bg-slate-100 border-slate-200 text-slate-800 p-2 w-full outline-none"
          onChange={(v) => {
            setSearchTerm(v.target.value);
          }}
        ></input>

        <div className="bg-slate-50 h-72 overflow-scroll">
          <div className="container mx-auto p-4">
            {Object.keys(menu)
              .filter(
                (key) =>
                  menu[key].name != "" &&
                  (menu[key].name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    searchTerm == "")
              )
              .slice(0, 6)
              .map((key, idx) => {
                const nut = menu[key].nutrition;
                return (
                  <div
                    key={idx}
                    className="w-full max-w-3xl text-center border-b-6 border-[#F67D31] bg-white shadow-lg p-2 transition duration-300 hover:bg-slate-200 cursor-pointer hover:border-[#F67D31] text-[#00205B]"
                    onClick={() => {
                      setCurrentItem(menu[key]);
                      setShowModal(true);
                    }}
                  >
                    <h2 className="font-bold text-sm text-left">
                      {menu[key].name}
                    </h2>
                    <div className="flex flex-wrap items-center text-xs font-semibold mt-2 text-center">
                      <p className="bg-slate-700 p-2 text-white">
                        Calories: {nut ? nut.Calories : "Not Available"}
                      </p>
                      <p className="bg-orange-600 p-2 text-white">
                        Protein: {nut ? nut.Protein : "Not Available"}
                      </p>
                      <p className="bg-blue-700 p-2 text-white">
                        Carb:{" "}
                        {nut ? nut["Total Carbohydrates"] : "Not Available"}
                      </p>
                      <p className="bg-slate-500 p-2 text-white">
                        Fat: {nut ? nut["Total Fat"] : "Not Available"}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
