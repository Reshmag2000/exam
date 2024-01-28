import './App.css';
import Email from './components/Email';
import { Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
        <Routes>
        <Route path='/email' element={<Email/>}/>
        <Route path='/welcome' element={<Welcome/>}/>
      </Routes>
    </div>
  );
}

export default App;
