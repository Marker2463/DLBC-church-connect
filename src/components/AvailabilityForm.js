import React from 'react';

const AvailabilityForm = ({
    currentUser,
    updateAvailability,
    weekDays,
    onClose
}) => {
    const handleDayClick = (day) => {
        updateAvailability(day);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Set Availability</h2>
            <p className="text-sm text-gray-600 mb-4">Select the days you are available for appointments</p>
            <div className="grid grid-cols-2 gap-2">
                {weekDays.map(day => (
                    <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        className={`py-2 px-4 rounded-lg font-semibold transition ${currentUser.availability?.includes(day)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {day}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                <button
                    onClick={onClose}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AvailabilityForm;
