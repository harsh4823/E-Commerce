import Products from "./Components/Products/Products.jsx";
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import NavBar from "./Components/Shared/NavBar.jsx";

function App() {

    return(
        <div>
          <Router>
              <NavBar/>
              <Routes>
                  <Route path={'/'} element={<Home/>}/>
                  <Route path={'/products'} element={<Products/>}/>
              </Routes>
          </Router>
        </div>
    )
}

export default App
