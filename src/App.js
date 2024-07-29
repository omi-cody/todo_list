import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>{/* Define your routes here */}</Routes>
    </Router>
  );
}

export default App;
