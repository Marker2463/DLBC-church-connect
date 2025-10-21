import React from 'react';

const AppointmentForm = ({
    appointmentForm,
    setAppointmentForm,
    onBookAppointment,
    leaders,
    onBack
}) => {
    const handleChange = (e) => {
        setAppointmentForm({
            ...appointmentForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onBookAppointment();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <button
                        onClick={onBack}
                        className="mb-4 text-black hover:text-gray-800 font-semibold"
                    >
                        ← Back to Dashboard
                    </button>

                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-black mb-6">Request Appointment</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Select Pastor/Leader</label>
                                <select
                                    value={appointmentForm.leaderId}
                                    onChange={handleChange}
                                    name="leaderId"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                                    onChange={handleChange}
                                    name="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                                <select
                                    value={appointmentForm.time}
                                    onChange={handleChange}
                                    name="time"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                                    onChange={handleChange}
                                    name="memberEmail"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                                <input
                                    type="tel"
                                    value={appointmentForm.memberPhone}
                                    onChange={handleChange}
                                    name="memberPhone"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Meeting</label>
                                <select
                                    value={appointmentForm.reason}
                                    onChange={handleChange}
                                    name="reason"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
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
                                    onChange={handleChange}
                                    name="description"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder="Please share any additional information that would help us serve you better..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                            >
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentForm;
