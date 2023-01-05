import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css'

const ProductList = () => {
    const [products, setproducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
      let result = await fetch('http://localhost:5000/products', {
        headers:{
          authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      setproducts(result);
  }
  // console.log("products", products)

    const deleteProduct = async (id) => {
      // console.log(id);
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "Delete",
        headers:{
          authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json()
      if(result){
        alert("record is deleted")
        getProducts();
      }
    }

    const searchHandle = async (event) => {
      // console.log(event.target.value)
      let key = event.target.value;
      if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`, {
          headers:{
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        result = await result.json();
        if(result){
          setproducts(result)
        }
      }else{
        getProducts()
      }
    }

  return (
    <div className='product-list'>
      <h1>Product list</h1>
      <br />
      <input type="text" placeholder='Products Search Here'  className='search-product-box' onChange={searchHandle}/>
      <br />
      <ul>
        <li><b>Sr.no</b></li>
        <li><b>Company</b></li>
        <li><b>Model</b></li>
        <li><b>Price</b></li>
        <li><b>Category</b></li>
        <li><b>Delete</b></li>
        <li><b>Update</b></li>
      </ul>
      { products.length > 0 ? products.map((item, index) => 
        <ul key={item._id}>
        <li>{index + 1}</li>
        <li>{item.company}</li>
        <li>{item.name}</li>
        <li>$ {item.price}</li>
        <li>{item.category}</li>
        <li><button onClick={()=>deleteProduct(item._id)}>Delete</button></li>
          <li><Link to = {"/update/"+item._id}>Update</Link></li>
      </ul>
    )
    : <h1>No Result Found </h1>
  }
    </div>
  )
}

export default ProductList
