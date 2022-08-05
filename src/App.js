import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Footer from './Components/Footer';
import Home from './Pages/Home/Home';
import AddTodos from './Pages/AddTodos';
import YourTodos from './Pages/YourTodos';
import CompletedTodos from './Pages/CompletedTodos';
import NotFound from './Components/NotFound';
import PrivateRoute from './Authentication/PrivateRoute';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditTodos from './Pages/EditTodos';

function App() {
  return (
    <div className="App">
      <Navbar>
        <ToastContainer/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add-todos" element={<PrivateRoute>
            <AddTodos />
          </PrivateRoute>} />
          <Route path="/your-todos" element={<PrivateRoute>
            <YourTodos />
          </PrivateRoute>} />
          <Route path="/completed-todos" element={<PrivateRoute>
            <CompletedTodos />
          </PrivateRoute>} />
          <Route
          path="/:id"
          element={
            <PrivateRoute>
              <EditTodos></EditTodos>
            </PrivateRoute>
          }/>       
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Navbar>
    </div>
  );
}

export default App;
