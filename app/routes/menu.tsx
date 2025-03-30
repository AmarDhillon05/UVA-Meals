import { useEffect, useState } from "react";
import Food from "../components/food.tsx"

export default function Menu() {
    const dburi = "http://localhost:2022/api/get-meals-info";
    const [menu, setMenu] = useState({});
    const [showModal, setShowModal] = useState(false)
    const [currentItem, setCurrentItem] = useState({})

    async function getData() {
        const response = await fetch(dburi);
        let data = await response.json();  
        data = JSON.parse(data);
        Object.keys(data).filter(key => data[key].name !== "").forEach(key => {
            const nut = data[key]['nutrition'];
            data[key]['cal'] = parseInt(nut.Calories);
            data[key]['fat'] = parseInt(nut['Total Fat']);
            data[key]['carb'] = parseInt(nut['Total Carbohydrates']);
            data[key]['protein'] = parseInt(nut['Protein']);
        });
        data = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value.name != "")
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
        <div className = "items-center">
            <Food item = {currentItem} modalToggle = {setShowModal} 
            className = {showModal ? "block items-center" : "hidden"}
            ></Food>
        <div className={`w-full min-h-screen bg-gray-100 text-black ${showModal ? "opacity-10" : "opacity-100"}`}>



            <div style={{ backgroundColor: "#00205B" }} className="px-8 py-8">
                <h1 className="text-white font-bold text-4xl">Today's Menu</h1>
            </div>

            <div className="flex flex-wrap justify-start px-8 py-4 bg-white shadow-md rounded-lg mb-8">
                <p className="font-semibold text-lg text-[#00205B]">Filter by:</p>

                <div className="flex items-center mx-6">
                    <input type="radio" id="calories" name="filter" className="appearance-none w-5 h-5 border-2 border-[#00205B] checked:bg-[#F67D31] checked:border-[#F67D31] mr-2 cursor-pointer" 
                    onClick={() => {
                        let copy = JSON.parse(JSON.stringify(menu)); 

                        let values = Object.values(copy).sort((a, b) => {
                            if (Object.keys(a).includes('cal') && Object.keys(b).includes('cal')) {
                                return a.cal - b.cal; 
                            } else {
                                return -1;
                            }
                        });

                        values = {...values}
                        setMenu(values)
                    }}
                    />
                    <label htmlFor="calories" className="text-md text-[#00205B]">Calories</label>
                </div>

                <div className="flex items-center mx-6">
                    <input type="radio" id="protein" name="filter" className="appearance-none w-5 h-5 border-2 border-[#00205B] checked:bg-[#F67D31] checked:border-[#F67D31] mr-2 cursor-pointer" 
                    onClick={() => {
                        let copy = JSON.parse(JSON.stringify(menu)); 

                        let values = Object.values(copy).sort((a, b) => {
                            if (Object.keys(a).includes('cal') && Object.keys(b).includes('cal')) {
                                return b.protein - a.protein; 
                            } else {
                                return -1;
                            }
                        });

                        values = {...values}
                        setMenu(values)
                    }}
                    />
                    <label htmlFor="protein" className="text-md text-[#00205B]">Protein</label>
                </div>

                <div className="flex items-center mx-6">
                    <input type="radio" id="cal-protein" name="filter" className="appearance-none w-5 h-5 border-2 border-[#00205B] checked:bg-[#F67D31] checked:border-[#F67D31] mr-2 cursor-pointer" 
                    onClick={() => {
                        let copy = JSON.parse(JSON.stringify(menu)); 

                        let values = Object.values(copy).sort((a, b) => {
                            if (Object.keys(a).includes('cal') && Object.keys(b).includes('cal')) {
                                return (a.cal/a.protein) - (b.cal/b.protein); 
                            } else {
                                return -1;
                            }
                        });

                        values = {...values}
                        setMenu(values)
                    }}
                    />
                    <label htmlFor="cal-protein" className="text-md text-[#00205B]">Cal-Protein Ratio</label>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {Object.keys(menu).map((key, idx) => {
                    const nut = menu[key].nutrition;
                    return (
                        <div 
                            key={idx} 
                            className="w-full max-w-3xl mx-auto border-2 border-[#F67D31] bg-white shadow-lg rounded-lg my-4 px-6 py-4 hover:shadow-xl transition duration-300 hover:bg-[#00205B] hover:text-[#F67D31] hover:border-[#F67D31] text-[#00205B]"
                            onClick={() => {
                                setCurrentItem(menu[key])
                                setShowModal(true)
                            }}
                        >
                            <h2 className="font-bold text-2xl ">{menu[key].name}</h2>
                            <div className="flex flex-wrap items-center text-sm font-semibold mt-2">
                                <p className="mx-2">Calories: {nut ? nut.Calories : "Not Available"}</p>
                                <p className="mx-2">Protein: {nut ? nut.Protein : "Not Available"}</p>
                                <p className="mx-2">Carb: {nut ? nut['Total Carbohydrates'] : "Not Available"}</p>
                                <p className="mx-2">Fat: {nut ? nut['Total Fat'] : "Not Available"}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
    );
}
