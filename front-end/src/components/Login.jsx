import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const loginHandler = async (e) => {
        e.preventDefault()
        console.log(user)
        await axios.post("/api/login", user)
            .then((res) => {
                console.log(res)
                navigate("/userprofile")
            }).catch((err) => {
                console.error(err)
            })
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={loginHandler}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }}></input>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }}></input>

                <button>Submit</button>
            </form>
            <Link to={"/signup"}>You are not a User. Click here</Link>
        </>
    );
}

export default Login;