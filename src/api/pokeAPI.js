import axios from "axios";

export async function getPokemon(id) {
  try {
    const [res, speciesRes] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    ]);

    const data = res.data;
    const speciesData = speciesRes.data;

    return {
      name: data.name,
      koName: speciesData.names.find(n => n.language.name === 'ko')?.name,
      types: data.types?.map(t => t.type.name),
      image: data.sprites.other["official-artwork"].front_default,
      moves: data.moves.map(m => m.move.name),

      // Tab 1 - 기본 정보
      height: data.height / 10,          // dm → m
      weight: data.weight / 10,          // hg → kg
      abilities: data.abilities.map(a => a.ability.name),
      generation: speciesData.generation.name,
      color: speciesData.color.name,
      habitat: speciesData.habitat?.name ?? '알 수 없음',
      isLegendary: speciesData.is_legendary,
      isMythical: speciesData.is_mythical,
      description: speciesData.flavor_text_entries
        .find(f => f.language.name === 'ko')
        ?.flavor_text
        .replace(/\f/g, ' ') ?? '설명 없음',

      // Tab 2 - 능력치
      stats: data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };
  } catch (err) {
    console.error(err);
  }
}

// Tab 3 - 기술 상세 (상세 페이지에서만 호출)
export async function getMoveDetail(moveName) {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/move/${moveName}`);
    const data = res.data;
    return {
      name: moveName,
      koName: data.names.find(n => n.language.name === 'ko')?.name ?? moveName,
      description: data.flavor_text_entries
        .find(f => f.language.name === 'ko')
        ?.flavor_text
        .replace(/\f/g, ' ') ?? '설명 없음',
      power: data.power ?? '-',
      accuracy: data.accuracy ?? '-',
      pp: data.pp,
      type: data.type.name,
      damageClass: data.damage_class.name, // physical / special / status
    };
  } catch (err) {
    console.error(err);
  }
}