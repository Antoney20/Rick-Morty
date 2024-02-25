import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Locations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const fetchLocations = async ( ) => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/location');
      const { results, info } = response.data;
      setLocations(results);
      setTotalPages(info.pages);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
    finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchLocations(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };



  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Rick and Morty Locations</h1>
      <div className=''>
      {isLoading && <p>Loading characters...</p>}
      <input
        type="text"
        placeholder="Search by location name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {locations.length > 0 && (
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 scroll-smooth md:scroll-auto'>
      {filteredLocations.map((location) => (
        <div className=' mx-auto ' key={location.id}>
        <Link to={`/location/${location.id}`}>
                          

  
          <div className=" min-h-20 min-w-60 px-2 py-2 shadow-xl overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
              <h2 className='text-lg font-semibold '>{location.name}</h2>
              <h3 className=' text-base font-mono px-4 py-1'>{location.type}</h3>
              <h3>{location.resedents}</h3>
          </div>
          </Link>
        </div>
        ))}
      </div>
      )}
    </div>

    <div>
      <div className='flex justify-between  px-6  py-1  mt-3  '>
        <button  className= 'rounded-lg p-2 px-4 ring-2 ring-blue-300 left-5 bg-cyan-500 shadow-lg shadow-cyan-500/50  hover:opacity-50 '  
        onClick={handlePrevPage}
         disabled={currentPage === 1}>
          Previous
        </button>
        <span>Showing Results of page {currentPage} of {totalPages} Pages Results</span>
        <button className=' order-last rounded-lg p-2 px-5 ring-2 ring-blue-300 right-2 bg-cyan-500 shadow-lg shadow-cyan-500/50  hover:opacity-50 ' 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
      </div>

    </div>
  );
};

export default Locations;
