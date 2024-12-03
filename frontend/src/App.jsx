import Registration from './pages/Registration.jsx';
import Login from './pages/Login.jsx';
import ForgotPW from './pages/ForgotPW.jsx';
import ResetPW from './pages/ResetPW.jsx';
import UserDashBoard from './pages/UserDashboard.jsx';
import ReportsForm from './pages/reports.jsx';
import Attendance from './pages/Attendance.jsx';
import ProfilePage from './pages/Profile.jsx';
import EventForm from './pages/Events-add-edit.jsx';

import TopBar from './components/topBar.jsx';

import { AppContextProvider } from './context/AppContext.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  const location = useLocation();
  const noTopBar = ["/register", "/login", "/forgotPW", "/resetPW", "/"];

  return (
    <AppContextProvider>
      {!noTopBar.includes(location.pathname) && <TopBar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgotPW" element={<ForgotPW />} />
        <Route path="/resetPW" element={<ResetPW />} />

        {/* Protected Routes */}
        <Route
          path="/userDashBoard"
          element={
            <ProtectedRoute>
              <UserDashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event"
          element={
            <ProtectedRoute>
              <EventForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppContextProvider>
  );
}