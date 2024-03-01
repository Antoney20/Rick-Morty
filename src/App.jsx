import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './Components/Characters'; 
import Locations from './Components/Locations';
import Nav from './Components/Layouts/Navbar';
import Footer from './Components/Layouts/Footer';
import CharacterDetails from './Components/CharacterDetails';
import EpisodesList from './Components/Episodes';
import LocationDetails from './Components/LocationDetails';
import Home from './Components/Home';
import EpisodeDetails from './Components/EpisodeDetails'


const App = () => {
  return (
    <div className='bg-gray-100 grid grid-rows-[60px_minmax(200px,_1fr)_80px] grid-cols-1 min-h-screen'>
    <Router>
      <Nav/>
      <div className='mx-auto py-1 px-4 sm:px-6 lg:px-6 max-w-7xl w-full'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Characters" element={<CharacterList />} />
        <Route path='/locations' element= {<Locations/>}/>
        <Route path="/location/:id" element={<LocationDetails/>} />
        <Route path="/character/:id" element={<CharacterDetails/>} />
        <Route path='/episodes'  element={<EpisodesList/> }/>
        <Route path='/episode/:id' element={<EpisodeDetails/>} />
      </Routes>
      </div>
      <Footer/>
    </Router>
    </div>
  );
};

export default App;
