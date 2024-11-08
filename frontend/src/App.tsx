import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from './app/store';
import { useAppDispatch } from './app/hooks';

import { logout } from './features/auth/authSlice';

import Login from './components/Login';
import ProductTable from './components/ProductTable';

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {isAuthenticated ? (
        <>
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
          <ProductTable />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
