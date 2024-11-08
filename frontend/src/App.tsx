import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import Login from './components/Login';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.token);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Login />
    </div>
  );
}

export default App;
