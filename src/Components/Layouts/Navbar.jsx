import { Link } from 'react-router-dom';

function Nav() {

    return (
      <header className='flex justify-between items-center border-b bg-indigo-200 text-black text-bold'>
        <div className={'max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8'}>
          <div className={'flex items-center'}>
            <nav className={'flex items-center flex-grow'}>
                <a className='flex'>
                  <h1 className='hidden sm:inline-block text-2xl font-medium'>Rick & Morty</h1>
                  <h1 className='sm:hidden text-2xl font-medium'>R&M</h1>
                </a>

                <Link to="/" 
                    className='ml-3 sm:ml-10 text-base sm:text-xl font-base text-black hover:text-gray-600 text-bold'  
                >
                Character
                </Link>
                
                <Link to="/locations"
                   className='hidden sm:inline-block ml-3 sm:ml-6 text-base sm:text-xl font-base  text-black hover:text-gray-600 text-bold'
                   >
                   Locations
                   </Link>
            </nav>
            <div className='flex items-center md:ml-12'>
      
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  export default Nav;