import { useEffect, useState } from "react";
import { getPokemon } from "../react_study/ex10_axios/ex01.basic";
import { Box, Card, Heading, HStack, Image, Text } from "@chakra-ui/react";
import TypeBadge from "./TypeBadge";
import { useNavigate } from "react-router-dom";


export default function PokemonCard({id}) {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    async function fetchData() {
      const data = await getPokemon(id);
      setPokemon(data);
    }
    fetchData()
  }, [id]);
  return (
    <Card.Root maxWidth={300} onClick={() => navigate(`/pokemon/${id}`)}>
        <Card.Header 
        minHeight="80px" 
        display="flex" 
        alignItems="center"
        justifyContent="center"
        >
            <Box textAlign="center">
                <Heading as='h2' fontSize='md'>
                    {pokemon?.koName}
                </Heading>
                <Text fontSize='sm' color='gray.500'>
                    ({pokemon?.name})
                </Text>
            </Box>
        </Card.Header>
        <Card.Body>
            <Image src={pokemon?.image} alt={pokemon?.name}/>
            <HStack justify={'center'}>
                {pokemon?.types.map((type, idx) => 
                <TypeBadge key={idx} typeName={type}/>
                )}
            </HStack>
            <Text
                textAlign='center'
                fontweight='bold'
                paddingTop={4}
                pb={2}
            >
                기술 목록
            </Text>
            <Box maxHeight="70px" overflowY="scroll">
                {pokemon?.moves.map((move, idx) => {
                    return <Text key={idx}>{move}</Text>
                })}
            </Box>
        </Card.Body>
    </Card.Root>
  )
}