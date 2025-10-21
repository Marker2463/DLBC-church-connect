import React from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, Mail, Phone, MessageSquare } from 'lucide-react';

const LeaderDashboard = ({
    currentUser,
    userType,
    appointments,
    onLogout,
    onAppointmentAction,
    updateAvailability,
    weekDays
}) => {
    const myAppointments = appointments.filter(apt => apt.leaderId === currentUser.id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-black">Welcome, {currentUser.name}</h1>
                        <p className="text-gray-600">{userType === 'pastor' ? 'Pastor' : 'Church Leader'} Dashboard</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                            <Calendar className="w-6 h-6" />
                            Set Availability
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">Select the days you are available for appointments</p>
                        <div className="grid grid-cols-2 gap-2">
                            {weekDays.map(day => (
                                <button
                                    key={day}
                                    onClick={() => updateAvailability(day)}
                                    className={`py-2 px-4 rounded-lg font-semibold transition ${currentUser.availability?.includes(day)
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
                        <h2 className="text-2xl font-bold text-black mb-4">Appointment Stats</h2>
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
                    <h2 className="text-2xl font-bold text-black mb-4">Appointment Requests</h2>
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
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${apt.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                            apt.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                        </span>
                                    </div>

                                    {apt.status === 'pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => onAppointmentAction(apt.id, 'accepted')}
                                                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => onAppointmentAction(apt.id, 'rejected')}
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
};

export default LeaderDashboard;
