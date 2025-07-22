// src/App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateMeeting from './createMeeting';
import ForgotPassword from './ForgotPassword';
import './globals.css';
import Login from './Login';
import Main from './Main';
import Register from './Register';
import UpdateProfile from './UpdateProfile';
import ViewMeetings from './ViewMeetings';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected area layout */}
          <Route path="/main/*" element={<Main />}>
            <Route path="dashboard" element={<div className="dashboard-placeholder">Welcome to Schedule Dashboard</div>} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="create-meeting" element={<CreateMeeting />} />
            <Route path="view-meetings" element={<ViewMeetings />} />
    {/* <Route path="edit-meeting/:id" element={<EditMeeting />} /> */}
            <Route index element={<div className="dashboard-placeholder">Welcome to Schedule Dashboard</div>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
