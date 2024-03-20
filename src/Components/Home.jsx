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
      <div className="mb-4 mx-auto max-w-md flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="ring-2 ring-offset-cyan-200 focus:ring-cyan-500 focus:outline-none
         rounded-lg p-2 px-4 mt-4 mb-2 mx-auto block w-full md:w-96"
      />
      <button
        onClick={handleSearch}
        className="ml-2 px-4 py-2  rounded-lg ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-offset-2 focus:ring-offset-gray-500 ring-gray-300 focus:ring-blue-500 focus:outline-none bg-blue-500 text-white hover:bg-blue-600"
      >
        Search
      </button>
      </div>

      <div>
        <h2>Characters:</h2>
        {isLoadingCharacters ? (
          <p>Loading characters...</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
          {characters.map((character) => (
            <div key={character.id} className="bg-white rounded-lg shadow-md p-4">
              <img src={character.image} alt={character.name} className="w-full rounded-t-lg" />
              <p className="text-center">{character.name}</p>
            </div>
          ))}
          </div>
        )}
        <div className="flex p-2  mt-4 justify-center">
          {showMoreCharacters && (
            <button
              onClick={handleShowMoreCharacters}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-100"
            >
            Show More Characters
            </button>
          )}
        </div>

      </div>
      <div>
        <h2>Locations:</h2>
        {isLoadingLocations ? (
          <p>Loading locations...</p>
        ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             { locations.map((location) => (
              <li key={location.id} className="bg-white rounded-lg shadow-md p-4">
               {location.name}
                </li>
              ))}
        </ul>

        )}
        <div className="flex p-2  mt-4 justify-center">
        {showMoreLocations && (
          <button 
          onClick={handleShowMoreLocations}
          
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-100"
          >
          Show More Locations</button>
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
