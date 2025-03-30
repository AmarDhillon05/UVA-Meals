import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function Food(props) {
  // Manually assign colors to specific nutrition categories
  const colorMap = {
    Calories: "#454241",
    Protein: "#ff4500",
    "Total Fat": "#2648dd",
    "Total Carbohydrates": "#00b300",
    Sodium: "#ffcc00",
    Cholesterol: "#8a2be2",
  };

  console.log(props);

  // Ensure props.item and props.item.nutrition exist before processing
  const nutritionData = props.item?.nutrition
    ? Object.entries(props.item.nutrition).map(([key, value]) => {
        const numericValue = parseFloat(value);
        return {
          name: key,
          value: isNaN(numericValue) ? 0 : numericValue,
        };
      })
    : [];

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
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" tick={{ fill: "#00205B" }} />
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
          <p className="text-xs font-medium mt-5 text-slate-800 text-center">
            Data is color coded based on color codes defined in the items.
          </p>
        </div>
      </div>
    )
  );
}
