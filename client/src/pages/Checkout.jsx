import React from 'react'
import { CartState } from "../context/Context";

const Checkout = () => {
    const {
        state: { cart },
        dispatch,
        total,
        setTotal 
      } = CartState();
  return (
    <div>{ total }</div>
  )
}

export default Checkout