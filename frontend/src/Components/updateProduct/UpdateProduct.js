import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateProduct.css'

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(params)
        getProductDetails();
    },[])//[] dependency ke bina output nahi edit nahi kar para tha mai

    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers:{
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
        });
        result = await result.json();
        // console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)
    }

    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'Application/json',
                authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }


  return (
    <>
    <div className='updateProduct1'>
    <br />
    <label>Update Product Name : </label>
    <input className='inputBox' type="text" value={name} onChange={(e)=> {setName(e.target.value)}} placeholder = " Enter Product Name"/>
        <br />
    <label>Update Product Price : </label>
    <input className='inputBox' type="number" value={price} onChange={(e)=> {setPrice(e.target.value)}} placeholder = " Enter Product price"/>
        <br />

    <label>Update Product Category : </label>
    <input className='inputBox' type="text"  value={category} onChange={(e) => {setCategory(e.target.value)}} placeholder = " Enter the Product category "/>
        <br />

    <label>Update Product company name : </label>
    <input className='inputBox' type="text"  value={company} onChange={(e) => {setCompany(e.target.value)}} placeholder = " Enter the Product company "/>
        <br />

    <button className="appButton" onClick={updateProduct} type= "button">Update</button>
    </div>
    
    </>
  )
}

export default UpdateProduct;
