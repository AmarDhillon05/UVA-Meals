export default function Food(props){
    console.log(props)
    return (
        <div className = {
            `border-2 border-gray-400 bg-white rounded-md border-orange-400 text-blue-200 ${props.className}
              h-3/4 w-3/4 
            `}>

            <button className = "bold text-2xl text-red-500 hover:text-red-600 transition-all float-left"
            onClick={() => {
                props.modalToggle(false)
            }}
            >x</button>
            <h1 className = "text-[#00205B] font-bold text-3xl">{props.item.name}</h1>
        </div>
    )
}