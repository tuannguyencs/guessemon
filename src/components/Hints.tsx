import React from 'react';
import { useEffect, useState } from 'react';

interface Hints {
    color: string,
    shape: string,
    habitat: string,
    description: string[]
}

export async function fetchPokemon(identifier: number | string) {
    console.log(identifier);

    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}/`, {
        method: "GET"
    });

    return await result.json();
}

export async function fetchSpecies(pokemonID: number) {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`, {
        method: "GET"
    });

    return await result.json();
}

function removeDuplicates(data: string[]) {
    return data.filter((value, index) => 
        data.findIndex(item => item.toLowerCase() === value.toLowerCase()) === index
    );
}

interface PokemonID {
    pokemonID: number
}

const Hints: React.FC<PokemonID> = ({ pokemonID }) => {
    const [descriptions, setDescriptions] = useState<string[] | null>(null);

    const fetchData = async () => {
        const result = await fetchSpecies(pokemonID);
        const allDescriptions = result.flavor_text_entries
                                    .filter((txt: any) => txt.language.name === "en")
                                    .map((txt: any) => {
                                        const regex = new RegExp(result.name, 'gi');
                                        return txt.flavor_text.replace(/[\f\n]/g, " ").replace(regex, "_")
                                    });
        const removedDupes = removeDuplicates(allDescriptions);
        setDescriptions(removedDupes);
    }

    useEffect(() => {
        fetchData();
    }, [pokemonID]);

    return (
        <div className="ms-3 col-6 text-center">
            <h4>hints</h4>
            <div style={{ overflowY: "auto", maxHeight: "350px", display: "inline-block" }}>
                <table className="table table-light table-striped table-hover table-bordered">
                    <tbody>
                        {descriptions?.map((desc, index) => (
                            <tr key={index}>
                                <td>{desc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Hints