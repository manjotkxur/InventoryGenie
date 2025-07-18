import LoginForm from '../components/auth/LoginForm';
import '../css/LoginSignup.css';

const Login = () => {
  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow auth-card">
        <h4 className="text-center mb-4">Login</h4>
        <LoginForm />
        <div className="text-center mt-3">
          <small>
            Don’t have an account? <a href="/signup">Sign up</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
