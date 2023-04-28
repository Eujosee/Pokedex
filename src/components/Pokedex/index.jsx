import Card from '../../components/Card'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { BiSearchAlt } from "react-icons/bi"
import { FaArrowUp } from "react-icons/fa"
import Pagination from '../../components/Pagination'
import { Link } from 'react-router-dom'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState([])
  const [totalPokemon] = useState(6)
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0)
  const [total, setTotal ] = useState(0)

  useEffect(() => {
    async function getPokemon() {
          try {
              const { data: {count} } = await api.get("/pokemon")
              const response  = await api.get(`/pokemon?limit=10000&offset=0`)
              setPokemons(response.data.results)
              setTotal(count)
            } catch (error) {
              console.log(error)
          }
      }
    if (pokemons.length > 0) return
    getPokemon()
  }, [])


  useEffect(() => {
    const lowerSearch = search.toString().toLowerCase();
    setPokemonsFiltrados(pokemons.filter((item) => item.name.toLowerCase().startsWith(lowerSearch)));
  }, [search, pokemons]);

  useEffect(() => {
    setTotal(pokemonsFiltrados.length);
  }, [pokemonsFiltrados]);

  
  function scrollTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
        <div className='w-full flex flex-col md:flex-row  items-center justify-center mt-6 px-8'>
            <div className='relative w-full md:w-1/2'>
              <input className='flex p-2 w-full rounded-md shadow-md focus:outline-none'
              type='text'
              placeholder='Pesquisar Pokemon'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              />
              <BiSearchAlt size={25} className='absolute top-2 right-3 text-gray-400'/>
            </div>
            <Link to="/favoritos" className='px-10 mt-4 md:ml-4 md:mt-0 bg-gray-900 text-white rounded-md p-2'>
              <span className='font-semibold'>Favoritos</span>
            </Link>
        </div>
        <div className='py-10 md:px-10 flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2 min-[1250px]:grid min-[1250px]:grid-cols-3'>
          {/* aqui caso a variavel search esteja vazia serão exibidos todos os pokemons, caso contrario 
          sera exibido de acordo com o filtro */}
          {pokemonsFiltrados.length <= 0 && !search ? pokemons.map((item, index) => {
            if (index >= offset && index < offset + 6) {
              return(
                 <Card key={item.name} name={item.name}/>
              )
            }
          }) : pokemonsFiltrados.map((item, index) => {
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
       
 
      <button 
      onClick={scrollTop}
      aria-label='De volta ao topo'
      className='flex fixed items-center justify-center bottom-28 md:bottom-14 right-8  rounded-full h-14 w-14 shadow-2xl bg-gray-900 text-white'>
        <FaArrowUp size={30} />
      </button>
    </>
  )
}