import { useEffect, useState } from "react";
import Food from "../components/food";

export default function Menu() {
  const dburi = "http://localhost:3000/api/get-meals-info";
  const [menu, setMenu] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  async function getData() {
    const response = await fetch(dburi);
    let data = await response.json();
    data = data.menu;
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
  }, []);

  return (
    <div className="container font-bold mx-auto mt-5 p-5 max-w-lg bg-white shadow-md rounded-md">
      {/* Modal Component - Only Shows When `showModal` is True */}
      {showModal && (
        <Food
          item={currentItem}
          modalToggle={setShowModal}
          className="block items-center"
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
            Today's Menu
          </h1>
        </div>

        <div className="container mx-auto px-4">
          {Object.keys(menu).map((key, idx) => {
            const nut = menu[key].nutrition;
            return (
              <div
                key={idx}
                className="w-full max-w-3xl text-center border-b-6 border-[#F67D31] bg-white shadow-lg pb-5 pt-8 transition duration-300 hover:bg-slate-200 cursor-pointer hover:border-[#F67D31] text-[#00205B]"
                onClick={() => {
                  setCurrentItem(menu[key]);
                  setShowModal(true);
                }}
              >
                <h2 className="font-bold text-2xl text-left">
                  {menu[key].name}
                </h2>
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
    </div>
  );
}
