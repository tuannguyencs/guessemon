import React from 'react';
import { useEffect, useState } from 'react';
import kanto from '../kanto.json';

interface PokemonProps {
  handlePokemonSelection: (pokemon: string) => void;
}

export const formatName = (name: string) => {
  const formattedName = name.toLowerCase().replace(" ", "-").replace(/[^a-zA-Z]/g, "");
  return formattedName;
}

const PokemonSearch: React.FC<PokemonProps> = ({ handlePokemonSelection }) => {
    const [pokemonNames, setPokemonNames] = useState<string[] | null>();
    const [inputValue, setInputValue] = useState("");
    const [filteredNames, setFilteredNames] = useState<string[] | undefined>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);

      const filtered = pokemonNames?.filter((name) => 
        name.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredNames(filtered);
    }

    const handleChoice = (value: string) => {
      handlePokemonSelection(value);
      setInputValue("");
    }

    const hoverColor = (event: any, color: string) => {
      event.target.style.backgroundColor = color;

      const children = event.currentTarget.querySelectorAll('*');
      children.forEach((child: HTMLElement) => {
          child.style.backgroundColor = color;
      });
    }

    useEffect(() => {
        const fetchPokemonData = async () => {
          try {
            const names = kanto.map((pokemon) => pokemon.name);
            setPokemonNames(names);
          } catch (error) {
            console.error('Error fetching Pokemon data:', error);
          }
        };
    
        fetchPokemonData();
      }, []);

    return (
      <div className="col-2 text-center">
        <h4>search gen1</h4>

        <div style={{ position: "relative", display: "inline-block" }}>
          <input 
            className="form-control w-100" 
            type="text" name="pokemon" 
            value={inputValue} 
            onChange={handleChange} 
            placeholder="guess..."
            style={{ borderRadius: 0 }}>
          </input>
          
          <div style={{ position: "absolute", zIndex: "999", width: "100%" }}>
            <div style={{ overflow: "auto", maxHeight:"500px" }}>
              <ul className="list-group">
                {inputValue != "" && filteredNames?.slice(0, 5).map((pokemon) => (
                    <li
                      key={pokemon} 
                      className="p-0 list-group-item" 
                      onMouseOver={(event) => hoverColor(event, "lightgray")} 
                      onMouseLeave={(event) => hoverColor(event, "white")} 
                      onClick={() => handleChoice(pokemon)}
                      style={{ cursor: "pointer", borderRadius: 0 }}>
                        <div className="d-flex align-items-center">
                          <img
                              className="p-2"
                              src={`https://img.pokemondb.net/sprites/ruby-sapphire/normal/${formatName(pokemon)}.png`}
                              alt={pokemon} />
                          <span>{pokemon}</span>
                      </div>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
}

export default PokemonSearch