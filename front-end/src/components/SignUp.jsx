import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    await axios.post("/api/signup", data)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" id="name">Username</label>
        <input type="text" id="name" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} />

        <label htmlFor="email" id="email">Email</label>
        <input type="email" id="email" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} />

        <label htmlFor="password" id="password">Password</label>
        <input type="password" id="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} />

        <button>Submit</button>
      </form>
      <Link to={"/login"}>You are already a User. Click here</Link>
    </>
  );
};

export default SignUp;
