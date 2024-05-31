import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid d-flex justify-content-center">
                <img src="https://img.pokemondb.net/sprites/ruby-sapphire/normal/ditto.png" alt="Ditto" />
                <a className="navbar-brand" href="/">guessemon</a>
            </div>
        </nav>
    )
}

export default Navbar