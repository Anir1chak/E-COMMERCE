import { createContext, useContext, useReducer, useState } from "react";
import axios from "axios";
import { cartReducer } from "./Reducer";

const Cart = createContext();
const Context = ({ children }) => {
    const [products , setProducts] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get(`/items`);
          setProducts(response.data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    const [total, setTotal] = useState(0);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  
  return (
    <Cart.Provider value={{ state, dispatch,total , setTotal }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;