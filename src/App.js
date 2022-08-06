import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Footer from './Components/Footer';
import Home from './Pages/Home/Home';
import AddTodos from './Pages/AddTodos';
import YourTodos from './Pages/YourTodos';
import PrivateRoute from './Authentication/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditTodos from './Pages/EditTodos';
import NotFound from './Components/NotFound';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <Navbar>
      <ToastContainer />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/add-todos" element={<PrivateRoute>
          <AddTodos />
        </PrivateRoute>} />
        <Route path="/your-todos" element={<PrivateRoute>
          <YourTodos />
        </PrivateRoute>} />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditTodos></EditTodos>
            </PrivateRoute>
          } />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Navbar>
  );
}

export default App;
