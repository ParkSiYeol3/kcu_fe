import { useEffect, useState } from "react";
import { getPokemon } from "./ex01.basic";

export default function PokemonCard({id}) {
    const [pokemon, setPokemon] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const data = await getPokemon(id);      
            setPokemon(data);
        }
        fetchData();
    }, [id]);
    return (
        <div style={{
            border: "1px solid gray",
            padding: "16px",
            maxWidth: "300px"
        }}
        >
            <h2>{`${pokemon?.koName}(${pokemon?.name})`}</h2>
            <img 
                src={pokemon?.image} 
                alt={pokemon?.name} 
                style={{
                    width:"100%"
                }}
                />
                <p>타입: {pokemon?.type?.join(", ")}</p>
                <h4>기술 목록</h4>
                <ul style={{
                    maxHeight: "70px",
                    overflowY: "scroll"
                }}
                >
                    {pokemon?.moves.map((move, idx) => {
                        return <li key={idx}>{move}</li>;
                    })}
                </ul>
        </div>
    )
}