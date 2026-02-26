import { useRef, useEffect, useState,useContext } from 'react'
import AuthContext, {AuthProvider} from "../context/AuthProvider"
// import axios from './api/axios'
// const LOGIN_URL= '/auth'

function Login() {
    const {setAuth}=useContext(AuthContext)
    const userRef = useRef()
    const errRef = useRef()

    const [pswd, setPswd] = useState("")
    const [user, setUser] = useState("")
    const [errorMsg, setErrorMsg] = useState()
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        userRef.current.focus()

    }, [])

    useEffect(() => {
        setErrorMsg("")
    }, [pswd, user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
     try{
        const response= await axios.post(LOGIN_URL,
        JSON.stringify({user,pswd}),
        {
        headers :{ 'content-Type ': 'application/json'},
        withCrentials : true
            
        })
        const accessToken= response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({user,pswd,accessToken,roles})
        setUser("");
        setPswd("")
        setSuccess(true)

     }catch(err){
        if(!err?.response){
            setErrorMsg('No Server Response')
        } 
        else if(err.response?.status === 400){
            setErrorMsg('Missing userName or password')
        }
        else if(err.response?.status===401){
            setErrorMsg('Unautheraized')
        }
        else{
            setErrorMsg('Login Failed')
        }
        errRef.current.focus
         }
       

    }
    return (
        <>
            {success ? (
                <section>
                    <h1> you are logged In</h1>
                    <br />
                    <p>
                        <a href="#">GO to Home</a>
                    </p>
                </section>
            ) :
                (<section>
                    <p ref={errRef} className={errorMsg ? "errormsg" : "offScreen"} aria-live='assertive'>{errorMsg} </p>
                    <h1 className='heading'>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label className='label' htmlFor='username'> UserName :</label>
                        <input className='nameContainer' type='text'
                            id="username"
                            ref={userRef}
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <br/>
                        <label className='label' htmlFor='password'> Password :</label>
                        <input className='nameContainer' type='password'
                            id="password"
                            onChange={(e) => setPswd(e.target.value)}
                            value={pswd}
                            required
                        />
                        <br/>
                        <button>Sign in</button>

                    </form>
                    <p>Need an Account?<br />
                    <span className='line'>
                        <a href="#">Sign Up</a>
                    </span>
                    </p>
                </section>)}
        </>)
}

export default Login