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
    data = data.menu; // FOR SIDHARTH'S DATABASE
    // data = JSON.parse(data); FOR AMAR'S DATABASE
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
    <div className="container font-bold mx-auto p-5 max-w-lg bg-white text-white shadow-md rounded-md">
      <div className="flex w-11/12 m-auto bg-slate-950 mb-5">
        <a
          href="/info/menu"
          className="w-1/2 bg-slate-700 text-white text-center"
        >
          <div> Menu</div>
        </a>
        <a
          href="/tracker"
          className="w-1/2 bg-slate-200 text-slate-950 text-center"
        >
          <div> Tracker</div>
        </a>
      </div>
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

        <p className="font-semibold text-lg text-center text-slate-600 mt-10">
          Sort By
        </p>
        <div className="flex flex-row text-center justify-center px-8 pt-2 pb-5 bg-white shadow-md rounded-lg container text-slate-600">
          <div className="flex items-center mx-4">
            <input
              type="radio"
              id="calories"
              name="filter"
              className="appearance-none w-5 h-5 border-2 border-gray-600 checked:bg-blue-600 checked:border-blue-600 mr-2 cursor-pointer"
              onClick={() => {
                let copy = JSON.parse(JSON.stringify(menu));

                let values = Object.values(copy).sort((a, b) => {
                  if (
                    Object.keys(a).includes("cal") &&
                    Object.keys(b).includes("cal")
                  ) {
                    return a.cal - b.cal;
                  } else {
                    return -1;
                  }
                });

                values = { ...values };
                setMenu(values);
              }}
            />
            <label htmlFor="calories" className="text-xs">
              Calories
            </label>
          </div>

          <div className="flex items-center mx-4">
            <input
              type="radio"
              id="protein"
              name="filter"
              className="appearance-none w-5 h-5 border-2 border-gray-600 checked:bg-blue-600 checked:border-blue-600 mr-2 cursor-pointer"
              onClick={() => {
                let copy = JSON.parse(JSON.stringify(menu));

                let values = Object.values(copy).sort((a, b) => {
                  if (
                    Object.keys(a).includes("cal") &&
                    Object.keys(b).includes("cal")
                  ) {
                    return b.protein - a.protein;
                  } else {
                    return -1;
                  }
                });

                values = { ...values };
                setMenu(values);
              }}
            />
            <label htmlFor="protein" className="text-xs">
              Protein
            </label>
          </div>

          <div className="flex items-center mx-4">
            <input
              type="radio"
              id="cal-protein"
              name="filter"
              className="appearance-none w-5 h-5 border-2 border-gray-600 checked:bg-blue-600 checked:border-blue-600 mr-2 cursor-pointer"
              onClick={() => {
                let copy = JSON.parse(JSON.stringify(menu));

                let values = Object.values(copy).sort((a, b) => {
                  if (
                    Object.keys(a).includes("cal") &&
                    Object.keys(b).includes("cal")
                  ) {
                    return a.cal / a.protein - b.cal / b.protein;
                  } else {
                    return -1;
                  }
                });

                values = { ...values };
                setMenu(values);
              }}
            />
            <label htmlFor="cal-protein" className="text-xs">
              Cal-Protein Ratio
            </label>
          </div>
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
