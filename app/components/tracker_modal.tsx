import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
  } from "recharts";
  
  import { useState, useEffect } from "react";
  
  export default function TrackerModal(props) {
    // Manually assign colors to specific nutrition categories
    const colorMap = {
      Calories: "#454241",
      Protein: "#ff4500",
      "Total Fat": "#2648dd",
      "Total Carbohydrates": "#00b300",
      Sodium: "#ffcc00",
      Cholesterol: "#8a2be2",
    };
  

  
    // Ensure props.item and props.item.nutrition exist before processing
    const nutritionDataOneServing = props.item?.nutrition
      ? Object.entries(props.item.nutrition).map(([key, value]) => {
          const numericValue = parseFloat(value);
          const split = key.split(" ");
          return {
            name: split[split.length - 1],
            value: isNaN(numericValue) ? 0 : numericValue,
          };
        })
      : [];
  
    //State for nutrition data
    const [nutritionData, setNutrition] = useState(nutritionDataOneServing);
    const [value, setValue] = useState("1");
  
    useEffect(() => {
      // Update nutrition data whenever servings or the base data changes
      const n_servings = parseFloat(value) || 1; // Default to 1 if invalid
      const newNut = nutritionDataOneServing.map((el) => ({
        name: el.name,
        value: el.value * n_servings,
      }));
  
      setNutrition(newNut);
    }, [value, nutritionDataOneServing]); // Re-run the effect when servings or data change
  
    return (
      props.modalToggle && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 w-1/2 m-auto">
          <div className="relative border-2 border-gray-400 bg-white rounded-md border-orange-400 text-blue-200 h-3/4 w-3/4 p-4 shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-4 bold text-2xl text-red-500 hover:text-red-600 transition-all"
              onClick={() => props.modalToggle(false)}
            >
              x
            </button>
  
            {/* Title */}
            <h1 className="text-[#00205B] text-center mt-5 font-bold text-xl mb-4">
              {props.item?.name || "Unknown Food"}
            </h1>
  
            {/* Bar Chart */}
            {nutritionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={nutritionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#00205B" }}
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis tick={{ fill: "#00205B" }} />
                  <Tooltip />
                  <Bar dataKey="value" barSize={40}>
                    {nutritionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colorMap[entry.name] || "#cccccc"} // Default gray if missing
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-red-500">No nutrition data available.</p>
            )}
  
            {/* Footer Text */}
            <p className="text-xs font-medium mt-5 text-slate-800 text-center my-4">
              Data is color coded based on color codes defined in the items.
            </p>
  
            <div className="flex justify-center items-center text-black container">
              <p className="inline mx-2">Servings: </p>
              <input
                type="text"
                className="bg-gray-300 bg-opacity-10 opacity-50 text-black inline w-8 mx-2"
                value={value}
                onChange={(v) => {
                  let val = v.target.value;
  
                  if (val === "" || val == null) {
                    setValue("");
                  } else {
                    const match = val.match("^[0-9]*(\\.[0-9]*)?$");
                    if (match) {
                      setValue(val);
                    }
                  }
                }}
              ></input>
            </div>

            <div className="flex justify-center items-center py-2">
                <button className="container w-24 bg-[#00205B] hover:bg-orange-500 transition duration-300 px-4 py-2 rounded-md text-orange-500 hover:text-[#00205B]"
                onClick={() => {
                    
                    let newTrackedMeals = {...props.trackedMeals}
                    let newTrackedNutrition = {} //Recreating this from scratch bc no work
                 
                    newTrackedMeals[props.item.name] = nutritionData
                    
                    Object.keys(newTrackedMeals).forEach(meal => {
                      newTrackedMeals[meal].forEach(macro => {
                        if(!Object.keys(newTrackedNutrition).includes(macro.name)){
                          newTrackedNutrition[macro.name] = 0
                        }
                        newTrackedNutrition[macro.name] += macro.value
                      })
                    })


                    console.log(newTrackedNutrition)

                  

                    props.setTrackedMeals(newTrackedMeals)
                    props.setTrackedNutrition(newTrackedMeals)
                    localStorage.setItem("trackedMeals", JSON.stringify(newTrackedMeals))
                    localStorage.setItem("trackedNutrition", JSON.stringify(newTrackedNutrition))

                    props.modalToggle(false)

                }}
                >
                    Track
                </button>
            </div>

          </div>
        </div>
      )
    );
  }
  