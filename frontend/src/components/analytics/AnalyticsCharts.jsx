import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, Legend, CartesianGrid
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "../../css/analyticsCharts.css";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#FF8C00", "#8A2BE2", "#20B2AA", "#DC143C"];

const AnalyticsCharts = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [topProductsData, setTopProductsData] = useState([]);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const { accesstoken } = useAuth();

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const headers = {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        };

        const [cat, top, monthly] = await Promise.all([
          axios.get("http://localhost:5000/api/analytics/chart/category-distribution", headers),
          axios.get("http://localhost:5000/api/analytics/chart/top-products", headers),
          axios.get("http://localhost:5000/api/analytics/chart/monthly-sales", headers),
        ]);

        
        console.log("Category Data:", cat.data);
        console.log("Top Products Data:", top.data);
        console.log("Monthly Sales Data:", monthly.data);

      
        setCategoryData(
          Array.isArray(cat.data)
            ? cat.data.map(item => ({
                ...item,
                revenue: parseFloat(item.revenue),
              }))
            : []
        );

        setTopProductsData(
          Array.isArray(top.data)
            ? top.data.map(item => ({
                ...item,
                total_sales: parseInt(item.total_sales),
                unit_price: parseFloat(item.unit_price),
                revenue: parseFloat(item.revenue),
              }))
            : []
        );

        setMonthlySalesData(
          Array.isArray(monthly.data)
            ? monthly.data.map(item => ({
                ...item,
                total_units: parseInt(item.total_units),
              }))
            : []
        );
      } catch (err) {
        console.error("Failed to load chart data:", err);
      }
    };

    if (accesstoken) {
      fetchCharts();
    }
  }, [accesstoken]);

  const extendedMonthlyData =
    monthlySalesData.length === 1
      ? [...monthlySalesData, { month: "Next", total_units: 0 }]
      : monthlySalesData;

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h5>Category Distribution</h5>
        <PieChart width={300} height={300}>
          <Pie
            data={categoryData}
            dataKey="revenue"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="chart-card">
        <h5>Top Selling Products</h5>
        <BarChart width={400} height={300} data={topProductsData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_sales" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="chart-card">
        <h5>Monthly Sales Growth</h5>
        <LineChart width={400} height={300} data={extendedMonthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total_units" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
