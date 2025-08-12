import Products from "./Components/Products/Products.jsx";
import {BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import NavBar from "./Components/Shared/NavBar.jsx";
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import { Toaster } from "react-hot-toast";
import React from "react";
import Cart from "./Components/Cart/Cart.jsx";
import Login from "./Components/auth/Login.jsx";
import { PrivateRoute } from "./Components/PrivateRoute.jsx";
import { Register } from "./Components/auth/Register.jsx";
import { Checkout } from "./Components/checkout/Checkout.jsx";

function App() {

    return(
        <React.Fragment>
            <Router>
                <NavBar/>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/products'} element={<Products/>}/>
                    <Route path={'/about'} element={<About/>}/>
                    <Route path={'/contact'} element={<Contact/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                        
                    <Route element={<PrivateRoute />}>
                    <Route path={'/checkout'} element={<Checkout />} />
                    </Route>

                    <Route element={<PrivateRoute publicPage />}>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                    </Route>
                </Routes>
            </Router>
            <Toaster position="bottom-center"/>
        </React.Fragment>
    )
}

export default App
