import React, { useEffect, useState } from 'react'
import { mockAPI } from './mockAPI'
import { validationSchema } from './validationSchema'
import './App.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        const validate = async () => {
            try{
                await validationSchema.validate({email, password}, {abortEarly: false});
                setErrors({});
            } catch (err) {
                const validationErrors = {};
                if(err.inner){
                    err.inner.forEach((error) => {
                        validationErrors[error.path] = error.message;
                    });
                }
                setErrors(validationErrors);
            }
        };
        validate();
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await mockAPI(email, password);
            setMessage(response.message);
        } catch (err) {
            setMessage(err.message);
        }
    };

  return (
    <div className='user-registration-page'>
        <h1>Login</h1>
        {message && <div className='message'><p>{message}</p></div>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email: </label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Password: </label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login;