import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LocationDetails = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);

  const fetchLocationDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
      setLocation(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching location details:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const fetchCharacterDetails = async (residentUrl) => {
    try {
      const response = await axios.get(residentUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching character details:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchLocationDetails();
  }, [id]);

  useEffect(() => {
    if (location) {
      Promise.all(location.residents.map(residentUrl => fetchCharacterDetails(residentUrl)))
        .then(charactersData => {
          setCharacters(charactersData);
        });
    }
  }, [location]);

  if (!location && !error) {
    return <div>{isLoading && <p>Loading location details...</p>}</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{location.name}</h1>
      <h3>{location.dimension}</h3>

      <br></br>
      <h1>Residents List:</h1>
      <div className='container w-100 h-full py-12 bg-slate-300'>
        <div className="grid grid-cols-4 gap-4">
          {characters.map((character, index) => (
            <div key={index} className="w-32 h-320 flex items-center justify-center bg-white">
              {character ? (
                <div>
                  <img src={character.image} alt={character.name} />
                  <p>{character.name}</p>
                </div>
              ) : (
                'Character not found'
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
