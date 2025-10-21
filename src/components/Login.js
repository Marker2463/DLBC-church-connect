import React from 'react';

const Login = ({ onLogin }) => {
    const handleLogin = (email, type) => {
        onLogin(email, type);
    };

    return (
        <div className="login-container space-y-4">
            <h2 className="text-2xl font-bold text-black mb-4">Login</h2>
            <p className="text-sm text-gray-600 mb-4">Demo accounts - click to login:</p>
            <div className="space-y-4">
                <button
                    onClick={() => handleLogin('pastor@dlbc.com', 'pastor')}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                    Login as Pastor
                </button>
                <button
                    onClick={() => handleLogin('leader@dlbc.com', 'leader')}
                    className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
                >
                    Login as Church Leader
                </button>
                <button
                    onClick={() => handleLogin('member@dlbc.com', 'member')}
                    className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                    Login as Member
                </button>
            </div>
        </div>
    );
};

export default Login;
