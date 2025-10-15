import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, Mail, Phone, MessageSquare } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-indigo-900 mb-2">DLBC Dallas</h1>
              <h2 className="text-2xl font-semibold text-indigo-700">Church Connect</h2>
              <p className="text-gray-600 mt-2">Connecting members with spiritual guidance</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setShowRegister(false)}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold ${!showRegister ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Login
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold ${showRegister ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Register
                </button>
              </div>

              {showRegister ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="member">Member</option>
                      <option value="leader">Church Leader</option>
                      <option value="pastor">Pastor</option>
                    </select>
                  </div>
                  <button
                    onClick={handleRegister}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">Demo accounts - click to login:</p>
                  <button
                    onClick={() => handleLogin('pastor@dlbc.com', 'pastor')}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
                  >
                    Login as Pastor
                  </button>
                  <button
                    onClick={() => handleLogin('leader@dlbc.com', 'leader')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Login as Church Leader
                  </button>
                  <button
                    onClick={() => handleLogin('member@dlbc.com', 'member')}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Login as Member
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'memberDashboard') {
    const myAppointments = appointments.filter(apt => apt.memberId === currentUser.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-indigo-900">Welcome, {currentUser.name}</h1>
              <p className="text-gray-600">Member Dashboard</p>
            </div>
            <button
              onClick={() => {
                setCurrentView('login');
                setCurrentUser(null);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Book Appointment</h2>
              <button
                onClick={() => setCurrentView('bookAppointment')}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Request New Meeting
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">My Appointments</h2>
              <div className="space-y-3">
                {myAppointments.length === 0 ? (
                  <p className="text-gray-500">No appointments yet</p>
                ) : (
                  myAppointments.map(apt => (
                    <div key={apt.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{apt.leaderName}</p>
                          <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apt.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          apt.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{apt.reason}</p>
                      {apt.status === 'rejected' && (
                        <p className="text-sm text-red-600 mt-2">Leader is not available at this time</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'bookAppointment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setCurrentView('memberDashboard')}
              className="mb-4 text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              ← Back to Dashboard
            </button>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-indigo-900 mb-6">Request Appointment</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Pastor/Leader</label>
                  <select
                    value={appointmentForm.leaderId}
                    onChange={(e) => setAppointmentForm({...appointmentForm, leaderId: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Choose...</option>
                    {leaders.map(leader => (
                      <option key={leader.id} value={leader.id}>
                        {leader.name} - Available: {leader.availability?.join(', ') || 'Not set'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={appointmentForm.date}
                    onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <select
                    value={appointmentForm.time}
                    onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Choose...</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    value={appointmentForm.memberEmail}
                    onChange={(e) => setAppointmentForm({...appointmentForm, memberEmail: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                  <input
                    type="tel"
                    value={appointmentForm.memberPhone}
                    onChange={(e) => setAppointmentForm({...appointmentForm, memberPhone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Meeting</label>
                  <select
                    value={appointmentForm.reason}
                    onChange={(e) => setAppointmentForm({...appointmentForm, reason: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Choose...</option>
                    <option value="Spiritual Guidance">Spiritual Guidance</option>
                    <option value="Counseling">Counseling</option>
                    <option value="Prayer Request">Prayer Request</option>
                    <option value="Life Challenges">Life Challenges</option>
                    <option value="Family Issues">Family Issues</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
                  <textarea
                    value={appointmentForm.description}
                    onChange={(e) => setAppointmentForm({...appointmentForm, description: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Please share any additional information that would help us serve you better..."
                  />
                </div>

                <button
                  onClick={handleBookAppointment}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'leaderDashboard') {
    const myAppointments = appointments.filter(apt => apt.leaderId === currentUser.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-indigo-900">Welcome, {currentUser.name}</h1>
              <p className="text-gray-600">{userType === 'pastor' ? 'Pastor' : 'Church Leader'} Dashboard</p>
            </div>
            <button
              onClick={() => {
                setCurrentView('login');
                setCurrentUser(null);
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Set Availability
              </h2>
              <p className="text-sm text-gray-600 mb-4">Select the days you are available for appointments</p>
              <div className="grid grid-cols-2 gap-2">
                {weekDays.map(day => (
                  <button
                    key={day}
                    onClick={() => updateAvailability(day)}
                    className={`py-2 px-4 rounded-lg font-semibold transition ${
                      currentUser.availability?.includes(day)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">Appointment Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Requests:</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    {myAppointments.filter(apt => apt.status === 'pending').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Accepted:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {myAppointments.filter(apt => apt.status === 'accepted').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rejected:</span>
                  <span className="text-2xl font-bold text-red-600">
                    {myAppointments.filter(apt => apt.status === 'rejected').length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Appointment Requests</h2>
            <div className="space-y-4">
              {myAppointments.length === 0 ? (
                <p className="text-gray-500">No appointment requests</p>
              ) : (
                myAppointments.map(apt => (
                  <div key={apt.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-5 h-5 text-indigo-600" />
                          <p className="font-semibold text-gray-900">{apt.memberName}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {apt.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {apt.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {apt.memberEmail}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {apt.memberPhone}
                          </div>
                        </div>
                        <div className="flex items-start gap-1 mb-2">
                          <MessageSquare className="w-4 h-4 text-indigo-600 mt-1" />
                          <div>
                            <p className="font-semibold text-sm text-gray-700">{apt.reason}</p>
                            {apt.description && (
                              <p className="text-sm text-gray-600 mt-1">{apt.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        apt.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        apt.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </div>
                    
                    {apt.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAppointmentAction(apt.id, 'accepted')}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleAppointmentAction(apt.id, 'rejected')}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;