import Card from '../../components/Card'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { BiSearchAlt } from "react-icons/bi"
import { FaArrowUp } from "react-icons/fa"
import Pagination from '../../components/Pagination'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [totalPokemon] = useState(6)
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0)
  const [total, setTotal ] = useState(0)
  
  useEffect(() => {
    async function getPokemon() {
          try {
              const total = await api.get("/pokemon")
              const response  = await api.get(`/pokemon?limit=${totalPokemon}&offset=${offset}`)
              setPokemons(response.data.results)
              setTotal(total.data.count)
            } catch (error) {
              console.log(error)
          }
    
      }
    getPokemon()
  }, [offset])

  const lowerSearch = search.toLowerCase()
 
  const pokemonsFiltrados = pokemons.filter((item) => item.name.toLowerCase().startsWith(lowerSearch))

  function scrollTop() {
    window.scroll({
        top: 0,
        behavior: "smooth",
    })
  }
  return (
    <>
        <div className='hidden w-full  items-center justify-end px-6 mt-6 md:mt-0 md:relative md:-top-10 md:px-10'>
            <input className='flex p-2  w-full lg:w-[70%] rounded-md shadow-md focus:outline-none'
            type='text'
            placeholder='Pesquisar Pokemon'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <BiSearchAlt size={25} className='absolute right-12 text-gray-400'/>
        </div>
        <div className='py-10 md:px-10 flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3'>
          {/* aqui caso a variavel search esteja vazia serão exibidos todos os pokemons, caso contrario 
          sera exibido de acordo com o filtro */}
          {search === "" ? pokemons.map((item) => {
            return(
                <Card key={item.name} name={item.name}/>
            )
          }): pokemonsFiltrados.map((item) => {
            return(
                <Card key={item.name} name={item.name}/>
            )
          })}
        </div>
        <div className='w-full flex items-center justify-center'>
          {total > 0 && (
            <Pagination 
            limit={totalPokemon} 
            total={total} 
            offset={offset}
            setOffset={setOffset}
            />
          )}
        </div>
 
      <button onClick={scrollTop} className='flex fixed items-center justify-center bottom-14 right-8  rounded-full h-14 w-14 shadow-2xl bg-gray-900 text-white'>
        <FaArrowUp size={30} />
      </button>
    </>
  )
}