import React from 'react';
import Hints from '../components/Hints';
import Tries from '../components/Tries';
import PokemonSearch from '../components/PokemonSearch';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const [selections, setSelections] = useState<string[]>([]);
    const [randomPokemon, setRandomPokemon] = useState<number | null>(null);

    useEffect(() => {
        const pokemon = Math.floor(Math.random() * 151) + 1;
        setRandomPokemon(pokemon);
    }, []);

    const handlePokemonSelection = (pokemon: string) => {
        if (!selections.includes(pokemon)) {
            setSelections([...selections, pokemon]);
        }
    };

    return (
        <div className="mt-5">
            <div className="d-flex justify-content-center position-relative">
                <PokemonSearch handlePokemonSelection={handlePokemonSelection} />
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Tries selections={selections} answer={randomPokemon} />
                {randomPokemon !== null && <Hints pokemonID={randomPokemon} />}
            </div>
        </div>
    )
}

export default Home