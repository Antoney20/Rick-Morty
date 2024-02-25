import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div>
    <div >
    <div className=''>
      {isLoading && <p>Loading characters...</p>}
      {characters.length > 0 && (
        <ul>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 scroll-smooth md:scroll-auto">
                {characters.map((character) => (
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