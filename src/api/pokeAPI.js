import axios from "axios";

export async function getPokemon(id) {
  try {
    const [res, speciesRes] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    ]);

    const data = res.data;
    const speciesData = speciesRes.data;

    // 특성 한국어 — 별도 API 호출
    const abilityDetails = await Promise.all(
      data.abilities.map(a => axios.get(a.ability.url))
    );
    const abilitiesKo = abilityDetails.map(r =>
      r.data.names.find(n => n.language.name === 'ko')?.name ?? r.data.name
    );

    // 세대 한국어
    const generationRes = await axios.get(speciesData.generation.url);
    const generationKo = generationRes.data.names
      .find(n => n.language.name === 'ko')?.name ?? speciesData.generation.name;

    // 서식지 한국어
    let habitatKo = '알 수 없음';
    if (speciesData.habitat) {
      const habitatRes = await axios.get(speciesData.habitat.url);
      habitatKo = habitatRes.data.names
        .find(n => n.language.name === 'ko')?.name ?? speciesData.habitat.name;
    }

    return {
      name: data.name,
      koName: speciesData.names.find(n => n.language.name === 'ko')?.name,
      types: data.types?.map(t => t.type.name),
      image: data.sprites.other["official-artwork"].front_default,
      moves: data.moves.map(m => m.move.name),
      height: data.height / 10,
      weight: data.weight / 10,
      abilities: abilitiesKo,      
      generation: generationKo,    
      habitat: habitatKo,           
      isLegendary: speciesData.is_legendary,
      isMythical: speciesData.is_mythical,
      description: speciesData.flavor_text_entries
        .find(f => f.language.name === 'ko')
        ?.flavor_text.replace(/\f/g, ' ') ?? '설명 없음',
      stats: data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };
  } catch (err) {
    console.error(err);
  }
}

export async function getMoveDetail(moveName) {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/move/${moveName}`);
    const data = res.data;
    return {
      name: moveName,
      koName: data.names.find(n => n.language.name === 'ko')?.name ?? moveName,
      description: data.flavor_text_entries
        .find(f => f.language.name === 'ko')
        ?.flavor_text.replace(/\f/g, ' ') ?? '설명 없음',
      power: data.power ?? '-',
      accuracy: data.accuracy ?? '-',
      pp: data.pp,
      type: data.type.name,
      damageClass: data.damage_class.name,
    };
  } catch (err) {
    console.error(err);
  }
}