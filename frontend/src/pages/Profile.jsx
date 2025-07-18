import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>
      <div className="card p-3 shadow-sm mt-3">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <Link to="/profile/edit" className="btn btn-primary mt-3">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
