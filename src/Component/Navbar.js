/* eslint-disable @next/next/no-img-element */
//  "use client"
 
import { addItem } from '@/redux/Slice';
  import axios from 'axios';
 import React from 'react';
 import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 
 
 

const Navbar = () => {
  const [ data, setDatas] = useState([]);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem({
      id: product._id,
      title: product.title,
      image: product.images[0],
      price: product.price,
    }));
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/fetchProduct");
        console.log( response ,"response Datas response loaded")
        if (response.status === 200) {
          setDatas(response.data.products);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
    <div className="row">
      {data &&
        data.map((product ) => (
          <div className="col-md-3 mt-5" key={product._id}>
            <div className="card" style={{ width: '18rem' }}>
              <img
                src={product.images[0]}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title.slice(0, 50)}</h5>
                <button className="btn btn-info mt-3" onClick={() => handleAddToCart(product)}>
  Add to Cart
</button>

              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
    
    );
    
          }
 
 


          export  const Page = () => {
  const cartItems = useSelector((state) => state.cart.items);
 
  return (
    <div>
      <h1>cartItems ------------cartItems-------</h1>
      {cartItems.map((item, i) => (
        <ul key={i}>
          <li>
            <div className='cartCard'>
              <h5>{item.title}</h5>
              
              <h5>{item.price}</h5> 
              <img src={item.image} alt={item.title}/>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
  
}

 

export default Navbar;



