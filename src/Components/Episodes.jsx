import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const EpisodesList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEpisodes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode`);
      const { results, info } = response.data;
      setEpisodes(results);
      setTotalPages(info.pages);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
    finally {
        setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className='bg-gray-50 w-full mt-0 px-0 py-0'>
    <div >
    <div className=' '>
      {isLoading && <p>Loading characters...</p>}
      {episodes.length > 0 && (
        <>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 scroll-smooth md:scroll-auto ">
                {episodes.map((episode) => (
                    <div className="max-w-[300px] w-full mx-auto" key={episode.id}>
                    <Link to={`/episode/${episode.id}`}>
                    <div className="min-h-30 w-full shadow-lg  p-2 overflow-hidden rounded-md group-hover:opacity-75 font-semibold " 
                    >
                      <p>Name: {episode.name}</p>
                      <p>Air Date: {episode.air_date}</p>
                      <p>Code: {episode.episode}</p>
                    </div>
                    </Link>
                    </div>

                ))}
            </div>
        </>
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

export default EpisodesList;