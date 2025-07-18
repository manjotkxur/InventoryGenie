import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">
          <i className="bi bi-box-seam me-2"></i> Inventory Genie
        </span>

        {isAuthenticated && (
          <div className="d-flex align-items-center ms-auto">
            <span className="text-white me-3">
              <i className="bi bi-person-circle me-1"></i>
              {user?.name || 'User'}
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
