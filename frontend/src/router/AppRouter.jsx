import { Routes, Route } from 'react-router-dom';
import Layout from '../components/common/Layout';
import NotFound from '../components/common/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';

import DashboardPage from '../pages/Dashboard';
import ReportPage from '../pages/Report';
import AnalyticsPage from '../pages/Analytics';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
