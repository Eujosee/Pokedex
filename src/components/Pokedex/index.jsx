import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import Select from '../Select'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import { BiSearchAlt } from "react-icons/bi"
import { FaArrowUp } from "react-icons/fa"

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState([])
  const [totalPokemon] = useState(6)
  const [filtro, setFiltro] = useState("")
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0)
  const [total, setTotal ] = useState(0)

  useEffect(() => {
    async function getPokemon() {
      if(filtro == ""){
        try {
            const { data: {count} } = await api.get("/pokemon")
            const response  = await api.get(`/pokemon?limit=10000&offset=0`)
            setPokemons(response.data.results)
            setTotal(count)
          } catch (error) {
            console.log(error)
        }
      }else{
        try {
          const response = await api.get(`/type/${filtro}`)
          setPokemons(response.data.pokemon)
          setTotal(response.data.pokemon.length)
        } catch (error) {
          console.log(error)
        }
      }
      }
    getPokemon()
  }, [filtro])

  useEffect(() => {
    const lowerSearch = search.toString().toLowerCase();
    setPokemonsFiltrados(pokemons.filter((item) => {
      const pokemonName = filtro == "" ? item && item.name : item && item.pokemon && item.pokemon.name;
      return pokemonName.toLowerCase().includes(lowerSearch)
    }));
    setOffset(0)
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
            <div className='flex flex-row md:flex-row items-start justify-between flex-wrap gap-y-4 md:items-center mt-4 md:mt-0 md:justify-start w-full'>
              <Link to="/favoritos" className='px-10  md:mx-4 md:mt-0 bg-gray-900 text-white rounded-md p-2 hover:bg-white hover:text-gray-900'>
                <span className='font-semibold'>Favoritos</span>
              </Link>
              <Select setFiltro={setFiltro}/>
            </div>
        </div>
        <div className='py-10 md:px-10 flex flex-col justify-center items-center gap-10 md:grid md:grid-cols-2 min-[1250px]:grid min-[1250px]:grid-cols-3'>
          {/* aqui caso a variavel search esteja vazia serão exibidos todos os pokemons, caso contrario 
          sera exibido de acordo com o filtro */}
          {pokemonsFiltrados.length <= 0 && !search ? pokemons.map((item, index) => {
            if (index >= offset && index < offset + 6) {
            const pokemonName = filtro == "" ? item && item.name : item && item.pokemon && item.pokemon.name
            return(
                 <Card key={pokemonName} name={pokemonName}/>
              )
            }
          }) : pokemonsFiltrados.length > 0 ? pokemonsFiltrados.map((item, index) => {
            if (index >= offset && index < offset + 6) {
              const pokemonName = filtro == "" ? item && item.name : item && item.pokemon && item.pokemon.name
              return(
                <Card key={pokemonName} name={pokemonName}/>
              )
            }
          }) : 
          <div className='col-span-3'>
            <h1 className='text-white font-bold text-3xl text-center'>Não foi possível achar esse pokémon, tente outro nome!</h1>
          </div>
          
          }
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