import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemon, getMoveDetail } from "../api/pokeAPI";
import PokemonCard from "../components/PokemonCard";
import { HStack, Box, Tabs, Stack, Text, Badge, Progress, Spinner, Button } from "@chakra-ui/react";

const statKoMap = {
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  'special-attack': '특수공격',
  'special-defense': '특수방어',
  speed: '스피드',
};

const statColorMap = {
  hp: 'green',
  attack: 'red',
  defense: 'blue',
  'special-attack': 'purple',
  'special-defense': 'cyan',
  speed: 'yellow',
};

const PAGE_SIZE = 10;

export default function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [moveDetails, setMoveDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMoves, setLoadingMoves] = useState(false);

  // 포켓몬 기본 데이터
  useEffect(() => {
    getPokemon(id).then(setPokemon);
  }, [id]);

  // 기술 데이터 (Tab 3)
  useEffect(() => {
    if (!pokemon) return;
    async function fetchMoves() {
      setLoadingMoves(true);
      const targets = pokemon.moves.slice(0, page * PAGE_SIZE);
      const results = await Promise.all(targets.map(m => getMoveDetail(m)));
      setMoveDetails(results.filter(Boolean));
      setLoadingMoves(false);
    }
    fetchMoves();
  }, [page, pokemon]);

  return (
    <HStack align="flex-start" gap={6}>
      <PokemonCard id={id} />

      <Box flex={1} minW={0}>
        <Tabs.Root variant="enclosed" fitted defaultValue="tab-1">
          <Tabs.List>
            <Tabs.Trigger value="tab-1"
            _selected={{
              bg: "blue.500",
              color: "white",
            }}
            >
              기본 정보
            </Tabs.Trigger>
            <Tabs.Trigger value="tab-2">능력치</Tabs.Trigger>
            <Tabs.Trigger value="tab-3">기술</Tabs.Trigger>
          </Tabs.List>

          {/* Tab 1 - 기본 정보 */}
          <Tabs.Content value="tab-1">
            <Stack gap={3}>
              <Box>
                <Text fontWeight="bold">📏 키 / 몸무게</Text>
                <Text>{pokemon?.height}m / {pokemon?.weight}kg</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">✨ 특성</Text>
                <Text>{pokemon?.abilities.join(', ')}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">🌍 세대 / 색깔 / 서식지</Text>
                <Text>{pokemon?.generation} / {pokemon?.color} / {pokemon?.habitat}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">🏅 분류</Text>
                <Box>
                  {pokemon?.isLegendary && <Badge colorPalette="yellow" mr={1}>전설</Badge>}
                  {pokemon?.isMythical && <Badge colorPalette="purple" mr={1}>환상</Badge>}
                  {pokemon && !pokemon.isLegendary && !pokemon.isMythical && <Text>일반</Text>}
                </Box>
              </Box>
              <Box>
                <Text fontWeight="bold">📖 도감 설명</Text>
                <Text>{pokemon?.description}</Text>
              </Box>
            </Stack>
          </Tabs.Content>

          {/* Tab 2 - 능력치 */}
          <Tabs.Content value="tab-2">
            <Stack gap={3}>
              {pokemon?.stats.map((stat) => (
                <Box key={stat.name}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Text fontSize="sm" fontWeight="bold">
                      {statKoMap[stat.name] ?? stat.name}
                    </Text>
                    <Text fontSize="sm">{stat.value}</Text>
                  </Box>
                  <Progress.Root
                    value={stat.value}
                    max={255}
                    colorPalette={statColorMap[stat.name] ?? 'gray'}
                    size="sm"
                    borderRadius="full"
                  >
                    <Progress.Track>
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                </Box>
              ))}
            </Stack>
          </Tabs.Content>

          {/* Tab 3 - 기술 */}
          <Tabs.Content value="tab-3">
            <Stack gap={3}>
              {moveDetails.map((move) => (
                <Box key={move.name} borderWidth={1} borderRadius="md" p={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Text fontWeight="bold">{move.koName}</Text>
                    <Box display="flex" gap={2}>
                      <Badge>{move.type}</Badge>
                      <Badge colorPalette={
                        move.damageClass === 'physical' ? 'red' :
                        move.damageClass === 'special' ? 'purple' : 'gray'
                      }>
                        {move.damageClass === 'physical' ? '물리' :
                         move.damageClass === 'special' ? '특수' : '변화'}
                      </Badge>
                    </Box>
                  </Box>
                  <Box display="flex" gap={4} mb={1}>
                    <Text fontSize="sm">💥 위력: {move.power}</Text>
                    <Text fontSize="sm">🎯 명중: {move.accuracy}</Text>
                    <Text fontSize="sm">🔵 PP: {move.pp}</Text>
                  </Box>
                  <Text fontSize="sm" color="gray.500">{move.description}</Text>
                </Box>
              ))}
              {loadingMoves && <Spinner />}
              {!loadingMoves && pokemon && page * PAGE_SIZE < pokemon.moves.length && (
                <Button variant="outline" onClick={() => setPage(p => p + 1)}>
                  더 보기 ({Math.min(page * PAGE_SIZE, pokemon.moves.length)} / {pokemon.moves.length})
                </Button>
              )}
            </Stack>
          </Tabs.Content>

        </Tabs.Root>
      </Box>
    </HStack>
  );
}