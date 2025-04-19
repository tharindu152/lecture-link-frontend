import React, { useState } from 'react';
import { auth, GoogleAuthProvider, signInWithPopup } from '../../services/firebase-config';

interface RoleSelectionModalProps {
  toggleModal?: () => void;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ toggleModal }) => {
  const [selectedRole, setSelectedRole] = useState<string>('LECTURER');

  const handleGoogleSignIn = async (role: string) => {
    const provider = new GoogleAuthProvider();
    try {
      // Trigger Google Sign-In popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Prepare user data based on the selected role
      const userData = {
        email: user.email,
        name: user.displayName || '',
        role: role.toUpperCase(),
      };

      // Call backend API to store user data
      try {
        const response = await fetch('/api/auth/google-signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('Failed to sign up with Google');
        }

        const data = await response.json();
        console.log('User signed up successfully:', data);

        // Redirect to dashboard or appropriate page
        window.location.href = '/';
      } catch (error: any) {
        console.error('Error signing up with Google:', error.message);
      }
    } catch (error: any) {
      console.error('Google Sign-In Error:', error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Select Your Role</h2>
        <div className="mb-4">
          <label htmlFor="role" className="block mb-2 font-medium">
            Role:
          </label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="LECTURER">Lecturer</option>
            <option value="INSTITUTE">Institute</option>
          </select>
        </div>
        <button
          onClick={() => handleGoogleSignIn(selectedRole)}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90 mb-4"
        >
          Sign in with Google
        </button>
        <button onClick={toggleModal} className="mt-4 text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
