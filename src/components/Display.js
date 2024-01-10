import React from "react";
import Axios from "axios";
import { useEffect, useState } from 'react';
export const Display = (props)=>{
  const [allProducts, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("https://s3.amazonaws.com/open-to-cors/assignment.json");
        
        const productsObject = response.data.products;

        const productsArray = Object.keys(productsObject).map(key => ({
          id: key,
          ...productsObject[key]
        }));
        const sortedProducts = productsArray.sort((a, b) => b.popularity - a.popularity);

        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
    return(
        <>
        <h1>Displaying the products that are ordered based on descending popularity</h1>
      <table className='table table-success table-striped table-hover table-bordered'>
        <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(allProducts) && allProducts.map((product) => (
              <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
    );
}