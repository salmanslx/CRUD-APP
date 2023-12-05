import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/students' element={<Students />}/>
      </Routes>
    </div>
  );
}

export default App;
