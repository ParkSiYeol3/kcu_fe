import axios from "axios";

export async function getPokemon(id) {
  try {
    const [res, speciesRes] =await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    ])
      
    const data = res.data;
    const speciesData = speciesRes.data;
    
    const result = {
      name: data.name,
      koName: speciesData.names.find(n=> n.language.name ==='ko')?.name,
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