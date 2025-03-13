import { PokeAPI } from "./pokeapiClient";
import { useEffect, useState } from 'react';

interface PokemonCard{
  id: number;
  image: string;
  name: string;
  types: string[];
}

export const Detail = () => {
  return null
}

const typeColors: { [key: string]: string} = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  poison: "bg-purple-500",
  grass: "bg-green-500",
  flying: "bg-sky-500",
  bug: "bg-lime-500",
};

function getTypeColor(type: string){
  const color= typeColors[type];
  return color;
}

interface Cardprops{
  id: number;
  image: string;
  name: string;
  type: string[];
}



async function fetchData(): Promise<PokemonCard[]>{
  const data = await PokeAPI.getPokemonsList();
  const pokemons = await Promise.all(
    data.results.map((pokemon) => {
      return PokeAPI.getPokemonByName(pokemon.name);
    })
  );

   return pokemons.map((pokemon) => {
    return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_shiny ?? "",
    types: pokemon.types.map((t) => t.type.name),
   };
});
}

const Card = (props: Cardprops) => {
  return (<div className="bg-white w-2sx">
    {props.id} - {props.name}
    <img src={props.image}/>
    <div className="flex flex-wrap gap-4">
      {props.type.map((type) => {
        return(
          <div className={`p-4 ${getTypeColor(type)}`}>{type}</div>
        )
      })}
      </div>
    </div>
  )

}

export const App = () => {
  const [data, setData] = useState<PokemonCard[]>([]);
  useEffect(() => {

    fetchData().then((result) => {
      setData(
        result.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          types: item.types,
        }))
      );
    });
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-4 p-4">
        {data.map((item) => {
          return <Card id={item.id} name={item.name} image={item.image} type={item.types}/>
        })}
      </div>
    </div>
  )
}