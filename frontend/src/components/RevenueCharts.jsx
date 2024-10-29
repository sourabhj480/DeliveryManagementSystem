import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import API_BASE_URL from '../config'
import {NavBar} from './NavBar'


export const RevenueCharts = () => {
    const [dailyData, setDailyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [yearlyData, setYearlyData] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}vehicles/revenue/daily`)
            .then(response => response.json())
            .then(data => setDailyData(data))
            .catch(error => console.error('Error fetching daily data:', error));

        fetch(`${API_BASE_URL}vehicles/revenue/monthly`)
            .then(response => response.json())
            .then(data => setMonthlyData(data))
            .catch(error => console.error('Error fetching monthly data:', error));

        fetch(`${API_BASE_URL}vehicles/revenue/yearly`)
            .then(response => response.json())
            .then(data => setYearlyData(data))
            .catch(error => console.error('Error fetching yearly data:', error));
    }, []);

    return (
        <div>
            <h2>Revenue Dashboard</h2>
            <NavBar/>
            <h3>Daily Revenue (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

            <h3>Monthly Revenue (Last 6 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_revenue" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

            <h3>Yearly Revenue (Last 5 Years)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" tickFormatter={(tick) => tick.toString()} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total_revenue" stroke="#ffc658" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
