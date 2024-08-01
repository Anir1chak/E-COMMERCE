import axios from "axios";
import React, { useState } from "react";
//import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
const login = async (inputs) => {
  const res = await axios.post("/auth/login", inputs);
  //setCurrentUser(res.data);
  return res;
};

const Login = () => {
  const [inputs, setInputs ] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev)=>{
      const updated = {...prev};
      updated[e.target.name] = e.target.value;
      return updated; 
    });

  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res = await login(inputs);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");      
    }
    catch(err)
    {
      setError(err);
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder='username' name='username' onChange={handleChange}/>
        <input required type="password" placeholder='password' name='password' onChange={handleChange} />
        <button onClick = {handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login