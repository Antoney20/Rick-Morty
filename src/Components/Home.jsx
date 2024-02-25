import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoadingCharacters, setIsLoadingCharacters] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);
  const [showMoreCharacters, setShowMoreCharacters] = useState(false);
  const [showMoreLocations, setShowMoreLocations] = useState(false);

  const fetchCharacters = async () => {
    setIsLoadingCharacters(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
      setCharacters(response.data.results.slice(0, 12));
      setShowMoreCharacters(response.data.results.length > 12);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setIsLoadingCharacters(false);
    }
  };

  const fetchLocations = async () => {
    setIsLoadingLocations(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location`);
      setLocations(response.data.results.slice(0, 12));
      setShowMoreLocations(response.data.results.length > 12);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
    fetchLocations();
  }, []);

  const handleSearch = () => {
    fetchCharacters();
  };

  const handleShowMoreCharacters = () => {
    setCharacters([]);
    setShowMoreCharacters(false);
    fetchCharacters();
  };

  const handleShowMoreLocations = () => {
    setLocations([]);
    setShowMoreLocations(false);
    fetchLocations();
  };

  return (
    <div>
      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Characters:</h2>
        {isLoadingCharacters ? (
          <p>Loading characters...</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {characters.map((character) => (
              <div key={character.id}>
                <img src={character.image} alt={character.name} className="w-full" />
                <p>{character.name}</p>
              </div>
            ))}
          </div>
        )}
        {showMoreCharacters && (
          <button onClick={handleShowMoreCharacters}>Show More Characters</button>
        )}
      </div>
      <div>
        <h2>Locations:</h2>
        {isLoadingLocations ? (
          <p>Loading locations...</p>
        ) : (
          <ul>
            {locations.map((location) => (
              <li key={location.id}>{location.name}</li>
            ))}
          </ul>
        )}
        {showMoreLocations && (
          <button onClick={handleShowMoreLocations}>Show More Locations</button>
        )}
      </div>
    </div>
  );
};

export default Home;
