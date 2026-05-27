import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS, 
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';

import API from "../context/api";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Report = () => {
    const navigate = useNavigate();
    document.title = '💰 Report | Finance Tracker';
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [month, setMonth] = useState(new Date().getMonth()+1);
    const [year, setYear] = useState(new Date().getFullYear());

    const fetchReport = async () => {
        setLoading(true);
        try{
            const response = await API.get(`/transactions/report?month=${month}&year=${year}`);
            setReport(response.data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [month, year]);

    const incomeData = report.find(r => r._id === 'income');
    const expenseData = report.find(r => r._id === 'expense');

    const expenseDoughnutData = {
        labels: expenseData?.categories.map(c => c.category) || [],
        datasets: [{
            data: expenseData?.categories.map(c => c.total) || [],
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4bc0c0', '#9966ff', '#ff9f40'
            ]
        }]
    };

    const barData = {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label:`Summary for ${month}/${year}`,
            data:[incomeData?.typeTotal || 0, expenseData?.typeTotal || 0],
            backgroundColor: ['#4bc0c0','#ff6384']
        }]
    };

    const months = [
        'January','February', 'March','April','May','June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return(
        
        <div className="report">
            <nav className="navbar">
                <h1>Finance Tracker</h1>
            <div className="nav-right">
                <span>Monthly Report</span>
                <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
            </div>
            </nav>

            <div className="report-content">
                <h2>Monthly Report</h2>

                {/* Month and Year Selector */}

                <div className="selectors">
                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                        {months.map((m, i) => (
                            <option key={i} value={i+1}>{m}</option>
                        ))}
                    </select>

                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            {[2024, 2025, 2026, 2027].map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>

                </div>
                
                {loading ? (
                    <p>Loading report...</p>
                ) : report.length === 0 ? (
                    <p>No transactions found for this month.</p>
                ) : (
                    <div className="report-grid">
                        {/* Summary */}

                        <div className="report-summary">
                            <div className="summary-item_income">
                                <h3>Total Income</h3>
                                <p>₹{(incomeData?.typeTotal || 0).toLocaleString()}</p>
                            </div>
                            <div className="summary-item_expense">
                                <h3>Total Expense</h3>
                                <p>₹{(expenseData?.typeTotal || 0).toLocaleString()}</p>
                            </div>
                            <div className="summary-item_balance">
                                <h3>Net Savings</h3>
                                <p>₹{((incomeData?.typeTotal || 0) - (expenseData?.typeTotal || 0)).toLocaleString('en-IN')}</p>
                            </div>
                        </div>

                        {/* Charts */}

                        <div className="charts">
                            <div className="chart-box">
                                <h3>Income v/s Expenses</h3>
                                <Bar data={barData} />
                            </div>

                            {expenseData && (
                                <div className="chart-box">
                                    <h3>Expense Breakdown</h3>
                                    <Doughnut data={expenseDoughnutData} />
                                </div>
                            )}
                        </div>

                        {/* Category Breakdown */}

                        {expenseData && (
                            <div className="categories-breakdown">
                                <h3>Expense Categories</h3>
                                {expenseData.categories.map((c, i) => 
                                (
                                    <div key={i} className="category-row">
                                        <span>{c.category}</span>
                                        <span>₹{c.total.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        )}


                    </div>
                )
            }

            </div>

        </div>

    );



};

export default Report;