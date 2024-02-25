import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const CharacterDetails = () => {
  const { id } = useParams(); 
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharacterDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
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
  }, [id]); 

  if (!character && !error) {
    return <div>{isLoading && <p>Loading character details...</p>}</div>;
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
      <div>
        <h2>Episodes:</h2>
        <div className="grid grid-cols-4 gap-4">
          {character.episode.map((episodeUrl, index) => {
            return (
              <div key={index} className="w-32 h-320 flex items-center justify-center bg-white">
                <EpisodeDetails episodeUrl={episodeUrl} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const EpisodeDetails = ({ episodeUrl }) => {
  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEpisodeDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(episodeUrl);
      setEpisode(response.data);
    } catch (error) {
      console.error('Error fetching episode details:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodeDetails();
  }, [episodeUrl]);

  if (!episode && !error) {
    return <div>{isLoading && <p>Loading episode details...</p>}</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p>{episode.name}</p>
      <p>{episode.episode}</p>
      <p>{episode.air_date}</p>
    </div>
  );
};

export default CharacterDetails;
