import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";

export default function Favoritos() {
    const pokemonsIds = [{...localStorage}]
  
    if (pokemonsIds.length <= 0) return

    const [pokemons, setPokemons] = useState([])

    useEffect(() => {
        async function getPokemon(){
            const response = await api.get()
        }
    },[])

    console.log(pokemonsIds)
    console.log(pokemonsIds.map((item) =>{
        item
    }))
    
    return(
        <div className="min-h-screen max-w-screen bg-[#CE092A]">
            <Header/>
            <div>
                {}
            </div>
        </div>
    )
}