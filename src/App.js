import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import AppointmentForm from './components/AppointmentForm';
import MemberDashboard from './components/MemberDashboard';
import LeaderDashboard from './components/LeaderDashboard';
import './calendar.css';

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [showRegister, setShowRegister] = useState(false);
  const [userType, setUserType] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const [users, setUsers] = useState([
    { id: 1, name: 'Pastor John Smith', email: 'pastor@dlbc.com', type: 'pastor', availability: ['Tuesday', 'Wednesday', 'Thursday'] },
    { id: 2, name: 'Leader Sarah Johnson', email: 'leader@dlbc.com', type: 'leader', availability: ['Monday', 'Wednesday', 'Friday'] },
    { id: 3, name: 'Member Mike Davis', email: 'member@dlbc.com', type: 'member' }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, memberId: 3, memberName: 'Member Mike Davis', leaderId: 1, leaderName: 'Pastor John Smith', date: '2025-10-07', time: '10:00 AM', reason: 'Spiritual guidance', status: 'pending', memberEmail: 'member@dlbc.com', memberPhone: '214-555-0123' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    type: 'member'
  });

  const [appointmentForm, setAppointmentForm] = useState({
    leaderId: '',
    date: '',
    time: '',
    reason: '',
    description: '',
    memberPhone: '',
    memberEmail: ''
  });

  const handleRegister = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }
    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      type: formData.type,
      availability: formData.type !== 'member' ? [] : undefined
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setUserType(formData.type);
    setCurrentView(formData.type === 'member' ? 'memberDashboard' : 'leaderDashboard');
    setShowRegister(false);
    setFormData({ name: '', email: '', password: '', phone: '', type: 'member' });
  };

  const handleLogin = (email, type) => {
    const user = users.find(u => u.email === email && u.type === type);
    if (user) {
      setCurrentUser(user);
      setUserType(type);
      setCurrentView(type === 'member' ? 'memberDashboard' : 'leaderDashboard');
    }
  };

  const handleBookAppointment = () => {
    if (!appointmentForm.leaderId || !appointmentForm.date || !appointmentForm.time || !appointmentForm.reason || !appointmentForm.memberEmail || !appointmentForm.memberPhone) {
      alert('Please fill in all required fields');
      return;
    }
    const leader = users.find(u => u.id === parseInt(appointmentForm.leaderId));
    const newAppointment = {
      id: appointments.length + 1,
      memberId: currentUser.id,
      memberName: currentUser.name,
      leaderId: parseInt(appointmentForm.leaderId),
      leaderName: leader.name,
      date: appointmentForm.date,
      time: appointmentForm.time,
      reason: appointmentForm.reason,
      description: appointmentForm.description,
      memberEmail: appointmentForm.memberEmail,
      memberPhone: appointmentForm.memberPhone,
      status: 'pending'
    };
    setAppointments([...appointments, newAppointment]);
    setAppointmentForm({ leaderId: '', date: '', time: '', reason: '', description: '', memberPhone: '', memberEmail: '' });
    setCurrentView('memberDashboard');
  };

  const handleAppointmentAction = (appointmentId, action) => {
    setAppointments(appointments.map(apt =>
      apt.id === appointmentId ? { ...apt, status: action } : apt
    ));
  };

  const updateAvailability = (day) => {
    const updatedUsers = users.map(u => {
      if (u.id === currentUser.id) {
        const availability = u.availability || [];
        const newAvailability = availability.includes(day)
          ? availability.filter(d => d !== day)
          : [...availability, day];
        return { ...u, availability: newAvailability };
      }
      return u;
    });
    setUsers(updatedUsers);
    setCurrentUser({ ...currentUser, availability: updatedUsers.find(u => u.id === currentUser.id).availability });
  };

  const leaders = users.filter(u => u.type === 'pastor' || u.type === 'leader');
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-black mb-2">DLBC Dallas</h1>
              <h2 className="text-2xl font-semibold text-gray-800">Church Connect</h2>
              <p className="text-gray-600 mt-2">Connecting members with spiritual guidance</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setShowRegister(false)}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold ${!showRegister ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold ${showRegister ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Register
                </button>
              </div>

              {showRegister ? (
                <Register
                  onRegister={handleRegister}
                  formData={formData}
                  setFormData={setFormData}
                />
              ) : (
                <Login onLogin={handleLogin} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'memberDashboard') {
    return (
      <MemberDashboard
        currentUser={currentUser}
        appointments={appointments}
        onLogout={() => {
          setCurrentView('login');
          setCurrentUser(null);
        }}
        onNavigateToBookAppointment={() => setCurrentView('bookAppointment')}
      />
    );
  }

  if (currentView === 'bookAppointment') {
    return (
      <AppointmentForm
        appointmentForm={appointmentForm}
        setAppointmentForm={setAppointmentForm}
        onBookAppointment={handleBookAppointment}
        leaders={leaders}
        onBack={() => setCurrentView('memberDashboard')}
      />
    );
  }

  if (currentView === 'leaderDashboard') {
    return (
      <LeaderDashboard
        currentUser={currentUser}
        userType={userType}
        appointments={appointments}
        onLogout={() => {
          setCurrentView('login');
          setCurrentUser(null);
        }}
        onAppointmentAction={handleAppointmentAction}
        updateAvailability={updateAvailability}
        weekDays={weekDays}
      />
    );
  }

  return null;
};

export default App;