import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import Signin from './Authentication/Signin';
import SignUp from './Authentication/SignUp';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import AddTodos from './Pages/AddTodos';
import YourTodos from './Pages/YourTodos';
import CompletedTodos from './Pages/CompletedTodos';
import NotFound from './Components/NotFound';

function App() {
  return (
    <div className="App">
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-todos" element={<AddTodos />} />
          <Route path="/your-todos" element={<YourTodos />} />
          <Route path="/completed-todos" element={<CompletedTodos />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </Navbar>
    </div>
  );
}

export default App;
