import  { useState, useEffect } from 'react';
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
    <div className="py-6 px-4">
      <h1 className="text-3xl font-bold mb-4">{location.name}</h1>
      <h3 className="text-lg font-semibold mb-8">{location.dimension}</h3>

      <h1 className="text-2xl font-semibold mb-4">Residents List:</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((character, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-md w-full">
              {character ? (
                <>
                  <img src={character.image} alt={character.name} className="w-full rounded-lg mb-2" />
                  <p className="text-center font-semibold">{character.name}</p>
                </>
              ) : (
                <p className="text-center">Character not found</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationDetails;
