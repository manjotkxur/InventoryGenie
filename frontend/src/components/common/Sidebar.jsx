import "../../css/sidebar.css";
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar"> 
      <h4>Inventory Genie</h4>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link text-white">Dashboard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/report" className="nav-link text-white">Report</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/analytics" className="nav-link text-white">Analytics</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ai-query" className="nav-link text-white"><i class="bi bi-stars"></i>Inventino</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
