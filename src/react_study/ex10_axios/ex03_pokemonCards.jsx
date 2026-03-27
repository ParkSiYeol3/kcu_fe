import PokemonCard from "./ex02_pokemonCard"

export default function PokemonCards() {
  return (
    <div
      style={{
        display:"grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap:"16px"
      }}
    >
      {
      //TODO - PokemonCard 9장을 배치하기
        new Array(500).fill(0).map((n, i)=>{
          return <PokemonCard key={i} id={i+1}/>
        })
      
      }
    </div>
  )
}