import Products from "./Components/Products/Products.jsx";
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import NavBar from "./Components/Shared/NavBar.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";

function App() {

    return(
        <div>
          <Router>
              <NavBar/>
              <Routes>
                  <Route path={'/'} element={<Home/>}/>
                  <Route path={'/products'} element={<Products/>}/>
                  <Route path={'/about'} element={<About/>}/>
                  <Route path={'/contact'} element={<Contact/>}/>
              </Routes>
          </Router>
        </div>
    )
}

export default App
