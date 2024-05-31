import React from 'react';
import Pokemon, { formatName } from './PokemonSearch';
import { fetchPokemon } from './Hints';
import { useEffect, useState } from 'react';

interface Pokemon {
    pokedex: number
    name: string,
    types: string[]
}

export interface SelectionsProps {
    selections: string[],
    answer: number | null
}

const Tries: React.FC<SelectionsProps> = ({ selections, answer }) => {
    const [tries, setTries] = useState<Pokemon[]>([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setTries([]);

        selections.forEach(async (selection) => {
            const result = await fetchPokemon(formatName(selection));
            const allTypes = result.types.map((type: any) => type.type.name);

            if (result.id === answer) {
                setSuccess(true)
            }

            const pokemon: Pokemon = {
                pokedex: result.id,
                name: selection,
                types: allTypes
            }

            setTries(prevTries => [...prevTries, pokemon]);
        });
    }, [selections, answer])

    return (
        <div className="ms-3 col-6">
            {success ? (
                <h4 className="text-success">got it! it was {tries[tries.length - 1].name}</h4>
            ) : (
                <div className="d-flex align-items-center">
                    <h4 className="me-1">prev tries</h4>
                    {tries && <h4>({tries.length})</h4>}
                </div>
            )}

            <table className="table table-bordered" style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>pokedex #</th>
                        <th>type(s)</th>
                    </tr>
                    {tries.length > 0 && tries?.map((pokemon, index) => (
                        <tr key={pokemon.pokedex} style={{ verticalAlign: 'middle' }}>
                            <td>
                                <img
                                height="50px"
                                width="50px"
                                className="p-2"
                                src={`https://img.pokemondb.net/sprites/ruby-sapphire/normal/${formatName(pokemon.name)}.png`}
                                alt={pokemon.name} />
                                {pokemon.name}
                            </td>
                            <td>
                                {pokemon.pokedex}
                            </td>
                            <td>
                                {pokemon.types.map((type) => (
                                    <span key={index}>{type}<br/></span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </thead>
            </table> 
        </div>
    )
}

export default Tries