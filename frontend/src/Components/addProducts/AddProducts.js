 import React, { useState } from 'react'
 import './AddProducts.css'


 const AddProducts = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const addProduct  = async () => {
      //validation
      // console.log(!name)
      if(!name || !price || !category || !company ){
        setError(true)
        return false;
      }
        // console.log("name:",name, "price:", price, "category:", category, "company:", company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log(userId._id);
        let result = await fetch("http://localhost:5000/add-product", {
          method: 'post',
          body:JSON.stringify({name, price, category, company, userId}),
          headers:{
            "Content-Type" : "application/json",
            authorization : `bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        // console.log(result)
    }

   return (
    <>
     <div className='product'>
       <h1>Add Product</h1>
       <br />
       <label>Enter Product Name : </label>
       <input className='inputBox' type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder = " Enter Product Name"/>
       {error && !name && <span className="invalid-input">Enter Valid name</span>  }
       <br />
       <label>Enter Product Price : </label>
       <input className='inputBox' type="number" value={price} onChange={(e)=> setPrice(e.target.value)} placeholder = " Enter Product price"/>
       {error && !price && <span className="invalid-input">Enter Valide price</span>  }
       <br />

       <label>Enter Product Category : </label>
       <input className='inputBox' type="text"  value={category} onChange={(e) => setCategory(e.target.value)} placeholder = " Enter the Product category "/>
       {error && !category && <span className="invalid-input">Enter Valide category</span>  }
       <br />

       <label>Enter Product company name : </label>
       <input className='inputBox' type="text"  value={company} onChange={(e) => setCompany(e.target.value)} placeholder = " Enter the Product company "/>
       {error && !company && <span className="invalid-input">Enter Valide company</span>  }
       <br />

       <button className="appButton" onClick={addProduct} type= "button" >Add</button>
     </div>
     </>
   )
 }
 
 export default AddProducts
 