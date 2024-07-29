import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import ToDo from './pages/toDo/ToDo';
import SignIn from './pages/signIn/SignIn';

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
        />1
        <Route
        path='/signIn'
        element={<SignIn/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
