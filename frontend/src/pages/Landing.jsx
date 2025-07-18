import { useNavigate } from 'react-router-dom';
import '../css/landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container d-flex justify-content-center align-items-center vh-100">
      <div className="landing-box p-4 shadow">
        <h3 className="text-center mb-3"> <i className="bi bi-box-seam mb-3" style={{ fontSize: '3rem', color: '#d63384', paddingRight: '5px' }}></i>Inventory Genie</h3>
        <h6 className="text-center mb-3"> Inventory Management System</h6>

        <button
          className="btn landing-btn w-100 mb-3"
          onClick={() => navigate('/login')}
        >
          Login
        </button>

        <div className="divider text-center mb-3">or</div>

        <button
          className="btn landing-btn w-100"
          onClick={() => navigate('/signup')}
        >
          Sign up
        </button>

        <div className="form-check mt-4">
          <input className="form-check-input" type="checkbox" id="remember" />
          <label className="form-check-label" htmlFor="remember">
            Remember me
          </label>
        </div>
      </div>
    </div>
  );
};

export default Landing;
