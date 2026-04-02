import { useState } from "react";
import { Grid, HStack, Button, Box } from "@chakra-ui/react";
import PokemonCard from "../components/PokemonCard";

const TYPES = [
  'fire', 'water', 'grass', 'electric', 'psychic', 'bug',
  'normal', 'poison', 'ground', 'flying', 'rock', 'ghost',
  'ice', 'dragon', 'fighting', 'dark', 'steel', 'fairy'
];

const typeKoMap = {
  normal: '노말', fire: '불꽃', water: '물', grass: '풀',
  electric: '전기', ice: '얼음', fighting: '격투', poison: '독',
  ground: '땅', flying: '비행', psychic: '에스퍼', bug: '벌레',
  rock: '바위', ghost: '고스트', dragon: '드래곤',
  dark: '악', steel: '강철', fairy: '페어리',
};

const typeColorMap = {
  fire: 'orange', water: 'blue', grass: 'green', electric: 'yellow',
  psychic: 'pink', bug: 'lime', normal: 'gray', poison: 'purple',
  ground: 'yellow', flying: 'cyan', rock: 'orange', ghost: 'purple',
  ice: 'cyan', dragon: 'blue', fighting: 'red', dark: 'gray',
  steel: 'gray', fairy: 'pink',
};

export default function PokemonCards() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <Box>
    {/* 타입 필터 버튼 */}
      <HStack flexWrap="wrap" gap={2} mb={6}>
        <Button
          size="sm"
          variant={selectedType === null ? 'solid' : 'outline'}
          onClick={() => setSelectedType(null)}
        >
          전체
        </Button>
        {TYPES.map(type => (
          <Button
            key={type}
            size="sm"
            colorPalette={typeColorMap[type]}
            variant={selectedType === type ? 'solid' : 'outline'}
            onClick={() => setSelectedType(prev => prev === type ? null : type)}
          >
            {typeKoMap[type]}
          </Button>
        ))}
      </HStack>

      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        rowGap={4}
        columnGap={4}
      >
        {Array.from({ length: 151 }, (_, i) => i + 1).map((id) => (
          <PokemonCard key={id} id={id} selectedType={selectedType} />
        ))}
      </Grid>
    </Box>
  );
}