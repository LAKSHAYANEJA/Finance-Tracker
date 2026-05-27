import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../context/api';

const Login = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    document.title = '💰 Login | Finance Tracker' ;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const response = await API.post('/auth/login', formData);
            login(response.data.user, response.data.token);
            navigate('/dashboard');
        }
        catch (err){
            setError(err.response?.data?.message || 'Login failed');
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <div className='auth-container'>
            <div className='auth-box'>
                <h2>Welcome Back</h2>
                <p>Login to your Finance Tracker</p>
                {error && <div className='error-msg'>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label> Email </label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                    </div>
                    <div className='form-group'>
                        <label> Password </label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...':'Login'}
                    </button>
                </form>
                <p className='auth-link'>
                    Dont have an account ? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;