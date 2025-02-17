// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../common/Loader';

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulating a loading state
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl text-center md:text-6xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-center text-lg md:text-xl">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/app/dashboard"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;