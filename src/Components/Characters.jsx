import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCharacters = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      const { results, info } = response.data;
      setCharacters(results);
      setTotalPages(info.pages);
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
      <h1>Rick and Morty Characters</h1>
      <div >
    <div className=''>
      {isLoading && <p>Loading characters...</p>}
      {characters.length > 0 && (
        <ul>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {characters.map((character) => (
                    <div className="max-w-[300px] w-full mx-auto" key={character.id}>
                    <div className="min-h-60 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                        <Link to={`/character/${character.id}`}>
                           <img src={character.image} alt={character.name} />
                        </Link>
                        <h2>{character.name}</h2>
                        <p>Status: {character.status}</p>
                        <p>Species: {character.species}</p>
                    </div>
                    </div>
                ))}
            </div>
        </ul>
      )}
      </div>
    </div>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CharacterList;