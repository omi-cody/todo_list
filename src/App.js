import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import ToDo from './pages/toDo/ToDo';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route
          path='/todo'
          element={<ToDo />}
        />{' '}
        <Route
          path='/dashboard'
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
