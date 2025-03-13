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



async function fetchData(): Promise<string[]>{
  const data = await PokeAPI.getPokemonsList();
   return data.results.map(item=> item.name);
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
          id: 1,
          name: item,
          image: item,
          types: [item],
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