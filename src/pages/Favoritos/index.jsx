import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination"
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Favoritos() {
    const pokemonName = {...localStorage}
    const [names, setNames] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPokemon] = useState(6)
    const [total, setTotal] = useState(0)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        getNames()
        getPokemon()
        setTotal(names.length)
    },[loading])

    function getNames() {
        if (names.length > 0) return
        let nomes = []
        for(var key in pokemonName){
            nomes.push(key)
        }
        setNames(nomes)
        setLoading(false)
    }


    function getPokemon(){
        if (loading) return
        if (names.length <= 0) return
        if (pokemons.length > 0 ) return

        try {
            names.map(async (nome) => {
                const response = await api.get(`/pokemon/${nome}`)
                setPokemons(pokemons => [...pokemons, response.data])
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <div className="min-h-screen max-w-screen bg-[#CE092A]">
            <Header/>
            <div >
                <div className="flex mt-4 ml-4 justify-start items-center gap-5">
            <Link
                to="/"
                className="text-white font-semibold bg-gray-900 p-2 px-10 rounded-md hover:bg-white hover:text-gray-900"
            >
                Voltar
            </Link>
            <h1 className="text-white font-bold text-3xl">Meus favoritos</h1>
            </div>
                {pokemons.length <= 0 && (
                    <div className="w-full h-full flex flex-col justify-center items-center mt-10">
                        <h1 className="text-white text-center font-semibold text-3xl">Você não possui pokémons favoritados!</h1>
                    </div>
                )}
                <div className='py-10 md:px-10 flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2 min-[1250px]:grid min-[1250px]:grid-cols-3'>
                    {pokemons.map((item, index) => {
                        if (index >= offset && index < offset + 6) {
                            return(
                            <Card key={item.name} name={item.name}/>
                            )
                        }
                    })}
                </div>
                <div className='w-full flex items-center justify-center'>
                    {total > 6 && (
                        <Pagination 
                        limit={totalPokemon} 
                        total={total} 
                        offset={offset}
                        setOffset={setOffset}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}