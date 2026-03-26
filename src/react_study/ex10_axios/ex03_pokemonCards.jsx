import PokemonCard from "./ex02_pokemonCard";

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
        new Array(9).fill(null).map((_, i) => (
          <PokemonCard key={i + 1} id={i + 1} />
        ))
      }
    </div>
  )
}