import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <Router>
      <Sidebar></Sidebar> <Routes>{/* Define your routes here */}</Routes>
    </Router>
  );
}

export default App;
