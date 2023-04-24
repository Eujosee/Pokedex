import api from "../../services/api";
import { useEffect, useState } from "react";
export default function EvolutionChain({ url }) {
    var names = []
    
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
          names.push(first, middle, last)
          names.filter(item => item)
        } catch (error) {
          console.log(error);
        }
    }

    console.log(names)

    async function getEvolutionData() {

    }

    useEffect(() => {
        getEvolutionsName()
    }, [])
    return(
        <div>
            
        </div>
    )
}