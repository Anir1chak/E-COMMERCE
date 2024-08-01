import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CartState } from "../context/Context";

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchString, setSearchString] = useState('');
  const location = useLocation();
  const cat = location.search;
  const {
    state: { cart },
    dispatch,
  } = CartState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/items${cat}`);
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [cat]);

  const search = async (e) => {
    e.preventDefault();
    try {
      console.log(searchString);
      const result = await axios.get(`/search?string=${searchString}`);
      setItems(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sortItems = (e) => {
    e.preventDefault();
    const sortValue = e.target.sort.value;
    if (sortValue === '1') {
      const sortedItems = [...items].sort((a, b) => a.price - b.price);
      setItems(sortedItems);
    } else {
      const sortedItems = [...items].sort((a, b) => b.price - a.price);
      setItems(sortedItems);
    }
  };

  return (
    <div className="home">
      <form onSubmit={search}>
        <input
          required
          type="text"
          placeholder="search"
          name="search"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <button onClick={search}>SEARCH</button>
      </form>
      <form onSubmit={sortItems}>
        <label for="sort">Sort by:</label>
        <select name="sort" id="sort">
          <option value="1">PRICE-LOWEST TO HIGHEST</option>
          <option value="2">PRICE-HIGHEST TO LOWEST</option>
        </select>

        <input type="submit" value="APPLY" />
      </form>
      <div className="items">
        {items.map((item) => (
          <div className="item" key={item.id}>
            <h1>{item.item_name}</h1>
            <p>{item.cat}</p>
            <p>Price: ₹{item.price}</p>
            <p>Seller: {item.seller}</p>
            <button onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: item,
                })
              }>ADD TO CART</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
