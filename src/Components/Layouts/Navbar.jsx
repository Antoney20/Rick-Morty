import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; 

const navItems = [
  { id: 1, text: 'Character', link: '/characters' },
  { id: 2, text: 'Locations', link: '/locations' },
  { id: 3, text: 'Episodes', link: '/episodes' },
];

function Nav() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const closeMenu = () => {
      setNavOpen(false);
    };

    if (navOpen) {
      window.addEventListener('click', closeMenu);
    }

    return () => {
      window.removeEventListener('click', closeMenu);
    };
  }, [navOpen]);

  const handleNavToggle = (e) => {
    e.stopPropagation();
    setNavOpen(!navOpen);
  };

  return (
    <header className='flex justify-between items-center border-b bg-indigo-200 text-black text-bold'>
      <div className={'max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8'}>
        <div className={'flex items-center'}>
          <nav className={'flex items-center flex-grow'}>
            <Link to= '/'  className='flex'>
              <h1 className='hidden sm:inline-block text-2xl font-medium'>Rick & Morty</h1>
              <h1 className='sm:hidden text-2xl font-medium'>R&M</h1>
            </Link>

            {/* Desktop Navigation */}
            <ul className='hidden sm:flex'>
              {navItems.map(item => (
                <li
                  key={item.id}
                  className='ml-3 sm:ml-6 text-base sm:text-xl font-base  text-black hover:text-gray-600 text-bold'
                >
                  <Link to={item.link}>{item.text}</Link>
                </li>
              ))}
            </ul>

            {/* Mobile Navigation Icon */}
            <div onClick={handleNavToggle} className='sm:hidden ml-auto'>
              {navOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          navOpen ? 'fixed top-0 left-0 w-full h-full bg-gray-200 flex flex-col items-center justify-center z-50' : 'hidden'
        }`}
      >
        <div className="max-h-60 overflow-y-auto">
          <ul className="py-4">
            {navItems.map(item => (
              <li
                key={item.id}
                className='py-2 px-4 text-lg font-medium text-gray-700 hover:text-gray-900'
              >
                <Link to={item.link}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Nav;
