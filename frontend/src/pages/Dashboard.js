import React, {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../context/api";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    document.title = '💰 Dashboard | Finance Tracker';

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: ''
    });

    const fetchTransactions = async () => {
        try{
            const response = await API.get('/transactions');
            setTransactions(response.data);
        }
        catch (err) {
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await API.post('/transactions', form);
            setForm({ type: 'expense', amount:'', category: '', description:'', date: ''});
            fetchTransactions();
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try{
            await API.delete( `/transactions/${id}`);
            fetchTransactions();
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum+t.amount, 0);

    const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum+t.amount, 0);

    const balance = totalIncome - totalExpense;

    return (
        <div className="dashboard">
            {/* Navbar */}
            <nav className="navbar">
                <h1>Finance Tracker</h1>
                <div className="nav-right">
                    <span>Welcome, {user?.name}</span>
                    <button onClick={() => navigate('/report')}>Monthly Report</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>

            <div className="dashboard-content">
                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="card_balance">
                        <h3>Balance</h3>
                        <p>₹{balance.toLocaleString()}</p>
                    </div>
                    <div className="card_income">
                        <h3>Total Income</h3>
                        <p>₹{totalIncome.toLocaleString()}</p>
                    </div>
                    <div className="card_expense">
                        <h3>Total Expenses</h3>
                        <p>₹{totalExpense.toLocaleString()}</p>
                    </div>
                </div>

                <div className="dashboard-grid">
                    {/* Add Transaction Form */}

                    <div className="form-section">
                        <h2>Add Transaction</h2>
                        <form onSubmit={handleSubmit}>
                            <select name="type" value={form.type} onChange={handleChange}>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>

                            <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount (₹)" required />
                            <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Food, Rent)" required />
                            <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description (optional)" />
                            <input type="date" name="date" value={form.date} onChange={handleChange} required />

                            <button type="submit">Add Transaction</button>
                        </form>
                    </div>

                    {/* Transaction List */}

                    <div className="list-section">
                        <h2>Transactions</h2>
                        {loading ? (
                            <p> Loading...</p>
                        ) : transactions.length === 0 ? (
                            <p>No Transactions yet. Add one!</p>
                        ) : (
                            <div className="transaction-list">
                                {transactions.map(t => (
                                    <div key={t._id} className={`transaction-item ${t.type}`}>
                                        <div className="transaction-info">
                                            <span className="category">{t.category}</span>
                                            <span className="description">&nbsp;&nbsp;{t.description}</span>
                                            <span className="date">&nbsp;&nbsp;{new Date(t.date).toLocaleDateString()}</span>
                                        </div>

                                        <div className="transaction-right">
                                            <span className="amount">{t.type === 'income' ? ' + ' : ' - '}₹{t.amount.toLocaleString()}</span>
                                            &nbsp;&nbsp;<button onClick={() => handleDelete(t._id)}>Delete</button>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )
                    }
                    </div>

                </div>

            </div>
        </div>
    );

};

export default Dashboard;