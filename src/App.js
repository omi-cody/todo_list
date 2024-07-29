import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import ToDo from './pages/toDo/ToDo';

const userId = '66a72bdb234ef7103d58c850';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path='/todo'
          element={<ToDo />}
        />
        <Route
          path='/dashboard'
          element={<Dashboard userId={userId} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
