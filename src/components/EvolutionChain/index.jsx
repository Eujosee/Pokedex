import api from "../../services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EvolutionChain({ url }) {
    const [names, setNames] = useState([])
    const [pokemons, setPokemons] = useState([])
    const [loading, setLoading] = useState(true)

    async function getEvolutionsName() {
        try {
          const evolution = await api.get(`${url}`);
          let first = evolution.data.chain.species.name;
          let middle = "";
          let last = "";
          if (evolution.data.chain.evolves_to[0]) {
            middle = evolution.data.chain.evolves_to[0].species.name;
          }
          if (evolution.data.chain.evolves_to[0].evolves_to[0]) {
            last = evolution.data.chain.evolves_to[0].evolves_to[0].species.name;
          }
          
          let nomes = []

          if (first !== "" && !names.includes(first)) nomes.push(first)
          if (middle !== "" && !names.includes(middle)) nomes.push(middle)
          if (last !== "" && !names.includes(last)) nomes.push(last)

          setNames(nomes)
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
    }

    async function getEvolutionData() {
      if (loading) return;
      if (pokemons.length > 0) return
        names.map(async (item) => {
          try {
            const response = await api.get(`/pokemon/${item}`)
            setPokemons(pokemons => [...pokemons, response.data])  
          } catch (error) {
            console.log(error)
          }
        })
    }


    useEffect(() => {
        getEvolutionsName()
        getEvolutionData()
    }, [loading])

    return(
        <div className="flex flex-col lg:flex-row w-full justify-around">
          {!loading && (
            <>
            {pokemons.length <= 0 && names.length <= 0 &&  (
              <p className="text-white w-full text-center mt-10 font-bold text-3xl">Este pokemon não evolui!</p>
            )}
            {pokemons.map((item) =>{
              return(
                <Link className="p-8 px-10 transition ease-in-out  delay-150 hover:-translate-y-1 hover:scale-110 duration-300" key={item.id} to={`/pokemon/${item.id}`}>
                <div className="flex flex-col items-center justify-center">
                  <img className="w-48" src={item.sprites.other['official-artwork'].front_default} alt={item.name}/>
                  <div className="flex flex-row items-center justify-center w-full gap-x-4">
                    <p className="text-white font-bold text-xl">#{item.id}</p>
                    <h1 className="capitalize text-white font-bold text-3xl">{item.name}</h1>
                  </div>
                </div>
                </Link>
              )
            })}
            </>
          )}
          {loading && (
            <h1 className="text-white w-full text-center mt-10 font-bold text-3xl">Carregando ...</h1>
          )}
        </div>
    )
}