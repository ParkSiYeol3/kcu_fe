import axios from "axios";

// axios.get("https://pokeapi.co/api/v2/pokemon/1")
//   .then(res => 
//     console.log(res.data)
// );

export async function getPokemon(id) {
  try {
    const [res, specieRes] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    ]);
    const data = res.data;
    const speciesData = specieRes.data;
    const result = {
      name: data.name,
      kdname: speciesData.names.find(n => n.language.name === 'ko')?.name,
      types: data.types?.map(t=>t.type.name),
      image: data.sprites.other["official-artwork"].front_default,
      moves: data.moves.map(m=>m.move.name)
    }
    // console.log(result)
    return result;
  } catch (err) {
    console.error(err)
  }
}

getPokemon(1);