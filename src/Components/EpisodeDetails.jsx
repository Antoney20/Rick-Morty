import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EpisodeDetails = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  const fetchEpisodeDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
      setEpisode(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching episode details:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const fetchCharacterDetails = async (characterUrl) => {
    try {
      const response = await axios.get(characterUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching character details:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchEpisodeDetails();
  }, [id]);

  useEffect(() => {
    if (episode) {
      Promise.all(episode.characters.map(characterUrl => fetchCharacterDetails(characterUrl)))
        .then(charactersData => {
          setCharacters(charactersData);
        });
    }
  }, [episode]);

  if (!episode && !error) {
    return <div>{isLoading && <p>Loading episode details...</p>}</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold">{episode.name}</h1>
      <h3 className="text-lg font-semibold">{episode.air_date}</h3>

      <div className="my-8">
        <h1 className="text-xl font-bold">Characters:</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {characters.map((character, index) => (
            <div key={index} className="flex flex-col items-center">
              {character ? (
                <>
                <Link to={`/character/${character.id}`}>
                  <img 
                    src={character.image} 
                    alt={character.name}
                  className="w-38 h-39 object-cover rounded-lg transition-transform duration-300 transform-gpu group-hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-center font-semibold mt-2">{character.name}</p>
              
                </Link>
                </>
              ) : (
                <p className="text-sm">Character not found</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
