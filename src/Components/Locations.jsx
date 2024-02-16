import { useState, useEffect } from 'react';
import axios from 'axios';

const Locations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location');
      setLocations(response.data.results);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
    finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Rick and Morty Locations</h1>
      {isLoading && <p>Loading characters...</p>}
      <input
        type="text"
        placeholder="Search by location name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredLocations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Locations;
