import React from "react";
import Nav from "./Components/nav/Nav";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/footer/Footer";
import SignUp from "./Components/sign/SignUp";
import PrivateComp from "./Components/Private/PrivateComp";
import Login from "./Components/login/Login";
import AddProducts from "./Components/addProducts/AddProducts";
import ProductList from "./Components/productlist/ProductList";
import UpdateProduct from "./Components/updateProduct/UpdateProduct";


function App() {
  return (
    <>
    
    <BrowserRouter>
    <Nav/>
    <Routes>
    
    <Route element={<PrivateComp/>}>
    <Route path="/" element={<ProductList/>}/>
    <Route path="/add" element={<AddProducts/>}/>
    <Route path="/update/:id" element={<UpdateProduct/>}/>
    <Route path="/logout" element={<h1>Logout Product Listing Component</h1>}/>
    <Route path="/profile" element={<h1>Profile Product Listing Component</h1>}/>
    </Route>
    
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
