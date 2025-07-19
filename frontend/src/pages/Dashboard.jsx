import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/getDashboardSummary";
import AnalyticsCharts from "../components/analytics/AnalyticsCharts";
import "../css/dashboard.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const { user, accesstoken, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboardSummary();
      setSummary(data);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">DASHBOARD</h2>

      <div className="summary-boxes">
        <div className="summary-card">Products: {summary?.totalProducts}</div>
        <div className="summary-card">Suppliers: {summary?.totalSuppliers}</div>
        <div className="summary-card">Categories: {summary?.totalCategories}</div>
        <div className="summary-card">Locations: {summary?.totalLocations}</div>
      </div>

      <div className="dashboard-main">
        <div className="side-box">
          <div className="side-top">
            <button className="btn-pink"  onClick={() => navigate('/profile')}>My Profile</button>
            <button className="btn-pink" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
            <button className="btn-pink" onClick={() => navigate("/update-inventory")}>Update Inventory</button>
            <button className="btn-pink" onClick={() => navigate("/explore-inventory")}>Explore Inventory</button>
          </div>

          <div className="side-bottom">
            <h4>Total Inventory Value</h4>
            <p>₹{summary?.totalInventoryValue}</p>
          </div>
        </div>

        <div className="chart-box">
          <AnalyticsCharts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
