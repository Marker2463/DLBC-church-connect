import React, { useState } from 'react';

const MemberCalendarView = ({ appointments, onDateClick, onNavigateToBookAppointment }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const getAppointmentsForDate = (date) => {
        return appointments.filter(apt =>
            new Date(apt.date).toDateString() === new Date(date).toDateString()
        );
    };

    const handleDateClick = (day) => {
        if (day) {
            const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            setSelectedDate(clickedDate);
            if (onDateClick) {
                onDateClick(clickedDate);
            }
            if (onNavigateToBookAppointment) {
                onNavigateToBookAppointment();
            }
        }
    };

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="member-calendar-view">
            <div className="calendar-header">
                <button onClick={() => navigateMonth(-1)}>← Previous</button>
                <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                <button onClick={() => navigateMonth(1)}>Next →</button>
            </div>

            <div className="calendar-grid">
                <div className="calendar-days-header">
                    {dayNames.map(day => (
                        <div key={day} className="day-header">{day}</div>
                    ))}
                </div>

                <div className="calendar-days">
                    {getDaysInMonth(currentDate).map((day, index) => {
                        const dayAppointments = day ? getAppointmentsForDate(
                            new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
                        ) : [];

                        return (
                            <div
                                key={index}
                                className={`calendar-day ${day ? 'has-day' : 'empty'} ${selectedDate && day &&
                                    new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() === selectedDate.toDateString()
                                    ? 'selected' : ''
                                    }`}
                                onClick={() => handleDateClick(day)}
                            >
                                {day && (
                                    <>
                                        <div className="day-number">{day}</div>
                                        {dayAppointments.length > 0 && (
                                            <div className="appointments-indicator">
                                                {dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>


            {selectedDate && !showAppointmentForm && (
                <div className="selected-date-details">
                    <h3>Your Appointments for {selectedDate.toDateString()}</h3>
                    {getAppointmentsForDate(selectedDate).length === 0 ? (
                        <p>No appointments scheduled for this date.</p>
                    ) : (
                        <div className="appointments-list">
                            {getAppointmentsForDate(selectedDate).map(appointment => (
                                <div key={appointment.id} className="appointment-item">
                                    <h4>{appointment.title}</h4>
                                    <p>Time: {appointment.time}</p>
                                    <p>Duration: {appointment.duration} minutes</p>
                                    <p>Leader: {appointment.leaderName}</p>
                                    <p>Status: {appointment.status}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MemberCalendarView;
