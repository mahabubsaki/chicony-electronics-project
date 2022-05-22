import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/shared/Navbar';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
