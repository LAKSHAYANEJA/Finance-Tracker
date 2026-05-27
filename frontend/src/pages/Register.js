import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../context/api';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    document.title = '💰 Register | Finance Tracker';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const response = await API.post('/auth/register', formData);
            login(response.data.user, response.data.token);
            navigate('/dashboard');
        }
        catch (err){
            setError(err.response?.data?.message || 'Registration failed');
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className='auth-container'>
            <div className='auth-box'>
                <h2>Create Account</h2>
                <p>Start tracking your finances today</p>

                {error && <div className='error-msg'>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                        <label>EMail</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Min 6 characters" required />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating account...':'Register'}
                    </button>
                </form>
                <p className='auth-link'>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;