import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import ToDo from './pages/toDo/ToDo';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const userId = '66a72bdb234ef7103d58c850';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route
          path='/todo'
          element={<ToDo />}
        />
        <Route
          path='/dashboard'
    element={<Dashboard userId={userId} />}        />
        <Route
        path='/signIn'
        element={<SignIn/>}
      
        />

        <Route
        path='/signUp'
        element={<SignUp/>}
        />
      </Routes>

    </Router>
  );
}

export default App;
