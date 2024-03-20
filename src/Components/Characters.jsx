import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(null); 

  const fetchCharacters = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      const { results, info } = response.data;
      setCharacters(results);
      setTotalPages(info.pages);
      setCount(response.data.info.count);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
    finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const filteredCharacters = characters.filter((character) =>
  character.name.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <div >
    <div className=''>
    <h1 className="text-3xl font-bold mb-2 mt-4 text-center">Characters </h1>
      <div className='shadow-md p-2 py-2 mb-8 '>
      {isLoading && <p>Loading characters...</p>}
      <div className="mb-4 mx-auto max-w-md flex items-center">
      <input
        type="text"
        placeholder="Search by character name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="ring-2 ring-offset-cyan-200 focus:ring-cyan-500 focus:outline-none rounded-lg p-2 px-4 mt-4 mb-2 mx-auto block w-full md:w-96"
      />
      <button
        className="ml-2 px-4  py-2 rounded-lg ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-offset-2 focus:ring-offset-gray-500 ring-gray-300 focus:ring-blue-500 focus:outline-none bg-blue-500 text-white hover:bg-blue-600"
      >
        Search
      </button>
      </div>
      {characters.length > 0 && (
        <ul>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 scroll-smooth md:scroll-auto">
                {filteredCharacters.map((character) => (
                    <div className="max-w-[300px] w-full mx-auto" key={character.id}>
                    <div className="min-h-50 w-full shadow-lg  overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 font-semibold " 
                    >
                        <Link to={`/character/${character.id}`}>
                           <img className=' rounded-md w-100 px-0' src={character.image} alt={character.name} />

                        </Link>
                        <h2 className='px-3 text-lg '>{character.name}</h2>
                        <p className=' px-1 text-base'>Status: {character.status}</p>
                        <p className=' px-1 text-base'>Species: {character.species}</p>
                        <p className=' px-1 text-base'>Gender: {character.gender}</p>
                    </div>
                    </div>

                ))}
            </div>
        </ul>
      )}
      </div>
    </div>
      <div>
      <div className='flex justify-between  px-6  py-1  mt-3  '>
        <button  className= 'rounded-lg p-2 px-4 ring-2 ring-blue-300 left-5 bg-cyan-500 shadow-lg shadow-cyan-500/50  hover:opacity-50 '  
        onClick={handlePrevPage}
         disabled={currentPage === 1}>
          Previous
        </button>
        <span>Showing Results of page {currentPage} of {totalPages} Pages  in  <span className='font-medium'> {count} Results</span> </span>  
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

export default CharacterList;