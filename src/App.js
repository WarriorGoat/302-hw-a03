import React, {useReducer, useEffect} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
// import {v4 as uuidv4} from 'uuid'
import productReducer from './reducers/productReducer'
import ProductCard from './components/ProductCard';

function App() {
  

  // const [product, dispatch] = useReducer(productReducer, initialState)

  const [product, dispatch] = useReducer(productReducer, [])
 useEffect(() => {
  const loadData = async () => {
    const response = await fetch('http://localhost:4000/api/products/get-all-products')
    const data = await response.json()
    // console.log(data)
    dispatch({
      type: 'get-products',
      payload: data
    })
  }
  loadData()
 }, [])
 

 //make a button the calls to the store/list-products route
 // take the data from that route. destructure it so it is compatible
 // add to the existing array of data

// take this object data
//  {
//   "id": 782330,
//   "gameTitle": "Doom: Eternal",
//   "publisherName": "Bethesda",
//   "gameStudio": "id Software",
//   "genre": "FPS",
//   "MSRP": 39.99
// },
// and turn it into the below object
// {
//   "id": 782330,
//   "title": "Doom: Eternal",
//   "publisher": "Bethesda",
//   "genre": "FPS",
//   "price": 39.99
// },

const getAPIdata = async () => {
  const response = await fetch('http://localhost:4000/api/store/list-products')
  const data = await response.json()
  dispatch({
    type: 'add-store',
    payload: data
  })
}

  return (
    <div className="App">
      <h1>Video Game Products</h1>
      <button onClick={
        () => dispatch({
          type: 'add-product'
        })
      }>Add Product</button>

      <button onClick={getAPIdata}>API</button>
      
      {
        product.map((element) => {
          return (
          <ProductCard
            key={element.id}
            id={element.id}
            title={element.title}
            publisher={element.publisher}
            genre={element.genre}
            price={element.price}
            deleteProduct = {
              (id) => dispatch({
                type: 'delete-product',
                id: id
              })
            }
            editProduct = {
              (param) => dispatch({
                type: 'edit-product',
                editedObj: param
              })
            }
          /> 
          )
        })
     }
    </div>
  );
}

export default App;