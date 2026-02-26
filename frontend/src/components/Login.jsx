import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";



function Login() {

    const [pswd, setPswd] = useState("")
    const [user, setUser] = useState("")
    const [errorMsg, setErrorMsg] = useState()
    const [success, setSuccess] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        useEffect(()=>{
            fetchData()
         },[])

const fetchData = async () =>{
        try {
            const res =await axios.get('http://localhost:5000/api/userDetails')
                setUser(res.data.user)

        }
        catch (err) {
            if (!err?.response) {
                setErrorMsg('No Server Response')
            }
            else if (err.response?.status === 400) {
                setErrorMsg('Missing userName or password')
            }
            else if (err.response?.status === 401) {
                setErrorMsg('Unautheraized')
            }
            else {
                setErrorMsg('Login Failed')
            }


        }
    }
}


    return (
        <div className="Container">
            <form on onSubmit={handleSubmit}>
                <h1 className="heading">Login</h1>
                <input className="nameContainer" type="text"
                    placeholder="userName"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <input className="nameContainer" type="password"
                    placeholder="password"
                    onChange={(e) => setPswd(e.target.value)}
                    value={pswd}
                    required
                />
                {/* <input className="nameContainer" type="email" placeholder="email"/> */}
                <button>Login</button>
            </form>
        </div>

    )
}









export default Login