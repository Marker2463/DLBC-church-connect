import React from 'react';

const MemberDashboard = ({
    currentUser,
    appointments,
    onLogout,
    onNavigateToBookAppointment
}) => {
    const myAppointments = appointments.filter(apt => apt.memberId === currentUser.id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-black">Welcome, {currentUser.name}</h1>
                        <p className="text-gray-600">Member Dashboard</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-black mb-4">Book Appointment</h2>
                        <button
                            onClick={onNavigateToBookAppointment}
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                        >
                            Request New Meeting
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-black mb-4">My Appointments</h2>
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
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${apt.status === 'accepted' ? 'bg-green-100 text-green-800' :
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
};

export default MemberDashboard;
