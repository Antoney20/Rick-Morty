import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './Components/Characters'; 
import Locations from './Components/Locations';
import Nav from './Components/Layouts/Navbar';
import Footer from './Components/Layouts/Footer';
import CharacterDetails from './Components/CharacterDetails';

const App = () => {
  return (
    <div className='bg-gray-100 grid grid-rows-[60px_minmax(300px,_1fr)_80px] grid-cols-1 min-h-screen'>
    <Router>
      <Nav/>
      <div className='mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl w-full'>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path='/locations' element= {<Locations/>}/>
        <Route path="/character/:id" element={<CharacterDetails/>} />
      </Routes>
      </div>
      <Footer/>
    </Router>
    </div>
  );
};

export default App;
