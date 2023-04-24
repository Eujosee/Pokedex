import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../services/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export default function Pokemon() {
  const { id } = useParams();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true)
  const [pokedata, setPokeData] = useState({
    habilidades: [],
    altura: "",
    nome: "",
    sprites: "",
    stats: [],
    tipos: [],
    peso: "",
    texto: "",
    evolucao: [],
  });
  var color = "";

  async function getPokemon() {
    try {
      const response = await api.get(`/pokemon/${id}`);
      const secResponse = await api.get(`/pokemon-species/${id}`);
      setUrl(secResponse.data.evolution_chain.url.split("v2")[1]);
      setPokeData({
        habilidades: response.data.abilities,
        altura: response.data.height,
        nome: response.data.name,
        sprites: response.data.sprites.other['official-artwork'].front_default,
        stats: response.data.stats,
        tipos: response.data.types,
        peso: response.data.weight,
        texto: secResponse.data.flavor_text_entries[0].flavor_text,
      });
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPokemon();
  }, [url]);

  const colors = {
    bug: "bg-bug",
    dark: "bg-dark",
    dragon: "bg-dragon",
    electric: "bg-electric",
    fairy: "bg-fairy",
    fighting: "bg-fighting",
    fire: "bg-fire",
    flying: "bg-flying",
    ghost: "bg-ghost",
    grass: "bg-grass",
    ground: "bg-ground",
    ice: "bg-ice",
    normal: "bg-normal",
    poison: "bg-poison",
    psychic: "bg-psychic",
    rock: "bg-rock",
    steel: "bg-steel",
    water: "bg-water",
  };

  return (
    <>
      <div className="flex flex-col min-h-screen max-w-screen bg-[#CE092A]">
        <Header />
        <div className="flex mt-4 ml-4 justify-start items-center">
          <Link
            to="/"
            className="text-white font-semibold bg-gray-900 p-3 px-6 rounded-md"
          >
            Voltar
          </Link>
        </div>
        <div className="flex items-center justify-center mt-6">
          <div className="shadow-2xl bg-gray-700 w-11/12 h-fit p-6 mb-10 rounded-2xl">
            <div className="flex flex-col lg:flex-row gap-y-6">
              <div className="flex flex-col justify-center items-center">
                {loading ?
                 <div className="flex w-full h-40 overflow-hidden gap-2 items-center justify-center m-auto">
                 <AiOutlineLoading3Quarters
                     size={25}
                     className="animate-spin text-white"
                 />
                 <p className="text-white"> Carregando...</p>
                 </div>
                :
                <img
                  className="h-64 w-64"
                  src={pokedata.sprites}
                  alt={pokedata.nome}
                ></img>
                }
                <div className="flex flex-row items-center justify-start lg:justify-center w-full gap-x-2">
                  {pokedata.tipos.map((type, value) => {
                    color = type.type.name;
                    return (
                      <div
                        key={value}
                        className={`flex flex-row justify-start items-center gap-x-2 ${
                          colors[type.type.name]
                        } rounded-md p-2 shadow-sm`}
                      >
                        <img
                          className="h-6 w-6"
                          src={`/types/${type.type.name}.svg`}
                        />
                        <p className="text-white font-bold capitalize">
                          {type.type.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col max-w-sm mr-10">
                <h1 className="text-white capitalize text-6xl font-bold">
                  {pokedata.nome}
                </h1>
                <p className="text-justify text-lg text-white font-medium">
                  {pokedata.texto}
                </p>
                  <div className="mt-6">
                  <p className="text-xl text-white font-medium">
                    Altura:{" "}
                    <span className="font-normal">{pokedata.altura}</span>
                  </p>
                  <p className="text-xl text-white font-medium">
                    Peso: <span className="font-normal">{pokedata.peso}</span>
                  </p>
                  </div>
                  <h2 className="text-white mt-6 text-lg font-medium">Habilidades</h2>
                <div className="flex flex-row gap-x-4">
                  {pokedata.habilidades.map((item, index) => {
                    return (
                      <p key={index} className="text-white capitalize ">
                        {item.ability.name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="grid  gap-x-6">
                  {pokedata.stats.map((item, index) => {
                    return (
                      <div key={index}>
                        <p className="capitalize text-white">
                          {item.stat.name}
                        </p>
                        <div className="w-full relative h-5 bg-gray-300 rounded-lg">
                          <div
                            className={`${colors[color]} absolute top-0 left-0 h-full rounded-lg `}
                            style={{ width: `${item.base_stat}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* <div>
                <h1>Evoluções</h1>
                {url &&(
                    <EvolutionChain url={url}/>
                )}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
