import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      {/* <Sidebar /> */}
<Navbar></Navbar>      <Routes>
        {/* Define your routes here */}
      </Routes>
    </Router>
  );
}

export default App;
