import Card from '../../components/Card'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { BiSearchAlt } from "react-icons/bi"
import { FaArrowUp } from "react-icons/fa"
import Pagination from '../../components/Pagination'

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [searchpokemon, setSearchPokemon] = useState([])
  const [error, setError] = useState("")
  const [totalPokemon] = useState(6)
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0)
  const [total, setTotal ] = useState(0)
  
  useEffect(() => {
    async function getPokemon() {
          try {
              const { data: {count} } = await api.get("/pokemon")
              const response  = await api.get(`/pokemon?limit=${totalPokemon}&offset=${offset}`)
              setPokemons(response.data.results)
              setTotal(count)
            } catch (error) {
              console.log(error)
          }
    
      }
    getPokemon()
  }, [offset])

  async function getSearchPokemon(search, e){
    if (e.key !== 'Enter') return
    setSearchPokemon([])
    setError("")

    search = search.toLowerCase()
    try {
      const { data } = await api.get(`/pokemon/${search}`)
      setSearchPokemon([data])
    } catch (error) {
      setError("Não foi possível encontrar o pokémon, tente outro nome!")
    }
  }

  function handleReset(){
    setSearchPokemon([])
    setError("")
  }
  
  
  
  function scrollTop() {
    window.scroll({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
        <div className='w-full flex flex-col md:flex-row items-center justify-center px-6 mt-6 '>
            <div className='relative w-full md:w-1/2'>
              <input className='flex p-2 w-full rounded-md shadow-md focus:outline-none'
              type='text'
              placeholder='Pesquisar Pokemon'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => getSearchPokemon(search, e)}
              />
              <BiSearchAlt size={25} className='absolute top-2 right-3 text-gray-400'/>
            </div>
            <button className='px-10 mt-4 md:ml-4 md:mt-0 bg-gray-900 text-white rounded-md p-2'
            onClick={() => handleReset()}
            >
              <span className='font-semibold'>Limpar</span>
            </button>
        </div>
        <div className='py-10 md:px-10 flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3'>
          {/* aqui caso a variavel search esteja vazia serão exibidos todos os pokemons, caso contrario 
          sera exibido de acordo com o filtro */}
          {error && (
              <h1 className='text-white font-bold text-center text-2xl'>{error}</h1>
          )}
          {searchpokemon.length <= 0 && !error ? pokemons.map((item) => {
            return(
                <Card key={item.name} name={item.name}/>
            )
          }): searchpokemon.map((item) => {
            return(
                <Card className="grid order-2" key={item.name} name={item.name}/>
            )
          })}
        </div>
        <div className='w-full flex items-center justify-center'>
          {total > 0 && searchpokemon.length == 0 && !error && (
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