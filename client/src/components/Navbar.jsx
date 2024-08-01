import {React, useState} from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  //const history = useHistory();
  const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

 

  return (
    <div className="navbar">
      <div className="container">
        <div className="links">
          <Link className="link" to="/?cat=cloth">
            <h6>CLOTHING</h6>
          </Link>
          <Link className="link" to="/?cat=book">
            <h6>BOOKS</h6>
          </Link>
          <Link className="link" to="/?cat=elect">
            <h6>ELECTRONICS</h6>
          </Link>
          <Link className="link" to="/cart">
            <h6>CART</h6>
          </Link>
          {currentUser ? (
            <>
              <span>{currentUser.username}</span>
              <span style={{ cursor: "pointer" }}>
                Logout
              </span>
            </>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
