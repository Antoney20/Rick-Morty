import { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterDetails = ({ characterId }) => {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharacterDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
      setCharacter(response.data);
    } catch (error) {
      console.error('Error fetching character details:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacterDetails();
  }, [characterId]);

  if (!character && !error) {
    return <div>{isLoading && <p>Loading characters...</p>}</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
};

export default CharacterDetails;
