import React, { useState, useEffect } from 'react';

interface Character {
  id: number;
  name: string;
  genre: string;
  race: string;
  image: string;
  planet: string;
  description: string;
}

  const ListaPersonajes: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const charactersPerPage = 4; 

  useEffect(() => {
    fetch('/dragonballz', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);  
        if (Array.isArray(data)) {
          setCharacters(data);
        } else {
          throw new Error('La estructura de los datos no es la esperada');
        }
      });
  }, []);

  
  const indexOfLastCharacter = (currentPage + 1) * charactersPerPage;
  const indexOfFirstCharacter = currentPage * charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const nextPage = () => {
    if (currentPage < Math.ceil(characters.length / charactersPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1  style={{ marginTop: '20px' }}>
      Personajes de Dragon Ball</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {currentCharacters.map(character => (
          <div
            key={character.id}
            style={{
              border: '2px solid #ffffffde',
              borderRadius: '8px',
              padding: '15px',
              background: '#f74001',
              width: '400px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 'auto',
              margin: '0'
            }}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{ width: '50%', borderRadius: '8px', display: 'block', margin: '0 auto' }}
            />
            <h2 style={{ fontSize: '17px' }}>{character.name}</h2>
            <h3 style={{ fontSize: '13px' }}>Género: {character.genre}</h3>
            <h3 style={{ fontSize: '13px' }}>Raza: {character.race}</h3>
            <h3 style={{ fontSize: '13px' }}>Planeta: {character.planet}</h3>
            <h4 style={{ fontSize: '12px' }}>Descripción: {character.description}</h4>

          </div>
        ))}
      </div>


      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={prevPage} disabled={currentPage === 0}>Atrás</button>
        <button onClick={nextPage} disabled={currentPage >= Math.ceil(characters.length / charactersPerPage) - 1}>Adelante</button>
      </div>
    </div>
  );
};



export default ListaPersonajes;


