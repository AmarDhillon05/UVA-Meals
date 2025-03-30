import { useEffect, useState } from "react";

export default function Menu() {
    const dburi = "http://localhost:2022/api/get-meals-info";
    const [menu, setMenu] = useState({});

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
        <div className="w-full min-h-screen bg-white text-black overflow-x-hidden">
            <div style={{ backgroundColor: "#000080" }} className="px-8 py-8">
                <h1 className="text-white font-bold text-4xl">Today's Menu</h1>
            </div>

            <div className="flex flex-row">
                <p className="font-bold">Filter by:</p>

                <div className="flex items-center mx-4">
                    <input type="radio" id="calories" name="filter" className="appearance-none w-4 h-4 border-2 border-gray-600 checked:bg-gray-800 checked:border-gray-800 mr-2" 
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
                    <label htmlFor="calories">Calories</label>
                </div>

                <div className="flex items-center mx-4">
                    <input type="radio" id="protein" name="filter" className="appearance-none w-4 h-4 border-2 border-gray-600 checked:bg-gray-800 checked:border-gray-800 mr-2" 
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
                    <label htmlFor="protein">Protein</label>
                </div>

                <div className="flex items-center mx-4">
                    <input type="radio" id="cal-protein" name="filter" className="appearance-none w-4 h-4 border-2 border-gray-600 checked:bg-gray-800 checked:border-gray-800 mr-2" 
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
                    <label htmlFor="cal-protein">Cal-Protein Ratio</label>
                </div>
            </div>



            <div className="container mx-auto px-4">
                {Object.keys(menu).map((key, idx) => {
                    const nut = menu[key].nutrition;
                    return (
                        <div 
                            key={idx} 
                            className="w-full max-w-3xl mx-auto border-orange-700 border-2 bg-gray-200 bg-opacity-5 my-4 px-4 py-2"
                        >
                            <h1 className="font-bold text-xl text-blue-800">{menu[key].name}</h1>
                            <div className="flex flex-wrap items-center text-sm italic font-bold">
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
    );
}
