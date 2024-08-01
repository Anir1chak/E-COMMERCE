import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartState } from "../context/Context";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
    total,
    setTotal 
  } = CartState();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="home" style={{ padding: '20px' }}>
      <div className="productContainer" style={{ width: '60%', margin: '0 auto' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {cart.map((prod) => (
            <li key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
              <span className="id" style={{ display: 'none' }}>{prod.id}</span>
              <span className="item_name" style={{ flex: 1 }}>{prod.item_name}</span>
              <span style={{ flex: 1 }}>₹ {prod.price}</span>
              <select
                value={prod.qty}
                onChange={(e) =>
                  dispatch({
                    type: "CHANGE_CART_QTY",
                    payload: {
                      id: prod.id,
                      qty: e.target.value,
                    },
                  })
                }
                style={{ flex: 1, width: 'auto' }}
              >
                {[...Array(10).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: prod,
                  })
                }
                style={{ flex: 1, background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
              >
                &#10060;
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="filters summary" style={{ textAlign: 'right', marginTop: '20px' }}>
        <span className="title" style={{ display: 'block', fontWeight: 700 }}>Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <button type="button" disabled={cart.length === 0} style={{ display: 'block', marginTop: '10px' }} onClick={()=>navigate('/checkout')}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
