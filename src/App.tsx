interface PokemonCard{
  id: number;
  image: string;
  name: string;
  types: string[];
}

const data = [
  {
    id: 1,
    name: "Geodude",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png",
    types: ["fire", "water"],
  },

  {
    id: 7,
    name:"Squirtle",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    type:["water"],
  },
]

export const Detail = () => {
  return null
}

export const App = () => {
  return <div>
  <div className="flex flex-row">
    {data.map((item) => {
      return (
        <div>
          {item.id} - {item.name}
          <img src={item.image}></img>
        </div>
      )
    })}
  </div>
</div>
}