import { useEffect, useState } from "react"
import api from "../../services/api"

export default function Select({setFiltro}){
    const [tipos, setTipos] = useState([])

    useEffect(() => {
        async function getTypes(){
            const response = await api.get("/type/")
            setTipos(response.data.results)
        }
        getTypes()
    },[])

    return(
        <div>
            <label className="text-white font-bold mr-2">Filtrar:</label>
            <select className="capitalize p-2 px-4 bg-gray-900 rounded-md text-white font-semibold"
            onChange={(e) => setFiltro(e.target.value)}>
            <option value="" className="font-semibold capitalize">
                Todos
            </option>
                {tipos && tipos.map((item, index) => {
                    if(item.name == "shadow" || item.name == "unknown") return
                    return(
                        <option className="font-semibold capitalize" value={item.name} key={index}>
                        {item.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}