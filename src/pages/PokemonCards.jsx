import { Grid } from "@chakra-ui/react";
import PokemonCard from "../components/PokemonCard";

export default function PokemonCards() {
  return (
    <Grid 
    templateColumns={
        {
            base:'repeat(1, 1fr)',
            md:'repeat(3, 1fr)',
            lg:'repeat(5, 1fr)',
            }
    }
    rowGap={4}
    columnGap={4}
    >
        {
            Array.from({length: 151}, (_, i) => i + 1).map((id) => {
                return <PokemonCard key={id} id={id} />
            })
        }
    </Grid>
  )
}