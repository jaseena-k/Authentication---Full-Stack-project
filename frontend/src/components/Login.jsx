import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";



function Login() {

    const [pswd, setPswd] = useState("")
    const [user, setUser] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [success, setSuccess] = useState(false)
    const [isSignup,setIsSignup]=useState(false)
    const [email,setEmail]=useState("")

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const res = await axios.post(
                "http://localhost:5000/api/userDetails/login",
                { username:user, password: pswd }
            );

            console.log(res.data);
            setSuccess(true);

        } catch (err) {
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

   async function handleSignUp(e){
    e.preventDefault()


     try {
            const res = await axios.post(
                "http://localhost:5000/api/userDetails",
                { username:user, password:pswd,email : email }
            );

            console.log(res.data);
            setSuccess(true);

        } catch (err) {
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

    return (
         
        <div className="Container">
            <form>
                <h1 className="heading">{isSignup ?"signUp":"Login" }</h1>
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
                {isSignup &&(
                <input className="nameContainer" type="email" 
                placeholder="email"
                 onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    />

                )}
                <button onClick={isSignup ?handleSignUp:handleLogin}>{isSignup? "sign up":"login"}</button>
                 <p>{isSignup ? "Already have an account":"Need an account?!"}<br />
                
                    <span className='line'>
                        <a href="#" onClick={()=>setIsSignup(!isSignup)}>{isSignup?"Login Now":"Signup Now"}</a>
                    </span>
                    </p>
            </form>
             
        </div>

    )

}

export default Login